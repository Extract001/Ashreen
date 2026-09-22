import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export interface FloatingParticlesProps {
  count?: number;
  radius?: number;
  color?: string;
  speed?: number;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 1200,
  radius = 18,
  color = '#f59e0b',
  speed = 0.08,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate deterministic particle positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Golden spiral distribution in sphere shell
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * radius + 2.5; // keep center clear of product!

      const sinPhi = Math.sin(phi);
      pos[i * 3] = r * sinPhi * Math.cos(theta);
      pos[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }

    return pos;
  }, [count, radius]);

  // Soft circular glow texture for gold zari & diya ember particles
  const particleTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(254, 240, 138, 0.9)');
    gradient.addColorStop(0.7, 'rgba(245, 158, 11, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Subtle drift & gentle cursor reaction
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Slow ambient rotation
    pointsRef.current.rotation.y += delta * speed * 0.3;
    pointsRef.current.rotation.x += delta * speed * 0.15;

    // Subtle cursor-driven tilt
    const targetX = state.pointer.x * 0.12;
    const targetY = -state.pointer.y * 0.12;

    pointsRef.current.position.x = THREE.MathUtils.damp(
      pointsRef.current.position.x,
      targetX,
      2,
      delta
    );
    pointsRef.current.position.y = THREE.MathUtils.damp(
      pointsRef.current.position.y,
      targetY,
      2,
      delta
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        map={particleTexture || undefined}
        color={color}
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
};
