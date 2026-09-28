import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Props {
  onSelectFlow?: (flowName: string) => void;
}

export const ThreeGlobeHero: React.FC<Props> = ({ onSelectFlow }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [activeFlow, setActiveFlow] = useState<string>('all');
  const globeMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 240);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.8);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffedd5, 2.2);
    sunLight.position.set(120, 80, 100);
    scene.add(sunLight);

    // Earth Sphere
    const radius = 72;
    const globeGeo = new THREE.SphereGeometry(radius, 64, 64);
    const globeMat = new THREE.MeshPhongMaterial({
      color: 0xf7f4eb, // Warm paper tone
      emissive: 0xede8db,
      specular: 0x0284c7,
      shininess: 15,
      wireframe: false
    });

    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globeMesh);
    globeMeshRef.current = globeMesh;

    // Grid wireframe
    const wireGeo = new THREE.SphereGeometry(radius * 1.008, 36, 36);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd8cebc,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    globeMesh.add(wireMesh);

    // Helper: Lat/Lng to Vector3
    const latLngToVec = (lat: number, lng: number, r: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -(r * Math.sin(phi) * Math.cos(theta));
      const z = r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    };

    // Helper: Add Arc
    const addFlowArc = (start: [number, number], end: [number, number], color: number) => {
      const startVec = latLngToVec(start[0], start[1], radius);
      const endVec = latLngToVec(end[0], end[1], radius);
      const midVec = startVec.clone().add(endVec).multiplyScalar(0.5);
      const dist = startVec.distanceTo(endVec);
      midVec.setLength(radius + dist * 0.28);

      const curve = new THREE.QuadraticBezierCurve3(startVec, midVec, endVec);
      const points = curve.getPoints(50);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color, linewidth: 2.5, transparent: true, opacity: 0.85 });
      const line = new THREE.Line(geometry, material);
      globeMesh.add(line);

      // Add pins
      [startVec, endVec].forEach(vec => {
        const pin = new THREE.Mesh(
          new THREE.SphereGeometry(1.8, 16, 16),
          new THREE.MeshBasicMaterial({ color })
        );
        pin.position.copy(vec);
        globeMesh.add(pin);
      });
    };

    // 1. Middle East -> Asia (Gold)
    addFlowArc([26.6, 50.1], [30.0, 122.0], 0xd97706);
    // 2. Russia (Kozmino) -> China (Red)
    addFlowArc([42.7, 133.0], [36.0, 120.3], 0xdc2626);
    // 3. US Gulf Coast -> South Korea (Cyan)
    addFlowArc([27.8, -97.4], [35.5, 129.4], 0x0284c7);
    // 4. West Africa (Angola) -> China (Emerald)
    addFlowArc([-8.8, 13.2], [22.7, 114.6], 0x059669);

    // Initial orientation pointing at the Indian Ocean & East Asia
    globeMesh.rotation.y = -2.2;
    globeMesh.rotation.x = 0.32;

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (isRotating && globeMeshRef.current) {
        globeMeshRef.current.rotation.y += 0.002;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isRotating]);

  const handleFocusFlow = (flow: string) => {
    setActiveFlow(flow);
    if (onSelectFlow) onSelectFlow(flow);
    if (!globeMeshRef.current) return;

    if (flow === 'middleEast') {
      globeMeshRef.current.rotation.y = -2.0;
      globeMeshRef.current.rotation.x = 0.3;
    } else if (flow === 'russia') {
      globeMeshRef.current.rotation.y = -2.7;
      globeMeshRef.current.rotation.x = 0.5;
    } else if (flow === 'us') {
      globeMeshRef.current.rotation.y = 0.8;
      globeMeshRef.current.rotation.x = 0.2;
    } else if (flow === 'westAfrica') {
      globeMeshRef.current.rotation.y = -0.5;
      globeMeshRef.current.rotation.x = -0.1;
    }
  };

  return (
    <div className="relative w-full h-[460px] bg-paper-subtle rounded-xl border border-paper-border overflow-hidden flex flex-col md:flex-row items-center">
      <div className="p-8 md:w-1/2 z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ft-gold/10 text-ft-gold text-xs font-mono font-bold uppercase tracking-wider mb-3">
          3D Interactive Globe
        </div>
        <h2 className="font-serif text-3xl font-bold text-ink mb-3 leading-tight">
          Where Asian Oil Comes From
        </h2>
        <p className="text-sm text-ink-light mb-6 leading-relaxed">
          Asia consumes over 22 million barrels of imported crude every day. Explore the four great ocean arteries carrying oil from the Persian Gulf, Russia, the US Gulf, and West Africa.
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => handleFocusFlow('middleEast')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
              activeFlow === 'middleEast'
                ? 'bg-ft-gold text-white font-bold'
                : 'bg-white border border-paper-border text-ink hover:border-ft-gold'
            }`}
          >
            Middle East (14.5 Mb/d)
          </button>
          <button
            onClick={() => handleFocusFlow('russia')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
              activeFlow === 'russia'
                ? 'bg-ft-claret text-white font-bold'
                : 'bg-white border border-paper-border text-ink hover:border-ft-claret'
            }`}
          >
            Russia (4.3 Mb/d)
          </button>
          <button
            onClick={() => handleFocusFlow('us')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
              activeFlow === 'us'
                ? 'bg-ft-marine text-white font-bold'
                : 'bg-white border border-paper-border text-ink hover:border-ft-marine'
            }`}
          >
            US Gulf (2.1 Mb/d)
          </button>
          <button
            onClick={() => handleFocusFlow('westAfrica')}
            className={`px-3 py-1.5 rounded text-xs font-mono transition-all ${
              activeFlow === 'westAfrica'
                ? 'bg-ft-emerald text-white font-bold'
                : 'bg-white border border-paper-border text-ink hover:border-ft-emerald'
            }`}
          >
            West Africa (1.5 Mb/d)
          </button>
        </div>

        <button
          onClick={() => setIsRotating(!isRotating)}
          className="text-xs text-ink-muted hover:text-ink flex items-center gap-1 font-mono"
        >
          <span>{isRotating ? '⏸️ Pause Rotation' : '▶️ Resume Rotation'}</span>
        </button>
      </div>

      <div ref={mountRef} className="w-full md:w-1/2 h-[340px] md:h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
