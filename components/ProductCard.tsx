
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onImageClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onImageClick, onAddToCart }) => {
  const imageUrl = "https://lh3.googleusercontent.com/pw/AP1GczPbUPUobrMysGfkmLPDtGDgad4hohhOVrgNUSSVwzQaTBnzPCaxiQDQkCrLMizoxEI1uP8XyBGXjep7zIHNGSobThdhGJpd49wxSdxkWfiS9lOU-vyqpuBFEMhOjKfEF6cW3k157Kx8DyuYO4GmdVs=w717-h717-s-no-gm?authuser=0";

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent modal from opening when button is clicked
    onAddToCart(product);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-2xl">
      <div className="relative bg-secondary-rose-light cursor-pointer" onClick={() => onImageClick(product)}>
        <img className="w-full h-64 object-contain p-4" src={imageUrl} alt={product.name} />
        <div className="absolute top-3 right-3 bg-accent-lilac text-white text-sm font-bold px-3 py-1 rounded-full">{product.category}</div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-text-dark truncate group-hover:text-primary-fuchsia transition-colors">{product.name}</h3>
        <p className="text-gray-600 text-base mt-2 flex-grow line-clamp-3">{product.description}</p>
        <div className="mt-5 flex justify-between items-center">
          <span className="text-2xl font-bold text-text-dark">${product.price.toLocaleString('es-CO')}</span>
          <button 
            onClick={handleAddToCartClick}
            className="bg-primary-fuchsia text-white font-semibold py-2 px-4 rounded-lg hover:brightness-110 transition-all duration-300 transform group-hover:scale-105 text-sm shadow-md"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
