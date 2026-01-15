'use client';

import { useState } from 'react';
import Scene from '../components/Scene';
import styles from './page.module.css';
import { products, Product } from '../lib/products';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    products[0]
  );

  const handleProductClick = (product: { id: number; name: string }) => {
    const fullProduct = products.find((p) => p.id === product.id) || null;
    setSelectedProduct(fullProduct);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.title}>The Hidden Inventory</div>
        <Scene
          selectedProduct={selectedProduct}
          onProductClick={handleProductClick}
        />
        {selectedProduct && (
          <div className={styles.productInfo}>
            <h2>{selectedProduct.name}</h2>
            <p>{selectedProduct.description}</p>
          </div>
        )}
      </main>
    </div>
  );
}
