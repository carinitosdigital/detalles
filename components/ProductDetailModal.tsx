
import React from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  const imageUrl = "https://lh3.googleusercontent.com/pw/AP1GczPbUPUobrMysGfkmLPDtGDgad4hohhOVrgNUSSVwzQaTBnzPCaxiQDQkCrLMizoxEI1uP8XyBGXjep7zIHNGSobThdhGJpd49wxSdxkWfiS9lOU-vyqpuBFEMhOjKfEF6cW3k157Kx8DyuYO4GmdVs=w717-h717-s-no-gm?authuser=0";

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 bg-secondary-rose-light flex items-center justify-center p-6">
          <img src={imageUrl} alt={product.name} className="max-h-[70vh] md:max-h-full object-contain" />
        </div>
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-gray-100 rounded-full p-2" aria-label="Cerrar modal">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          <span className="text-accent-lilac font-semibold mb-2">{product.category}</span>
          <h2 id="product-modal-title" className="text-3xl md:text-4xl font-bold text-primary-fuchsia mb-4 leading-tight">{product.name}</h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">{product.description}</p>
          <div className="flex flex-col md:flex-row items-center justify-between mt-auto gap-4">
            <span className="text-4xl font-bold text-text-dark">${product.price.toLocaleString('es-CO')}</span>
            <button 
              onClick={() => onAddToCart(product)}
              className="w-full md:w-auto bg-primary-fuchsia text-white font-bold py-4 px-8 rounded-xl hover:brightness-110 transition-transform transform hover:scale-105 shadow-lg"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ProductDetailModal;
