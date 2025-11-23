
import React, { useState, useEffect, useMemo } from 'react';
import { CartItem, CustomerInfo, Product } from '../types';

interface CartModalProps {
  isOpen: boolean;
  cartItems: CartItem[];
  products: Product[]; 
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: (customerInfo: CustomerInfo) => void;
  onAddRecommendation: (product: Product) => void;
}

const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, 
  cartItems, 
  products,
  onClose, 
  onUpdateQuantity, 
  onCheckout,
  onAddRecommendation
}) => {
  // Inicializar estado vacío, se rellenará en useEffect
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
      nombre: '',
      telefono: '',
      para: '',
      direccion: '',
      mensajeTarjeta: '',
      metodoPago: '',
  });

  const [view, setView] = useState<'cart' | 'checkout'>('cart');

  // LOAD DATA ON OPEN: Important to sync with Chatbot
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Read from LocalStorage fresh
      try {
        const saved = localStorage.getItem('dc_customerInfo');
        if (saved) {
            setCustomerInfo(JSON.parse(saved));
        }
      } catch (e) { console.error(e); }
    } else {
      document.body.style.overflow = 'auto';
      setTimeout(() => setView('cart'), 300); 
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // SAVE DATA ON CHANGE
  useEffect(() => {
    if (customerInfo.nombre) { // Avoid saving empty init state over existing data
        localStorage.setItem('dc_customerInfo', JSON.stringify(customerInfo));
    }
  }, [customerInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.metodoPago) {
      alert("Por favor selecciona un método de pago.");
      return;
    }
    onCheckout(customerInfo);
  };
  
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // --- Recommendation Engine ---
  const recommendations = useMemo(() => {
    if (cartItems.length === 0) return [];
    
    const cartIds = new Set(cartItems.map(item => item.id));
    const cartCategories = new Set(cartItems.map(item => item.category));
    
    let recommendedCategories: string[] = [];

    // Logic: Complementary goods
    if (cartCategories.has('Desayunos')) {
        recommendedCategories.push('Peluches', 'Piñatería', 'Globos');
    }
    if (cartCategories.has('Peluches')) {
        recommendedCategories.push('Anchetas', 'Empaques', 'Chocolates');
    }
    if (cartCategories.has('Anchetas')) {
        recommendedCategories.push('Mugs', 'Vinos');
    }
    
    // If generic or no specific match, suggest popular small items
    if (recommendedCategories.length === 0) {
        recommendedCategories = ['Peluches', 'Mugs'];
    }

    // Filter candidates
    const candidates = products.filter(p => 
        !cartIds.has(p.id) && 
        (recommendedCategories.includes(p.category) || p.price < 60000) // Also suggest affordable add-ons
    );

    // Shuffle and pick 2
    return candidates.sort(() => 0.5 - Math.random()).slice(0, 2);

  }, [cartItems, products]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div
        className={`absolute inset-y-0 right-0 w-full max-w-md flex flex-col bg-white/90 backdrop-blur-xl shadow-2xl border-l border-white/60 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100/50">
          <h2 className="text-2xl font-bold font-pacifico text-primary-fuchsia">
            {view === 'cart' ? 'Tu Carrito' : 'Finalizar Compra'}
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100/50 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto scrollbar-hide">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-32 h-32 bg-pink-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                 <svg className="w-16 h-16 text-primary-fuchsia/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-500 mb-8">¡Agrega algunos detalles hermosos para sorprender a alguien!</p>
              <button onClick={onClose} className="text-primary-fuchsia font-bold hover:underline">
                Seguir explorando
              </button>
            </div>
          ) : (
            <>
              {/* Cart View */}
              {view === 'cart' && (
                <div className="p-6 space-y-6">
                  {/* Product List */}
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="group flex items-center gap-4 bg-white/60 p-3 rounded-xl shadow-sm border border-white hover:shadow-md transition-all">
                        {/* Thumbnail */}
                        <div className="w-20 h-20 bg-white rounded-lg p-2 flex-shrink-0 border border-gray-100">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        
                        {/* Info */}
                        <div className="flex-grow min-w-0">
                          <h4 className="font-bold text-gray-800 text-sm leading-tight line-clamp-2">{item.name}</h4>
                          <p className="text-primary-fuchsia font-bold text-sm mt-1">${item.price.toLocaleString('es-CO')}</p>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col items-end gap-2">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 0)} 
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                            title="Eliminar"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                          <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-white rounded-md transition-colors font-bold"
                            >-</button>
                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-gray-600 hover:bg-white rounded-md transition-colors font-bold"
                            >+</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendations */}
                  {recommendations.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-dashed border-gray-300">
                      <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-4 flex items-center gap-2">
                        <span className="text-xl">✨</span> Completa tu regalo
                      </h4>
                      <div className="space-y-3">
                        {recommendations.map(rec => (
                          <div key={rec.id} className="flex items-center justify-between bg-pink-50/50 p-3 rounded-xl border border-pink-100">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white rounded-lg p-1 flex-shrink-0">
                                    <img src={rec.image} alt={rec.name} className="w-full h-full object-contain mix-blend-multiply" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-800 line-clamp-1">{rec.name}</p>
                                    <p className="text-xs text-primary-fuchsia font-bold">${rec.price.toLocaleString('es-CO')}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => onAddRecommendation(rec)}
                                className="text-xs bg-white text-primary-fuchsia border border-primary-fuchsia font-bold px-3 py-1.5 rounded-full hover:bg-primary-fuchsia hover:text-white transition-colors shadow-sm"
                            >
                                Agregar
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Checkout View */}
              {view === 'checkout' && (
                <div className="p-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-6 text-sm text-yellow-800 flex items-start gap-2">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p>Al completar este formulario, se abrirá WhatsApp con tu pedido listo para enviar.</p>
                  </div>

                  <form id="checkout-form" onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase text-gray-500 ml-1">Tu Información</label>
                        <input required name="nombre" value={customerInfo.nombre} onChange={handleInputChange} placeholder="Tu Nombre Completo" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-fuchsia/20 focus:border-primary-fuchsia outline-none transition-all" />
                        <input required type="tel" name="telefono" value={customerInfo.telefono} onChange={handleInputChange} placeholder="Tu Teléfono / WhatsApp" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-fuchsia/20 focus:border-primary-fuchsia outline-none transition-all" />
                        <input required name="direccion" value={customerInfo.direccion} onChange={handleInputChange} placeholder="Dirección de Entrega" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-fuchsia/20 focus:border-primary-fuchsia outline-none transition-all" />
                    </div>

                    <div className="space-y-3 pt-2">
                        <label className="text-xs font-bold uppercase text-gray-500 ml-1">Detalles del Regalo</label>
                        <input required name="para" value={customerInfo.para} onChange={handleInputChange} placeholder="¿Quién recibe el regalo?" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-fuchsia/20 focus:border-primary-fuchsia outline-none transition-all" />
                        <textarea name="mensajeTarjeta" value={customerInfo.mensajeTarjeta} onChange={handleInputChange} placeholder="Mensaje para la tarjeta (Opcional)" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-fuchsia/20 focus:border-primary-fuchsia outline-none transition-all resize-none h-24" />
                    </div>

                    <div className="space-y-3 pt-2">
                        <label className="text-xs font-bold uppercase text-gray-500 ml-1">Pago</label>
                        <div className="relative">
                            <select 
                                name="metodoPago" 
                                required 
                                value={customerInfo.metodoPago}
                                onChange={handleInputChange}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary-fuchsia/20 focus:border-primary-fuchsia outline-none transition-all appearance-none"
                            >
                                <option value="">Seleccionar Método de Pago</option>
                                <option value="Nequi">Nequi</option>
                                <option value="Daviplata">Daviplata</option>
                                <option value="Datafono">Datáfono (Tarjetas)</option>
                                <option value="Efectivo">Efectivo</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Area (Total & Action) */}
        {cartItems.length > 0 && (
            <div className="p-6 bg-white/80 backdrop-blur-md border-t border-white/50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-10">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 font-medium">Total Estimado</span>
                    <span className="text-2xl font-bold text-primary-fuchsia font-poppins">
                        ${total.toLocaleString('es-CO')}
                    </span>
                </div>
                
                {view === 'cart' ? (
                    <button 
                        onClick={() => setView('checkout')}
                        className="w-full py-4 bg-gradient-to-r from-primary-fuchsia to-pink-600 text-white font-bold rounded-xl shadow-lg shadow-pink-200 hover:shadow-pink-300 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        Continuar Compra
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </button>
                ) : (
                    <div className="flex gap-3">
                        <button 
                            onClick={() => setView('cart')}
                            className="px-4 py-4 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                            Atrás
                        </button>
                        <button 
                            type="submit"
                            form="checkout-form"
                            className="flex-grow py-4 bg-green-500 text-white font-bold rounded-xl shadow-lg shadow-green-200 hover:shadow-green-300 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                            Pedir por WhatsApp
                        </button>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
