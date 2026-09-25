import { useEffect, useRef, useState } from 'react';
import {
  AdditiveBlending, BufferAttribute, BufferGeometry, Color, EdgesGeometry, Group, IcosahedronGeometry,
  Line, LineBasicMaterial, LineSegments, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry,
  Points, PointsMaterial, Raycaster, Scene, SphereGeometry, Vector2, Vector3, WebGLRenderer,
} from 'three';
import { nodes, edges, GROUP_COLORS } from './graph';

const PARTICLES_PER_EDGE = 3;

// Abstract 3D architecture graph. Labels are real DOM buttons projected from 3D positions,
// so they stay crisp, focusable and readable by screen readers.
export default function SystemGraph3D() {
  const wrap = useRef(null);
  const labelRefs = useRef({});
  const hoverRef = useRef(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    hoverRef.current = hover;
  }, [hover]);

  useEffect(() => {
    const el = wrap.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 1200 ? 1.25 : 2));
    renderer.domElement.setAttribute('aria-hidden', 'true');
    el.prepend(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.2, 9.5);
    const world = new Group();
    world.rotation.x = 0.12;
    scene.add(world);

    const byId = Object.fromEntries(nodes.map((n) => [n.id, { ...n, v: new Vector3(...n.pos) }]));
    const disposables = [];
    const track = (o) => (disposables.push(o), o);

    // Cloud platform: a faint grid plate under the system
    const plate = new LineSegments(
      track(new EdgesGeometry(track(new PlaneGeometry(5, 2.4, 6, 3)))),
      track(new LineBasicMaterial({ color: '#2a3340', transparent: true, opacity: 0.8 })),
    );
    plate.rotation.x = -Math.PI / 2;
    plate.position.y = -2.6;
    world.add(plate);

    // Nodes: solid core + wireframe shell
    const coreGeo = track(new SphereGeometry(0.09, 20, 20));
    const shellGeo = track(new IcosahedronGeometry(0.26, 1));
    const meshes = [];
    Object.values(byId).forEach((n) => {
      const color = new Color(GROUP_COLORS[n.group]);
      const core = new Mesh(coreGeo, track(new MeshBasicMaterial({ color })));
      const shell = new Mesh(shellGeo, track(new MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.28 })));
      core.position.copy(n.v); shell.position.copy(n.v);
      core.userData.id = shell.userData.id = n.id;
      n.core = core; n.shell = shell;
      world.add(core, shell);
      meshes.push(shell);
    });

    // Edges
    const edgeMat = track(new LineBasicMaterial({ color: '#3b4453', transparent: true, opacity: 0.9 }));
    const edgeHot = track(new LineBasicMaterial({ color: '#8b8ff8' }));
    const edgeList = edges.map(([a, b]) => {
      const geo = track(new BufferGeometry().setFromPoints([byId[a].v, byId[b].v]));
      const line = new Line(geo, edgeMat);
      world.add(line);
      return { a: byId[a], b: byId[b], line };
    });

    // Data-flow particles travelling along edges
    const count = edgeList.length * PARTICLES_PER_EDGE;
    const positions = new Float32Array(count * 3);
    const pGeo = track(new BufferGeometry());
    pGeo.setAttribute('position', new BufferAttribute(positions, 3));
    const pMat = track(new PointsMaterial({ color: '#7ee7f7', size: 0.07, transparent: true, opacity: 0.9, blending: AdditiveBlending, depthWrite: false }));
    world.add(new Points(pGeo, pMat));
    const offsets = Array.from({ length: count }, (_, i) => (i % PARTICLES_PER_EDGE) / PARTICLES_PER_EDGE + Math.random() * 0.1);
    const tmp = new Vector3();
    const placeParticles = (t) => {
      edgeList.forEach((e, ei) => {
        for (let k = 0; k < PARTICLES_PER_EDGE; k++) {
          const i = ei * PARTICLES_PER_EDGE + k;
          const f = (offsets[i] + t * 0.18) % 1;
          tmp.lerpVectors(e.a.v, e.b.v, f);
          positions.set([tmp.x, tmp.y, tmp.z], i * 3);
        }
      });
      pGeo.attributes.position.needsUpdate = true;
    };

    // Sizing
    let w = 1, h = 1;
    const resize = () => {
      w = el.clientWidth; h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.position.z = w / h < 0.95 ? 11 : 9.5;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(() => { resize(); if (reduced) frame(0); });
    ro.observe(el);

    // Pointer: parallax + raycast hover
    const ndc = new Vector2(10, 10);
    const ray = new Raycaster();
    let targetRx = 0, targetRy = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      targetRy = ndc.x * 0.25; targetRx = 0.12 - ndc.y * 0.08;
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(meshes)[0];
      const id = hit ? hit.object.userData.id : null;
      if (id !== hoverRef.current && (id || e.target === renderer.domElement)) setHover(id);
    };
    const onLeave = () => { ndc.set(10, 10); targetRx = 0.12; targetRy = 0; };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);

    // Render loop (paused when offscreen / hidden; single frame for reduced motion)
    const proj = new Vector3();
    let raf = 0, visible = true, start = performance.now();
    const frame = (now) => {
      const t = (now - start) / 1000;
      if (!reduced) {
        world.rotation.y += (targetRy + Math.sin(t * 0.15) * 0.35 - world.rotation.y) * 0.04;
        world.rotation.x += (targetRx - world.rotation.x) * 0.04;
      }
      placeParticles(reduced ? 0.5 : t);
      const active = hoverRef.current;
      Object.values(byId).forEach((n) => {
        const on = n.id === active;
        const s = on ? 1.5 : 1;
        n.shell.scale.setScalar(n.shell.scale.x + (s - n.shell.scale.x) * 0.15);
        n.shell.material.opacity = on ? 0.7 : 0.28;
        n.shell.rotation.y = t * 0.3;
        // Project label
        n.core.getWorldPosition(proj).project(camera);
        const lab = labelRefs.current[n.id];
        if (lab) {
          const x = (proj.x * 0.5 + 0.5) * w, y = (-proj.y * 0.5 + 0.5) * h;
          lab.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
        }
      });
      edgeList.forEach((e) => { e.line.material = active && (e.a.id === active || e.b.id === active) ? edgeHot : edgeMat; });
      renderer.render(scene, camera);
    };
    const loop = (now) => { frame(now); raf = requestAnimationFrame(loop); };
    const play = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); };
    const pause = () => { cancelAnimationFrame(raf); raf = 0; };

    resize();
    let io;
    // Reduced motion: static frame, redrawn only on interaction so hover feedback still works.
    const redraw = () => requestAnimationFrame(() => frame(0));
    const onVis = () => (document.hidden ? pause() : play());
    if (reduced) {
      frame(0);
      el.addEventListener('pointermove', redraw);
      el.addEventListener('focusin', redraw);
      el.addEventListener('focusout', redraw);
    } else {
      io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? play() : pause(); });
      io.observe(el);
      document.addEventListener('visibilitychange', onVis);
      play();
    }

    return () => {
      pause(); ro.disconnect(); io?.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      el.removeEventListener('pointermove', redraw);
      el.removeEventListener('focusin', redraw);
      el.removeEventListener('focusout', redraw);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const active = nodes.find((n) => n.id === hover);

  return (
    <div className="graph3d" ref={wrap} onPointerLeave={() => setHover(null)}>
      <ul className="graph3d-labels" aria-label="System architecture nodes">
        {nodes.map((n) => (
          <li key={n.id} ref={(r) => (labelRefs.current[n.id] = r)} className="graph3d-label-pos">
            <button
              type="button"
              className={`graph3d-label g-${n.group} ${hover === n.id ? 'is-active' : ''}`}
              onMouseEnter={() => setHover(n.id)}
              onFocus={() => setHover(n.id)}
              onBlur={() => setHover(null)}
              aria-describedby={hover === n.id ? 'graph3d-note' : undefined}
            >
              {n.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="graph3d-note" id="graph3d-note" aria-live="polite">
        {active ? (
          <>
            <span className="mono">{active.tag}</span>
            <strong>{active.label}</strong>
            <span>{active.note}</span>
          </>
        ) : (
          <span className="mono">hover or tab through a node</span>
        )}
      </div>
    </div>
  );
}
