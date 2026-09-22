import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import type { ProductFinish } from '../../types/product';
import { ROYAL_FINISH_SPECS } from './RoyalMandala3D';

export interface LightingProps {
  finish?: ProductFinish;
  isMobile?: boolean;
}

export const Lighting: React.FC<LightingProps> = ({
  finish = 'emerald',
  isMobile = false,
}) => {
  const reactivePointRef = useRef<THREE.PointLight>(null);
  const spec = ROYAL_FINISH_SPECS[finish] || ROYAL_FINISH_SPECS.emerald;

  // Subtle mouse-reactive accent point light
  useFrame((state, delta) => {
    if (!reactivePointRef.current) return;
    const targetX = state.pointer.x * 2.5 + 1.0;
    const targetY = state.pointer.y * 2.0 + 1.5;

    reactivePointRef.current.position.x = THREE.MathUtils.damp(
      reactivePointRef.current.position.x,
      targetX,
      3,
      delta
    );
    reactivePointRef.current.position.y = THREE.MathUtils.damp(
      reactivePointRef.current.position.y,
      targetY,
      3,
      delta
    );
  });

  return (
    <>
      {/* Soft Palace Ambient Fill */}
      <ambientLight intensity={0.55} color="#fed7aa" />

      {/* Main Warm Golden Key Light */}
      <directionalLight
        position={[4, 6, 5]}
        intensity={2.2}
        color="#fffbeb"
        castShadow={!isMobile}
        shadow-mapSize-width={isMobile ? 512 : 1024}
        shadow-mapSize-height={isMobile ? 512 : 1024}
        shadow-bias={-0.0001}
      />

      {/* Top Overhead Spotlight for Gold Filigree Refractions */}
      <spotLight
        position={[0, 7, 2]}
        angle={0.65}
        penumbra={0.7}
        intensity={2.6}
        color="#fef08a"
      />

      {/* Cool Twilight Secondary Fill */}
      <directionalLight position={[-5, 2, 3]} intensity={0.7} color="#94a3b8" />

      {/* Gemstone Backlight Sheen */}
      <directionalLight
        position={[0, 3.5, -4.5]}
        intensity={3.2}
        color={spec.glowColor}
      />

      {/* Reactive Gem Accent Point Light */}
      <pointLight
        ref={reactivePointRef}
        position={[1.5, 2, 3.5]}
        intensity={1.4}
        distance={10}
        color={spec.glowColor}
      />

      {/* Warm Diya Under-Glow */}
      <pointLight
        position={[0, -3.5, 1]}
        intensity={0.6}
        distance={8}
        color="#f59e0b"
      />

      {/* Soft Contact Shadow */}
      <ContactShadows
        position={[0, -2.4, 0]}
        opacity={0.6}
        scale={7}
        blur={2.4}
        far={4.5}
        resolution={isMobile ? 256 : 512}
        color="#080602"
      />
    </>
  );
};
