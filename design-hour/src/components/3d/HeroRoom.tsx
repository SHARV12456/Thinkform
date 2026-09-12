'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ── Minimal Architectural Room ── */
function Room({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const group = useRef<THREE.Group>(null!);
  const floor = useRef<THREE.Mesh>(null!);
  const wallBack = useRef<THREE.Mesh>(null!);
  const wallLeft = useRef<THREE.Mesh>(null!);
  const wallRight = useRef<THREE.Mesh>(null!);

  // Soft floor material
  const floorMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#e8e2d8'),
    roughness: 0.85,
    metalness: 0.0,
  }), []);
  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#f2ede5'),
    roughness: 0.9,
    metalness: 0.0,
  }), []);

  useFrame((state) => {
    if (!group.current) return;
    const [mx, my] = mouse.current;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y, mx * 0.08, 0.05
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x, -my * 0.04, 0.05
    );
  });

  return (
    <group ref={group} position={[0, -1.2, 0]}>
      {/* Floor */}
      <mesh ref={floor} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 8]} />
        <primitive object={floorMat} />
      </mesh>
      {/* Back wall */}
      <mesh ref={wallBack} position={[0, 2, -4]} receiveShadow>
        <planeGeometry args={[8, 4]} />
        <primitive object={wallMat} />
      </mesh>
      {/* Left wall */}
      <mesh ref={wallLeft} rotation={[0, Math.PI / 2, 0]} position={[-4, 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4]} />
        <primitive object={wallMat} />
      </mesh>
      {/* Right wall */}
      <mesh ref={wallRight} rotation={[0, -Math.PI / 2, 0]} position={[4, 2, 0]} receiveShadow>
        <planeGeometry args={[8, 4]} />
        <primitive object={wallMat} />
      </mesh>
    </group>
  );
}

/* ── Floating Sofa Outline ── */
function SofaOutline({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const group = useRef<THREE.Group>(null!);
  const matRef = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#302d28'),
    roughness: 0.6,
    metalness: 0.1,
    wireframe: false,
    transparent: true,
    opacity: 0.7,
  }), []);
  const wireMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#8c6a4e'),
    wireframe: true,
    transparent: true,
    opacity: 0.15,
  }), []);

  useFrame((_, delta) => {
    if (!group.current) return;
    const [mx, my] = mouse.current;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mx * 0.15, 0.04);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -0.55 + my * 0.05, 0.04);
  });

  return (
    <group ref={group} position={[0, -0.55, -1.2]}>
      {/* seat */}
      <mesh castShadow>
        <boxGeometry args={[2.8, 0.25, 0.9]} />
        <primitive object={matRef} />
      </mesh>
      <mesh>
        <boxGeometry args={[2.8, 0.25, 0.9]} />
        <primitive object={wireMat} />
      </mesh>
      {/* back */}
      <mesh position={[0, 0.5, -0.38]} castShadow>
        <boxGeometry args={[2.8, 0.75, 0.12]} />
        <primitive object={matRef} />
      </mesh>
      <mesh position={[0, 0.5, -0.38]}>
        <boxGeometry args={[2.8, 0.75, 0.12]} />
        <primitive object={wireMat} />
      </mesh>
      {/* left arm */}
      <mesh position={[-1.28, 0.25, 0]} castShadow>
        <boxGeometry args={[0.18, 0.45, 0.9]} />
        <primitive object={matRef} />
      </mesh>
      {/* right arm */}
      <mesh position={[1.28, 0.25, 0]} castShadow>
        <boxGeometry args={[0.18, 0.45, 0.9]} />
        <primitive object={matRef} />
      </mesh>
    </group>
  );
}

/* ── Coffee Table ── */
function Table({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const group = useRef<THREE.Group>(null!);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#504b44'),
    roughness: 0.5,
    metalness: 0.15,
    transparent: true,
    opacity: 0.65,
  }), []);

  useFrame(() => {
    if (!group.current) return;
    const [mx] = mouse.current;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mx * 0.06, 0.04);
  });

  return (
    <group ref={group} position={[0, -0.88, 0.2]}>
      <mesh castShadow>
        <boxGeometry args={[1.2, 0.06, 0.7]} />
        <primitive object={mat} />
      </mesh>
      {[-0.5, 0.5].map((x) =>
        [-0.28, 0.28].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, -0.2, z]} castShadow>
            <cylinderGeometry args={[0.025, 0.025, 0.4, 8]} />
            <primitive object={mat} />
          </mesh>
        ))
      )}
    </group>
  );
}

/* ── Floating Dimension Lines ── */
function DimensionLine({ start, end, label, opacity }: {
  start: [number, number, number];
  end: [number, number, number];
  label?: string;
  opacity: number;
}) {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end),
  ], [start, end]);
  const geo = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  const mat = useMemo(() => new THREE.LineBasicMaterial({
    color: new THREE.Color('#8c6a4e'),
    transparent: true,
    opacity,
  }), [opacity]);
  return <primitive object={new THREE.Line(geo, mat)} />;
}

/* ── Ambient Light Sphere (warm glow) ── */
function LightOrb({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const orb = useRef<THREE.PointLight>(null!);
  useFrame(() => {
    if (!orb.current) return;
    const [mx, my] = mouse.current;
    orb.current.position.x = THREE.MathUtils.lerp(orb.current.position.x, mx * 3, 0.05);
    orb.current.position.y = THREE.MathUtils.lerp(orb.current.position.y, 2 + my * 1.5, 0.05);
  });
  return <pointLight ref={orb} position={[0, 2, 1]} intensity={12} color="#f5e6c8" decay={2} />;
}

/* ── Camera Rig ── */
function CameraRig({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const { camera } = useThree();
  useFrame(() => {
    const [mx, my] = mouse.current;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mx * 0.6, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.5 + my * 0.3, 0.04);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Main Export ── */
export default function HeroRoom({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0.5, 5], fov: 55 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <fog attach="fog" args={['#f8f5f0', 10, 25]} />

      {/* Lighting */}
      <ambientLight intensity={0.6} color="#f0ebe3" />
      <directionalLight
        position={[3, 8, 3]}
        intensity={2.5}
        color="#fdf5e0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <LightOrb mouse={mouse} />

      {/* Scene */}
      <CameraRig mouse={mouse} />
      <Room mouse={mouse} />
      <SofaOutline mouse={mouse} />
      <Table mouse={mouse} />

      {/* Dimension lines */}
      <DimensionLine start={[-3.8, -0.2, -3.9]} end={[3.8, -0.2, -3.9]} opacity={0.25} />
      <DimensionLine start={[-3.9, -0.2, -3.8]} end={[-3.9, 1.8, -3.8]} opacity={0.2} />

      <Environment preset="apartment" />
    </Canvas>
  );
}
