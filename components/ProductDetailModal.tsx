
import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
  icon: string;
}

const ADD_ONS: AddOn[] = [
  { id: 'add-1', name: 'Ferrero x3', price: 12000, icon: '🍫' },
  { id: 'add-2', name: 'Peluche Pequeño', price: 25000, icon: '🧸' },
  { id: 'add-3', name: 'Rosa Natural', price: 8000, icon: '🌹' },
  { id: 'add-4', name: 'Ramo Flores', price: 45000, icon: '💐' },
  { id: 'add-5', name: 'Chocolatina', price: 10000, icon: '🥜' },
  { id: 'add-6', name: 'Moño Gigante', price: 5000, icon: '🎀' },
  { id: 'add-7', name: 'Tarjeta', price: 5000, icon: '💌' },
  { id: 'add-8', name: 'Globo Helio', price: 15000, icon: '🎈' },
];

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  
  // Acordeón States (Mobile mainly)
  const [isDescOpen, setIsDescOpen] = useState(true);
  const [isAddonsOpen, setIsAddonsOpen] = useState(true);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const totalPrice = useMemo(() => {
    const addOnsTotal = selectedAddOns.reduce((total, id) => {
      const addOn = ADD_ONS.find(a => a.id === id);
      return total + (addOn ? addOn.price : 0);
    }, 0);
    return product.price + addOnsTotal;
  }, [product.price, selectedAddOns]);

  const handleAddToCartWithExtras = () => {
    const selectedExtras = ADD_ONS.filter(a => selectedAddOns.includes(a.id));
    
    if (selectedExtras.length === 0) {
      onAddToCart(product);
    } else {
      const extrasDescription = selectedExtras.map(e => `+ ${e.name}`).join('\n');
      const customizedProduct: Product = {
        ...product,
        id: `${product.id}-custom-${Date.now()}`,
        name: `${product.name} (+ Extras)`,
        price: totalPrice,
        description: `${product.description}\n\n--- ADICIONALES ---\n${extrasDescription}`
      };
      onAddToCart(customizedProduct);
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        /* UPDATED CONTAINER: Removed white background from main container to allow image to float on blur */
        className="w-full max-w-5xl h-[90dvh] md:h-auto md:max-h-[90vh] flex flex-col md:flex-row overflow-hidden animate-slide-up md:animate-fade-in-up relative rounded-t-3xl md:rounded-3xl shadow-2xl bg-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Botón Cerrar Flotante (Modal Principal) */}
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-500 hover:text-primary-fuchsia bg-white/90 hover:bg-white rounded-full p-2 z-50 shadow-md border border-gray-100 transition-transform hover:scale-110"
        >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* VISOR PANTALLA COMPLETA (LIGHTBOX) */}
        {isImageExpanded && (
          <div 
            className="fixed inset-0 z-[120] bg-black/95 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setIsImageExpanded(false)}
          >
            <button 
              className="absolute top-4 right-4 text-white/80 hover:text-white p-4"
              onClick={() => setIsImageExpanded(false)}
            >
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <img 
              src={product.image} 
              alt={product.name} 
              className="max-w-full max-h-full object-contain scale-100 transition-transform"
              onClick={(e) => e.stopPropagation()} 
            />
             <p className="absolute bottom-8 text-white/50 text-sm animate-pulse">Toca fuera para cerrar</p>
          </div>
        )}

        {/* COLUMNA IZQUIERDA / TOP MOBILE: IMAGEN (FRAMELESS) */}
        {/* UPDATED: bg-transparent and ambient shadow instead of solid background */}
        <div className="w-full md:w-1/2 h-[45vh] md:h-auto bg-transparent flex items-center justify-center relative overflow-hidden shrink-0 group">
           
           {/* Glass backdrop specifically for the image area to separate slightly from page background */}
           <div className="absolute inset-0 bg-white/20 backdrop-blur-3xl -z-10"></div>

           {/* Marca de agua */}
           <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <img 
                    src="https://lh3.googleusercontent.com/pw/AP1GczPrMZf5rg2zNJYRq0cAjIP3J-pzt8vEqsJ3b8z0l_tc0PFprhFdylr7Iy_lPJnVRiGVORAUCeZCkAq3d1ZunIHrH0hlq6bschkVw57o90eHV-KDZDwdrZK_XRR0WpsKE6SRp-fDJkAJBGCmQIla3Fy8=w991-h991-s-no-gm?authuser=0"
                    alt=""
                    className="w-[80%] h-[80%] object-contain opacity-20 -rotate-12 mix-blend-overlay"
                />
           </div>

          {/* Botón de Expandir (Lupa) */}
          <button 
            onClick={() => setIsImageExpanded(true)}
            className="absolute bottom-4 right-4 z-30 bg-white/40 hover:bg-white text-gray-700 hover:text-primary-fuchsia p-2 rounded-full shadow-lg transition-all backdrop-blur-md border border-white/50"
            title="Ver imagen completa"
          >
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
          </button>

          <div 
            className="w-full h-full p-8 relative z-10 flex items-center justify-center cursor-zoom-in"
            onClick={() => setIsImageExpanded(true)}
          >
             {/* Main Image with drop shadow for 3D float effect */}
            <img 
                src={product.image} 
                alt={product.name} 
                className="max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        </div>

        {/* COLUMNA DERECHA / BOTTOM MOBILE: DETALLES */}
        {/* Background restored to white/95 to ensure readability */}
        <div className="w-full md:w-1/2 flex flex-col flex-1 bg-white/95 backdrop-blur-xl -mt-6 md:mt-0 rounded-t-3xl md:rounded-l-3xl md:rounded-r-3xl shadow-[0_-4px_30px_rgba(0,0,0,0.1)] relative z-20 min-h-0 border-l border-white/50">
            
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto scrollbar-hide p-6 pb-24 md:pb-6">
                
                {/* Header del Producto */}
                <div className="mb-4 text-center md:text-left pt-2 md:pt-6">
                    <span className="inline-block px-3 py-1 bg-pink-100/80 text-primary-fuchsia rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider mb-2">
                        {product.category}
                    </span>
                    <h2 className="text-xl md:text-4xl font-bold text-gray-800 leading-tight font-poppins mb-1">
                        {product.name}
                    </h2>
                    <p className="text-xl font-bold text-primary-fuchsia md:hidden">
                        ${product.price.toLocaleString('es-CO')}
                    </p>
                </div>

                {/* Sección 1: Descripción (Colapsable) */}
                <div className="mb-3 border-b border-gray-100 pb-3">
                    <button 
                        onClick={() => setIsDescOpen(!isDescOpen)}
                        className="w-full flex items-center justify-between text-gray-800 font-bold text-xs uppercase tracking-wide py-1"
                    >
                        <span>📝 Descripción</span>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform ${isDescOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ${isDescOpen ? 'max-h-32 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                         <p className="text-gray-600 text-xs leading-relaxed">
                            {product.description}
                         </p>
                    </div>
                </div>

                {/* Sección 2: Adicionales (Colapsable - Grid de Iconos) */}
                <div className="mb-4">
                    <button 
                        onClick={() => setIsAddonsOpen(!isAddonsOpen)}
                        className="w-full flex items-center justify-between text-gray-800 font-bold text-xs uppercase tracking-wide py-1"
                    >
                        <span>✨ Adicionales</span>
                         <svg className={`w-4 h-4 text-gray-400 transition-transform ${isAddonsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    
                    <div className={`transition-all duration-300 ${isAddonsOpen ? 'opacity-100 mt-2' : 'hidden opacity-0'}`}>
                        <div className="grid grid-cols-4 md:grid-cols-3 gap-2">
                            {ADD_ONS.map(addon => {
                                const isSelected = selectedAddOns.includes(addon.id);
                                return (
                                    <button
                                        key={addon.id}
                                        onClick={() => toggleAddOn(addon.id)}
                                        className={`relative aspect-square rounded-2xl border transition-all duration-200 group flex flex-col items-center justify-center gap-0.5 p-1 ${
                                            isSelected 
                                            ? 'bg-primary-fuchsia/10 border-primary-fuchsia shadow-md' 
                                            : 'bg-gray-50 border-transparent hover:border-pink-200'
                                        }`}
                                    >
                                        <span className="text-2xl md:text-3xl filter drop-shadow-sm">{addon.icon}</span>
                                        <span className="text-[8px] md:text-[10px] font-bold text-gray-700 text-center leading-none line-clamp-2 w-full">
                                            {addon.name}
                                        </span>
                                        {isSelected && (
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-fuchsia rounded-full flex items-center justify-center shadow-sm">
                                                <svg className="w-1.5 h-1.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>

            {/* FOOTER STICKY (Acción) */}
            <div className="absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 p-4 md:p-6 pb-6 md:pb-6 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-30 rounded-b-none md:rounded-br-3xl">
                 <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                        <span className="text-[9px] text-gray-500 font-bold uppercase">Total Estimado</span>
                        <span className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight font-poppins">
                            ${totalPrice.toLocaleString('es-CO')}
                        </span>
                    </div>
                    <button 
                        onClick={handleAddToCartWithExtras}
                        className="flex-grow bg-gradient-to-r from-primary-fuchsia to-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-pink-200 hover:shadow-pink-300 active:scale-95 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                    >
                        <span>Agregar</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </button>
                 </div>
            </div>

        </div>
      </div>
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: scale(0.95) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slide-up {
          0% { transform: translateY(100%); }
          100% { transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-up { animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailModal;
