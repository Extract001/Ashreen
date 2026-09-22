import React, { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import type { ProductFinish } from '../../types/product';
import { RoyalMandala3D, ROYAL_FINISH_SPECS } from './RoyalMandala3D';

export interface ProductModelProps {
  modelPath?: string;
  finish?: ProductFinish;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  floatingEnabled?: boolean;
  interactiveRotation?: boolean;
}

/**
 * Helper to render an external GLB model if available
 */
const GLBModelInner: React.FC<{
  path: string;
  finish: ProductFinish;
  scale: number;
}> = ({ path, finish, scale }) => {
  const { scene } = useGLTF(path);
  const clonedScene = React.useMemo(() => scene.clone(), [scene]);
  const spec = ROYAL_FINISH_SPECS[finish] || ROYAL_FINISH_SPECS.emerald;

  useEffect(() => {
    // Enable shadows and apply luxury PBR material attributes if applicable
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material && 'roughness' in mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.envMapIntensity = 1.4;
          if (!mat.map) {
            mat.color.set(spec.gemColor);
            mat.metalness = spec.metalness;
            mat.roughness = spec.roughness;
          }
        }
      }
    });
  }, [clonedScene, finish, spec]);

  return <primitive object={clonedScene} scale={scale} />;
};

/**
 * Error boundary / existence check wrapper for external GLB models.
 * Falls back to high-fidelity Royal Indian Couture Mandala model if external asset is absent.
 */
export const ProductModel: React.FC<ProductModelProps> = ({
  modelPath,
  finish = 'emerald',
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  floatingEnabled = true,
  interactiveRotation = true,
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const [modelAvailable, setModelAvailable] = useState<boolean>(false);

  useEffect(() => {
    if (!modelPath) {
      setModelAvailable(false);
      return;
    }

    // Check if the GLB file actually exists before attempting Drei useGLTF
    fetch(modelPath, { method: 'HEAD' })
      .then((res) => {
        if (res.ok && res.headers.get('content-type')?.includes('model')) {
          setModelAvailable(true);
        } else {
          setModelAvailable(false);
        }
      })
      .catch(() => {
        setModelAvailable(false);
      });
  }, [modelPath]);

  // Handle master position updates
  useFrame((_, delta) => {
    if (!rootRef.current) return;
    rootRef.current.position.x = THREE.MathUtils.damp(
      rootRef.current.position.x,
      position[0],
      4,
      delta
    );
    rootRef.current.position.y = THREE.MathUtils.damp(
      rootRef.current.position.y,
      position[1],
      4,
      delta
    );
    rootRef.current.position.z = THREE.MathUtils.damp(
      rootRef.current.position.z,
      position[2],
      4,
      delta
    );
  });

  return (
    <group ref={rootRef} position={position} rotation={rotation}>
      {modelAvailable && modelPath ? (
        <Suspense
          fallback={
            <RoyalMandala3D
              finish={finish}
              scale={scale}
              floatingEnabled={floatingEnabled}
              interactiveRotation={interactiveRotation}
            />
          }
        >
          <GLBModelInner path={modelPath} finish={finish} scale={scale} />
        </Suspense>
      ) : (
        <RoyalMandala3D
          finish={finish}
          scale={scale}
          floatingEnabled={floatingEnabled}
          interactiveRotation={interactiveRotation}
        />
      )}
    </group>
  );
};
