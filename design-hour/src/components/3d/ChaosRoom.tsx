'use client';

import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const LABELS = ['Space', 'Budget', 'Layout', 'Materials', 'Lighting', 'Function', 'Aesthetic'];

function FloatingLabel({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: number; // 0 = chaos, 1 = ordered
}) {
  const mesh = useRef<THREE.Group>(null!);
  const angle = (index / total) * Math.PI * 2;

  // Chaos position: random scatter
  const chaosPos = useMemo<[number, number, number]>(() => {
    const r = 1.5 + Math.sin(index * 1.7) * 0.8;
    const a = angle + Math.sin(index * 2.3) * 1.2;
    return [Math.cos(a) * r, (index % 3) - 1, Math.sin(a) * r];
  }, [index, angle]);

  // Order position: evenly spaced ring
  const orderPos = useMemo<[number, number, number]>(() => {
    const r = 2.0;
    return [Math.cos(angle) * r, 0, Math.sin(angle) * r];
  }, [angle]);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    // Interpolate between chaos and order
    mesh.current.position.x = THREE.MathUtils.lerp(chaosPos[0], orderPos[0], progress);
    mesh.current.position.y = THREE.MathUtils.lerp(chaosPos[1], orderPos[1], progress)
      + Math.sin(t * 0.5 + index) * 0.08;
    mesh.current.position.z = THREE.MathUtils.lerp(chaosPos[2], orderPos[2], progress);
    // Rotate slightly
    mesh.current.rotation.y = t * 0.2 * (index % 2 === 0 ? 1 : -1);
  });

  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color(progress > 0.5 ? '#302d28' : '#8c6a4e'),
    roughness: 0.8,
    transparent: true,
    opacity: 0.7 + progress * 0.3,
  }), [progress]);

  return (
    <group ref={mesh}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 0.18, 0.06]} />
        <primitive object={mat} />
      </mesh>
    </group>
  );
}

function ConnectingLines({ progress }: { progress: number }) {
  const lines = useMemo(() => {
    const total = LABELS.length;
    return LABELS.map((_, i) => {
      const angleA = (i / total) * Math.PI * 2;
      const angleB = ((i + 1) / total) * Math.PI * 2;
      const r = 2.0;
      const points = [
        new THREE.Vector3(Math.cos(angleA) * r, 0, Math.sin(angleA) * r),
        new THREE.Vector3(Math.cos(angleB) * r, 0, Math.sin(angleB) * r),
      ];
      return new THREE.BufferGeometry().setFromPoints(points);
    });
  }, []);

  return (
    <>
      {lines.map((geo, i) => (
        <primitive
          key={i}
          object={new THREE.Line(
            geo,
            new THREE.LineBasicMaterial({
              color: new THREE.Color('#8c6a4e'),
              transparent: true,
              opacity: progress * 0.35,
            })
          )}
        />
      ))}
    </>
  );
}

function Scene({ progress }: { progress: number }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={group}>
      {LABELS.map((word, i) => (
        <FloatingLabel
          key={word}
          word={word}
          index={i}
          total={LABELS.length}
          progress={progress}
        />
      ))}
      <ConnectingLines progress={progress} />
    </group>
  );
}

export default function ChaosRoom({ progress }: { progress: number }) {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 5], fov: 60 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1.2} color="#f0ebe3" />
      <directionalLight position={[3, 5, 3]} intensity={2} color="#fdf5e0" />
      <Scene progress={progress} />
    </Canvas>
  );
}
