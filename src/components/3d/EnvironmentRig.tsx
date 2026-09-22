import React from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

export interface EnvironmentRigProps {
  reducedMotion?: boolean;
  isMobile?: boolean;
}

export const EnvironmentRig: React.FC<EnvironmentRigProps> = ({
  reducedMotion = false,
  isMobile = false,
}) => {
  const basePos = React.useMemo(() => new THREE.Vector3(0, 0, 5.8), []);

  useFrame((state, delta) => {
    if (reducedMotion) {
      state.camera.position.set(basePos.x, basePos.y, basePos.z);
      state.camera.lookAt(0, 0, 0);
      return;
    }

    // Parallax damping factor
    const dampSpeed = isMobile ? 1.5 : 2.8;
    const factorX = isMobile ? 0.15 : 0.38;
    const factorY = isMobile ? 0.12 : 0.28;

    const targetX = basePos.x + state.pointer.x * factorX;
    const targetY = basePos.y + state.pointer.y * factorY;

    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      targetX,
      dampSpeed,
      delta
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      targetY,
      dampSpeed,
      delta
    );

    state.camera.lookAt(0, 0, 0);
  });

  return null;
};
