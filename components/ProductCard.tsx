
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onImageClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onImageClick, onAddToCart }) => {
  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Prevent modal from opening when button is clicked
    onAddToCart(product);
  };

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    
    const shareData = {
      title: 'Detalles Cariñitos',
      text: `¡Mira este hermoso regalo que encontré en Detalles Cariñitos! 🎁\n\n${product.name}\n${product.description}\nPrecio: $${product.price.toLocaleString('es-CO')}\n\nVisítanos aquí:`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for desktop browsers that don't support Web Share API
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        // Visual feedback could be added here, using alert for simplicity as requested
        alert('¡Información del regalo copiada al portapapeles!'); 
      }
    } catch (err) {
      console.error('Error al compartir:', err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group transform hover:-translate-y-2 transition-all duration-300 ease-in-out hover:shadow-2xl relative">
      
      <div className="relative bg-white cursor-pointer aspect-[3/4] overflow-hidden p-4" onClick={() => onImageClick(product)}>
        {/* Share Button */}
        <button 
          onClick={handleShare}
          className="absolute top-3 left-3 bg-white/90 text-gray-600 hover:text-primary-fuchsia p-2 rounded-full shadow-md z-20 transition-colors duration-200"
          aria-label="Compartir producto"
          title="Compartir"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>

        <img 
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
          src={product.image} 
          alt={product.name} 
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-accent-lilac text-white text-sm font-bold px-3 py-1 rounded-full shadow-md z-10">
          {product.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow border-t border-gray-50">
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
