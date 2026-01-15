'use client';

import { Cylinder } from '@react-three/drei';
import { useState } from 'react';
import * as THREE from 'three';

type ProductProps = {
  position: [number, number, number];
  product: { id: number; name: string };
  onClick: (product: { id: number; name: string }) => void;
};

export default function Product({ product, position, onClick }: ProductProps) {
  const [hovered, setHover] = useState(false);

  const handleClick = () => {
    onClick(product);
  };

  return (
    <Cylinder
      args={[0.5, 0.5, 2, 32]}
      position={position}
      scale={hovered ? 1.1 : 1}
      onClick={handleClick}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <meshStandardMaterial color={hovered ? 'lightblue' : 'royalblue'} />
    </Cylinder>
  );
}
