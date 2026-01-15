'use client';

import { Canvas } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { products, Product as ProductType } from '../lib/products';
import Product from './Product';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type SceneProps = {
  selectedProduct: ProductType | null;
  onProductClick: (product: { id: number; name: string }) => void;
};

function CameraRig({
  selectedProduct,
  controlsRef,
}: {
  selectedProduct: ProductType | null;
  controlsRef: React.RefObject<CameraControls>;
}) {
  useEffect(() => {
    if (selectedProduct && controlsRef.current) {
      const productIndex = products.findIndex((p) => p.id === selectedProduct.id);
      const radius = 5;
      const angle = (productIndex / products.length) * 2 * Math.PI;
      const x = radius * Math.cos(angle);
      const z = radius * Math.sin(angle);

      const targetPosition = new THREE.Vector3(x, 0, z);
      const cameraPosition = new THREE.Vector3(x, 0, z + 3);

      controlsRef.current.setLookAt(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    }
  }, [selectedProduct, controlsRef]);

  return null;
}

export default function Scene({ selectedProduct, onProductClick }: SceneProps) {
  const controlsRef = useRef<CameraControls>(null);
  const radius = 5;

  return (
    <Canvas camera={{ position: [0, 0, 12] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {products.map((product, index) => {
        const angle = (index / products.length) * 2 * Math.PI;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        return <Product key={product.id} product={product} position={[x, 0, z]} onClick={onProductClick} />;
      })}
      <CameraControls ref={controlsRef} />
      <CameraRig selectedProduct={selectedProduct} controlsRef={controlsRef} />
    </Canvas>
  );
}
