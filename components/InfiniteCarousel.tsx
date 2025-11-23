
import React from 'react';
import { Product } from '../types';

interface InfiniteCarouselProps {
  products: Product[];
  onProductClick: (product: Product) => void;
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({ products, onProductClick }) => {
  // Duplicate items for seamless loop
  const carouselItems = [...products, ...products, ...products]; // Tripled for smoother infinite feel on wide screens

  return (
    <div className="w-full py-2 md:py-8 overflow-visible relative z-20 select-none">
      
      {/* Fade edges for cleaner look */}
      <div className="absolute inset-y-0 left-0 w-8 md:w-32 bg-gradient-to-r from-background-cream to-transparent z-30 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-8 md:w-32 bg-gradient-to-l from-background-cream to-transparent z-30 pointer-events-none"></div>

      <div className="flex w-max hover:pause-animation group/track py-2 md:py-12">
        <div className="flex animate-scroll items-center gap-3 md:gap-16 px-4">
          {carouselItems.map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              onClick={() => onProductClick(product)}
              className="relative flex-shrink-0 w-16 h-16 md:w-44 md:h-44 cursor-pointer group/item perspective-1000 isolate"
            >
              {/* Wrapper for hover transform. */}
              <div className="w-full h-full relative transition-all duration-500 ease-out transform group-hover/item:scale-150 group-hover/item:z-50 group-hover/item:-translate-y-2 md:group-hover/item:-translate-y-4 flex items-center justify-center isolate">
                
                {/* BACK LAYER: Shadow/Glow (Behind image) 
                    Using negative z-index relative to this container to ensure it's behind.
                    Opacity reduced to 30% to ensure it acts as a backlight and doesn't alter front colors.
                */}
                <div className="absolute inset-0 -z-10 flex items-center justify-center transition-opacity duration-500 opacity-0 group-hover/item:opacity-30">
                   <img
                    src={product.image}
                    alt=""
                    className="w-full h-full object-contain blur-xl scale-105 saturate-150"
                    aria-hidden="true"
                  />
                </div>

                {/* FRONT LAYER: Main Image 
                    Must be z-20 to be strictly on top. 
                    No blend mode used here to keep front colors pure.
                */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-md relative z-20"
                  loading="lazy"
                />

              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .animate-scroll {
          animation: scroll 80s linear infinite;
        }
        /* Pause on hover for easier clicking */
        .hover\\:pause-animation:hover .animate-scroll {
          animation-play-state: paused;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default InfiniteCarousel;
