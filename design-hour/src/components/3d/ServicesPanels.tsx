'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Service panel as 3D floating slab ── */
function ServicePanel({
  index,
  total,
  hovered,
  onHover,
}: {
  index: number;
  total: number;
  hovered: boolean;
  onHover: (i: number | null) => void;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  const radius = 2.2;
  const targetX = Math.cos(angle) * radius;
  const targetZ = Math.sin(angle) * radius;
  const targetY = hovered ? 0.25 : 0;

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(hovered ? '#302d28' : '#e8e2d8'),
    roughness: hovered ? 0.3 : 0.8,
    metalness: hovered ? 0.15 : 0.0,
    transparent: true,
    opacity: 0.9,
  }), [hovered]);

  const edgeMat = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color(hovered ? '#8c6a4e' : '#b0a89e'),
    transparent: true,
    opacity: hovered ? 0.9 : 0.4,
  }), [hovered]);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, targetX, 0.06);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY, 0.08);
    mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, targetZ, 0.06);
    mesh.current.rotation.y = THREE.MathUtils.lerp(
      mesh.current.rotation.y,
      hovered ? -angle + Math.PI : -angle,
      0.06
    );
    if (hovered) {
      mesh.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.02;
    }
  });

  const boxGeo = useMemo(() => new THREE.BoxGeometry(0.9, 1.4, 0.08), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(boxGeo), [boxGeo]);

  return (
    <group
      onPointerEnter={() => onHover(index)}
      onPointerLeave={() => onHover(null)}
    >
      <mesh ref={mesh} castShadow>
        <primitive object={boxGeo} />
        <primitive object={mat} />
      </mesh>
      <primitive object={new THREE.LineSegments(edges, edgeMat)} position={[targetX, targetY, targetZ]} />
    </group>
  );
}

function Scene({ hoveredIndex, setHoveredIndex }: {
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  const group = useRef<THREE.Group>(null!);
  const total = 5;

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.getElapsedTime() * 0.06;
  });

  return (
    <group ref={group}>
      {Array.from({ length: total }, (_, i) => (
        <ServicePanel
          key={i}
          index={i}
          total={total}
          hovered={hoveredIndex === i}
          onHover={setHoveredIndex}
        />
      ))}
      {/* Central axis */}
      <mesh>
        <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
        <meshStandardMaterial color="#d5cfc6" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function ServicesPanels({
  hoveredIndex,
  setHoveredIndex,
}: {
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 1, 5.5], fov: 55 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1.2} color="#f0ebe3" />
      <directionalLight position={[3, 6, 3]} intensity={2} color="#fdf5e0" castShadow />
      <pointLight position={[-3, 2, 2]} intensity={6} color="#f5e6c8" />
      <Scene hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
    </Canvas>
  );
}
