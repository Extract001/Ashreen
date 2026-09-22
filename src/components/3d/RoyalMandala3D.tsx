import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import type { ProductFinish } from '../../types/product';

export interface RoyalMandalaProps {
  finish?: ProductFinish;
  scale?: number;
  floatingEnabled?: boolean;
  interactiveRotation?: boolean;
}

export const ROYAL_FINISH_SPECS: Record<
  ProductFinish,
  {
    gemColor: string;
    gemEmissive: string;
    goldColor: string;
    glowColor: string;
    metalness: number;
    roughness: number;
    clearcoat: number;
  }
> = {
  emerald: {
    gemColor: '#064e3b',
    gemEmissive: '#059669',
    goldColor: '#d4af37',
    glowColor: '#10b981',
    metalness: 0.95,
    roughness: 0.12,
    clearcoat: 0.9,
  },
  ruby: {
    gemColor: '#881337',
    gemEmissive: '#e11d48',
    goldColor: '#e5c07b',
    glowColor: '#f43f5e',
    metalness: 0.92,
    roughness: 0.14,
    clearcoat: 0.85,
  },
  sapphire: {
    gemColor: '#1e3a8a',
    gemEmissive: '#0284c7',
    goldColor: '#e0a96d',
    glowColor: '#38bdf8',
    metalness: 0.94,
    roughness: 0.12,
    clearcoat: 0.9,
  },
  gold: {
    gemColor: '#b45309',
    gemEmissive: '#f59e0b',
    goldColor: '#ffd700',
    glowColor: '#fbbf24',
    metalness: 0.98,
    roughness: 0.08,
    clearcoat: 0.95,
  },
};

export const RoyalMandala3D: React.FC<RoyalMandalaProps> = ({
  finish = 'emerald',
  scale = 1,
  floatingEnabled = true,
  interactiveRotation = true,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const gemRef = useRef<THREE.Mesh>(null);
  const silkRef = useRef<THREE.Mesh>(null);

  const spec = ROYAL_FINISH_SPECS[finish] || ROYAL_FINISH_SPECS.emerald;

  // Petal geometries
  const geometries = useMemo(() => {
    return {
      outerTorus: new THREE.TorusGeometry(2.2, 0.035, 16, 80),
      innerTorus: new THREE.TorusGeometry(1.6, 0.03, 16, 64),
      coreTorus: new THREE.TorusGeometry(0.95, 0.025, 16, 48),
      gem: new THREE.OctahedronGeometry(0.65, 2),
      kundanBezel: new THREE.CylinderGeometry(0.72, 0.72, 0.15, 32),
      pearlDrop: new THREE.SphereGeometry(0.08, 16, 16),
      filigreeArch: new THREE.TorusGeometry(0.35, 0.018, 12, 32, Math.PI),
      silkRibbon: new THREE.CylinderGeometry(2.35, 2.35, 0.4, 64, 8, true),
    };
  }, []);

  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const dragVelocity = useRef({ x: 0, y: 0 });
  const spinAngle = useRef({ x: 0.1, y: 0 });

  // Frame animation loop
  useFrame((state, delta) => {
    if (!rootRef.current) return;
    const t = state.clock.getElapsedTime();

    if (floatingEnabled) {
      // Harmonic breathing float
      rootRef.current.position.y = Math.sin(t * 1.2) * 0.12;
      rootRef.current.position.x = Math.cos(t * 0.8) * 0.04;
      rootRef.current.rotation.z = Math.sin(t * 0.6) * 0.05;
    }

    if (!isDragging.current) {
      // Natural inertia damping
      dragVelocity.current.x *= 0.93;
      dragVelocity.current.y *= 0.93;
      spinAngle.current.x += dragVelocity.current.x;
      spinAngle.current.y += dragVelocity.current.y;

      // Regal continuous ambient slow rotation
      spinAngle.current.y += delta * 0.25;
    }

    if (interactiveRotation) {
      // Blend with subtle cursor parallax
      const parallaxX = -state.pointer.y * 0.18;
      const parallaxY = state.pointer.x * 0.22;

      rootRef.current.rotation.y = THREE.MathUtils.damp(
        rootRef.current.rotation.y,
        spinAngle.current.y + parallaxY,
        4.0,
        delta
      );
      rootRef.current.rotation.x = THREE.MathUtils.damp(
        rootRef.current.rotation.x,
        spinAngle.current.x + parallaxX,
        4.0,
        delta
      );
    }

    // Concentric celestial mandala counter-rotations
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.14;
    if (ring2Ref.current) ring2Ref.current.rotation.z -= delta * 0.22;
    if (ring3Ref.current) ring3Ref.current.rotation.z += delta * 0.30;

    // Gemstone inner luminous breathing
    if (gemRef.current) {
      const pulse = (Math.sin(t * 2.4) + 1) * 0.5;
      const mat = gemRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        mat.emissiveIntensity = 0.65 + pulse * 0.9;
      }
    }
  });

  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    isDragging.current = true;
    prevPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: any) => {
    if (isDragging.current) {
      e.stopPropagation();
      const dx = e.clientX - prevPointer.current.x;
      const dy = e.clientY - prevPointer.current.y;
      spinAngle.current.y += dx * 0.012;
      spinAngle.current.x += dy * 0.01;
      dragVelocity.current = { x: dy * 0.01, y: dx * 0.012 };
      prevPointer.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = (e: any) => {
    e.stopPropagation();
    isDragging.current = false;
  };

  return (
    <group ref={rootRef} scale={scale} dispose={null}>
      {/* Invisible Touch Hit Sphere for effortless mobile swiping */}
      <mesh
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <sphereGeometry args={[2.5, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* 1. CENTRAL KUNDAN GEMSTONE WITH BEZEL */}
      <mesh
        ref={gemRef}
        geometry={geometries.gem}
        position={[0, 0, 0]}
        rotation={[Math.PI / 4, Math.PI / 4, 0]}
        castShadow
      >
        <meshPhysicalMaterial
          color={spec.gemColor}
          emissive={spec.gemEmissive}
          emissiveIntensity={0.8}
          roughness={0.06}
          metalness={0.15}
          transmission={0.65}
          thickness={1.2}
          reflectivity={0.98}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>

      {/* 24K Gold Kundan Bezel Setting */}
      <mesh
        geometry={geometries.kundanBezel}
        rotation={[Math.PI / 2, 0, 0]}
        castShadow
        receiveShadow
      >
        <meshPhysicalMaterial
          color={spec.goldColor}
          metalness={spec.metalness}
          roughness={spec.roughness}
          clearcoat={spec.clearcoat}
        />
      </mesh>

      {/* 2. INNER MANDALA RING (12 PETAL FILIGREE JHAROKHA) */}
      <group ref={ring1Ref}>
        <mesh geometry={geometries.coreTorus}>
          <meshPhysicalMaterial
            color={spec.goldColor}
            metalness={0.96}
            roughness={0.15}
            clearcoat={0.8}
          />
        </mesh>

        {/* 8 Symmetrical Jharokha Petals */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 8;
          const x = Math.cos(angle) * 0.95;
          const y = Math.sin(angle) * 0.95;
          return (
            <group key={i} position={[x, y, 0]} rotation={[0, 0, angle - Math.PI / 2]}>
              <mesh geometry={geometries.filigreeArch}>
                <meshPhysicalMaterial color={spec.goldColor} metalness={0.98} roughness={0.1} />
              </mesh>
              <mesh geometry={geometries.pearlDrop} position={[0, 0.42, 0]}>
                <meshStandardMaterial color="#fffbeb" roughness={0.2} metalness={0.1} />
              </mesh>
            </group>
          );
        })}
      </group>

      {/* 3. MIDDLE JHAROKHA RING (INTERMEDIATE FILIGREE) */}
      <group ref={ring2Ref}>
        <mesh geometry={geometries.innerTorus}>
          <meshPhysicalMaterial
            color={spec.goldColor}
            metalness={0.95}
            roughness={0.18}
            clearcoat={0.6}
          />
        </mesh>

        {/* Orbiting Kundan Gem Droplets */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 6;
          const x = Math.cos(angle) * 1.6;
          const y = Math.sin(angle) * 1.6;
          return (
            <mesh key={i} position={[x, y, 0]} geometry={geometries.pearlDrop} scale={1.4}>
              <meshPhysicalMaterial
                color={spec.gemColor}
                emissive={spec.gemEmissive}
                emissiveIntensity={0.5}
                transmission={0.4}
                metalness={0.2}
                roughness={0.1}
              />
            </mesh>
          );
        })}
      </group>

      {/* 4. OUTER MAJESTIC LOTUS RIM */}
      <group ref={ring3Ref}>
        <mesh geometry={geometries.outerTorus} castShadow>
          <meshPhysicalMaterial
            color={spec.goldColor}
            metalness={0.98}
            roughness={0.12}
            clearcoat={0.9}
          />
        </mesh>

        {/* 12 Outer Zari Droplet Studs */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 12;
          const x = Math.cos(angle) * 2.2;
          const y = Math.sin(angle) * 2.2;
          return (
            <mesh key={i} position={[x, y, 0]} geometry={geometries.pearlDrop} scale={1.2}>
              <meshStandardMaterial color="#fef3c7" metalness={0.9} roughness={0.1} />
            </mesh>
          );
        })}
      </group>

      {/* 5. FLOATING SILK VEIL RIBBON */}
      <mesh
        ref={silkRef}
        geometry={geometries.silkRibbon}
        rotation={[Math.PI * 0.45, 0.2, 0]}
        scale={[1, 1, 0.8]}
      >
        <meshPhysicalMaterial
          color={spec.gemColor}
          transmission={0.5}
          thickness={0.2}
          roughness={0.35}
          metalness={0.1}
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
