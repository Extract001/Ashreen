import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export interface FloatingObjectProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  type?: 'ring' | 'crystal' | 'halo';
  color?: string;
  speed?: number;
}

export const FloatingObject: React.FC<FloatingObjectProps> = ({
  position = [2.8, 1.2, -2.5],
  rotation = [0.4, 0.2, 0.1],
  scale = 1,
  type = 'ring',
  color = '#ffffff',
  speed = 0.2,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.rotation.x += delta * speed * 0.3;
    meshRef.current.rotation.y += delta * speed * 0.4;
    meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
      {type === 'ring' && <torusGeometry args={[1.4, 0.018, 16, 64]} />}
      {type === 'crystal' && <octahedronGeometry args={[0.5, 0]} />}
      {type === 'halo' && <ringGeometry args={[1.8, 1.83, 64]} />}

      <meshPhysicalMaterial
        color={color}
        metalness={0.9}
        roughness={0.15}
        transmission={0.4}
        thickness={0.5}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
};
