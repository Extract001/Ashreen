import React from 'react';
import type { Product } from '../../types/product';
import { ProductCard } from './ProductCard';

export interface ProductGridProps {
  products: Product[];
  onInspect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onInspect,
  onAddToCart,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onInspect={onInspect}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};
