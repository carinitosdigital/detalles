
import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  viewMode: 'grid' | 'list' | 'single';
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick, onAddToCart, viewMode }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-700">No se encontraron regalos</h2>
        <p className="text-gray-500 mt-2">Intenta con otra palabra clave o revisa nuestro catálogo completo.</p>
      </div>
    );
  }

  // Dynamic Grid Classes
  let gridClass = '';
  if (viewMode === 'grid') {
    gridClass = 'grid-cols-2'; // 2 columns (Mobile default grid)
  } else if (viewMode === 'list' || viewMode === 'single') {
    gridClass = 'grid-cols-1'; // 1 column for list or single big card
  }

  return (
    <div className={`grid ${gridClass} md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-10 px-3 md:px-0 transition-all duration-300`}>
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onImageClick={onProductClick}
          onAddToCart={onAddToCart}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
