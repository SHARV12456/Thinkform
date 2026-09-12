'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const STAGES = ['IDEA', 'DIRECTION', 'DESIGN', 'DECISION'];

function ArchNode({
  position,
  label,
  active,
  index,
}: {
  position: [number, number, number];
  label: string;
  active: boolean;
  index: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const ring = useRef<THREE.Mesh>(null!);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(active ? '#302d28' : '#d5cfc6'),
    roughness: 0.5,
    metalness: active ? 0.2 : 0.0,
    transparent: true,
    opacity: active ? 1 : 0.45,
  }), [active]);
  const ringMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color(active ? '#8c6a4e' : '#d5cfc6'),
    wireframe: true,
    transparent: true,
    opacity: active ? 0.6 : 0.2,
  }), [active]);

  useFrame((state) => {
    if (!mesh.current || !ring.current) return;
    const t = state.clock.getElapsedTime();
    if (active) {
      mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, 1.18, 0.08));
      ring.current.rotation.z = t * 0.4 + index;
      ring.current.scale.setScalar(1 + Math.sin(t * 1.5 + index) * 0.06);
    } else {
      mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, 1.0, 0.08));
    }
  });

  return (
    <group position={position}>
      <mesh ref={mesh} castShadow>
        <torusGeometry args={[0.38, 0.06, 12, 40]} />
        <primitive object={mat} />
      </mesh>
      <mesh ref={ring}>
        <torusGeometry args={[0.55, 0.01, 6, 30]} />
        <primitive object={ringMat} />
      </mesh>
      {/* Center sphere */}
      <mesh>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color={active ? '#8c6a4e' : '#b0a89e'} roughness={0.4} />
      </mesh>
    </group>
  );
}

function ConnectorLine({
  from,
  to,
  active,
}: {
  from: [number, number, number];
  to: [number, number, number];
  active: boolean;
}) {
  const points = useMemo(() => [
    new THREE.Vector3(...from),
    new THREE.Vector3(...to),
  ], [from, to]);
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const mat = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color(active ? '#8c6a4e' : '#d5cfc6'),
    transparent: true,
    opacity: active ? 0.7 : 0.25,
  }), [active]);
  return <primitive object={new THREE.Line(geo, mat)} />;
}

function Scene({ activeIndex }: { activeIndex: number }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.15;
  });

  const positions: [number, number, number][] = [
    [0, 1.5, 0],
    [0, 0.5, 0],
    [0, -0.5, 0],
    [0, -1.5, 0],
  ];

  return (
    <group ref={group}>
      {STAGES.map((label, i) => (
        <ArchNode
          key={label}
          position={positions[i]}
          label={label}
          active={i <= activeIndex}
          index={i}
        />
      ))}
      {positions.slice(0, -1).map((pos, i) => (
        <ConnectorLine
          key={i}
          from={[pos[0], pos[1] - 0.38, pos[2]]}
          to={[positions[i + 1][0], positions[i + 1][1] + 0.38, positions[i + 1][2]]}
          active={i < activeIndex}
        />
      ))}
    </group>
  );
}

export default function JourneyDiagram({ activeIndex }: { activeIndex: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1.5} color="#f0ebe3" />
      <directionalLight position={[3, 5, 3]} intensity={2.5} color="#fdf5e0" />
      <pointLight position={[-3, 3, 2]} intensity={4} color="#f5e6c8" />
      <Scene activeIndex={activeIndex} />
    </Canvas>
  );
}
