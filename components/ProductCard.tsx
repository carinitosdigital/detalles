
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onImageClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  viewMode: 'grid' | 'list' | 'single';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onImageClick, onAddToCart, viewMode }) => {
  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleShare = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    let urlToShare = window.location.href;
    try {
        const urlObj = new URL(urlToShare);
        if (!['http:', 'https:'].includes(urlObj.protocol)) throw new Error();
    } catch {
        urlToShare = 'https://detallescarinitos.com/';
    }
    
    const shareData = {
      title: 'Detalles Cariñitos',
      text: `¡Mira este hermoso regalo! 🎁\n\n${product.name}\nPrecio: $${product.price.toLocaleString('es-CO')}`,
      url: urlToShare
    };

    try {
      if (navigator.share) await navigator.share(shareData);
      else throw new Error();
    } catch {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
      alert('¡Enlace copiado!'); 
    }
  };

  // -- LAYOUT LOGIC --
  // 'list': Horizontal layout (flex-row)
  // 'grid' | 'single': Vertical layout (flex-col)
  
  const isList = viewMode === 'list';
  const isGrid = viewMode === 'grid'; // 2 columns compact

  return (
    <div 
      className={`group relative flex ${isList ? 'flex-row items-center' : 'flex-col'} rounded-2xl md:rounded-[2rem] transition-all duration-500 ease-out hover:-translate-y-1 md:hover:-translate-y-3 hover:z-40 h-full w-full bg-white/40 backdrop-blur-md border border-white/60 shadow-sm hover:shadow-xl overflow-hidden`}
      style={{ minHeight: isList ? '120px' : 'auto' }}
    >
      
      {/* -- IMAGE CONTAINER -- */}
      <div 
        className={`relative isolate cursor-pointer flex items-center justify-center p-2 ${
            isList ? 'w-[35%] h-32' : 'w-full aspect-[4/5] mb-2'
        }`}
        onClick={() => onImageClick(product)}
      >
        {/* Ambient Shadow (Behind) */}
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-700 opacity-0 group-hover:opacity-30 -z-10 pointer-events-none">
            <img src={product.image} alt="" className="w-[80%] h-[80%] object-contain blur-xl saturate-150" />
        </div>
        
        {/* Main Image */}
        <img 
            src={product.image} 
            alt={product.name} 
            className={`relative z-20 object-contain drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-110 ${
                isList ? 'w-full h-full' : 'w-full h-full'
            }`}
            loading="lazy"
        />

        {/* Watermark */}
        <div className="absolute inset-0 z-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
             <img src="https://lh3.googleusercontent.com/pw/AP1GczPrMZf5rg2zNJYRq0cAjIP3J-pzt8vEqsJ3b8z0l_tc0PFprhFdylr7Iy_lPJnVRiGVORAUCeZCkAq3d1ZunIHrH0hlq6bschkVw57o90eHV-KDZDwdrZK_XRR0WpsKE6SRp-fDJkAJBGCmQIla3Fy8=w991-h991-s-no-gm?authuser=0" alt="" className="w-2/3 h-2/3 object-contain opacity-20 -rotate-12 mix-blend-overlay" />
        </div>

        {/* Share Button (Position varies by layout) */}
        <button 
            onClick={handleShare}
            className={`absolute z-40 p-1.5 bg-white/80 rounded-full shadow-sm text-gray-400 hover:text-primary-fuchsia hover:bg-white transition-all ${
                isList ? 'top-1 left-1 scale-75' : 'top-2 left-2'
            }`}
        >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
        </button>

         {/* Category Tag (Position varies) */}
         <span className={`absolute z-40 px-2 py-0.5 bg-white/90 backdrop-blur border border-pink-100 text-[8px] font-extrabold text-primary-fuchsia uppercase tracking-widest rounded-full shadow-sm ${
             isList ? 'bottom-1 right-1 scale-75' : 'top-2 right-2'
         }`}>
            {product.category}
        </span>
      </div>

      {/* -- CONTENT CONTAINER -- */}
      <div className={`flex flex-col ${isList ? 'w-[65%] p-3 h-full justify-between' : 'mt-auto p-3 pt-0'}`}>
        
        <div>
            <h3 
                className={`font-bold text-gray-800 leading-tight group-hover:text-primary-fuchsia transition-colors cursor-pointer ${
                    isList ? 'text-sm mb-1 line-clamp-2' : 'text-xs md:text-lg mb-1 md:mb-2 line-clamp-2 min-h-[2.5em] md:min-h-0'
                }`}
                onClick={() => onImageClick(product)}
            >
                {product.name}
            </h3>
            
            {/* Description: Hidden in Grid (Compact), Visible in List/Single */}
            {!isGrid && (
                <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed line-clamp-2 mb-2">
                    {product.description}
                </p>
            )}
        </div>

        <div className={`flex items-center justify-between pt-2 border-t border-gray-100/50 gap-1 ${isList ? 'mt-auto' : ''}`}>
            <div className="flex flex-col">
                {!isList && isGrid && <span className="hidden md:block text-[10px] text-gray-400 font-bold uppercase">Precio</span>}
                <span className={`font-bold text-gray-900 ${isList ? 'text-sm' : 'text-sm md:text-xl'}`}>
                    ${product.price.toLocaleString('es-CO')}
                </span>
            </div>
            <button 
                onClick={handleAddToCartClick}
                className={`flex items-center justify-center rounded-full bg-gray-900 text-white shadow-lg group-hover:bg-primary-fuchsia transition-all duration-300 ${
                    isList ? 'w-8 h-8 scale-90' : 'w-8 h-8 md:w-10 md:h-10'
                }`}
            >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
