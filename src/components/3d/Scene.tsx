import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import type { ProductFinish } from '../../types/product';
import { ProductModel } from './ProductModel';
import { FloatingParticles } from './FloatingParticles';
import { FloatingObject } from './FloatingObject';
import { Lighting } from './Lighting';
import { EnvironmentRig } from './EnvironmentRig';
import { useWindowSize } from '../../hooks/useWindowSize';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export interface SceneProps {
  finish?: ProductFinish;
  modelPath?: string;
  productScale?: number;
  productPosition?: [number, number, number];
  productRotation?: [number, number, number];
  className?: string;
}

const ResponsiveProductRig: React.FC<{
  finish: ProductFinish;
  modelPath?: string;
  desktopScale: number;
  desktopPosition: [number, number, number];
  rotation: [number, number, number];
  reducedMotion: boolean;
}> = ({ finish, modelPath, desktopScale, desktopPosition, rotation, reducedMotion }) => {
  const { width: vWidth } = useThree((state) => state.viewport);
  const isNarrow = vWidth < 5.0;

  // Dynamic viewport-based scale and positioning for mobile and desktop
  const scale = isNarrow ? Math.max(0.48, Math.min(0.58, vWidth * 0.16)) : desktopScale;
  const position: [number, number, number] = isNarrow
    ? [0, 0.1, 0]
    : desktopPosition;

  return (
    <ProductModel
      modelPath={modelPath}
      finish={finish}
      scale={scale}
      position={position}
      rotation={rotation}
      floatingEnabled={!reducedMotion}
      interactiveRotation={!reducedMotion}
    />
  );
};

export const Scene: React.FC<SceneProps> = ({
  finish = 'emerald',
  modelPath,
  productScale = 0.58,
  productPosition = [1.4, -0.05, 0],
  productRotation = [0.12, -0.65, -0.06],
  className = '',
}) => {
  const { isMobile, particleBudget, targetDpr } = useWindowSize();
  const reducedMotion = useReducedMotion();

  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6.0], fov: 45, near: 0.1, far: 80 }}
        dpr={[1, targetDpr]}
        shadows={!isMobile ? { type: THREE.PCFShadowMap } : false}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        <Suspense fallback={null}>
          <EnvironmentRig reducedMotion={reducedMotion} isMobile={isMobile} />
          <Lighting finish={finish} isMobile={isMobile} />

          {/* Drifting Ambient Particle Field */}
          <FloatingParticles
            count={reducedMotion ? Math.floor(particleBudget * 0.3) : particleBudget}
            radius={isMobile ? 12 : 18}
            speed={reducedMotion ? 0.02 : 0.07}
          />

          {/* Subtle Background Geometric Artifacts */}
          {!isMobile && (
            <>
              <FloatingObject
                position={[-3.2, 1.8, -3.5]}
                type="ring"
                color="#64748b"
                speed={reducedMotion ? 0.05 : 0.15}
                scale={0.9}
              />
              <FloatingObject
                position={[3.8, -1.4, -3]}
                type="ring"
                color="#38bdf8"
                speed={reducedMotion ? 0.05 : 0.22}
                scale={1.3}
              />
              <FloatingObject
                position={[2.6, 2.3, -4.5]}
                type="crystal"
                color="#e2e8f0"
                speed={reducedMotion ? 0.04 : 0.12}
                scale={0.7}
              />
            </>
          )}

          {/* Responsive Centerpiece Hero Product */}
          <ResponsiveProductRig
            finish={finish}
            modelPath={modelPath}
            desktopScale={productScale}
            desktopPosition={productPosition}
            rotation={productRotation}
            reducedMotion={reducedMotion}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
