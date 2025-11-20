
import React, { useState, useEffect } from 'react';
import { CartItem, CustomerInfo } from '../types';

interface CartModalProps {
  isOpen: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onCheckout: (customerInfo: CustomerInfo) => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, cartItems, onClose, onUpdateQuantity, onCheckout }) => {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    nombre: '',
    telefono: '',
    para: '',
    direccion: '',
    mensajeTarjeta: '',
    metodoPago: '',
  });

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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed top-0 right-0 h-full w-full max-w-lg bg-background-cream shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out"
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-3xl font-bold text-primary-fuchsia">Mi Carrito</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Cerrar carrito">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
            <svg className="w-24 h-24 text-gray-300 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            <h3 className="text-2xl font-semibold text-gray-700">Tu carrito está vacío</h3>
            <p className="text-gray-500 mt-2">¡Añade algunos regalos para empezar!</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-6 flex flex-col">
            <div className="flex-grow">
                {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4 mb-4 border-b pb-4 border-gray-100 last:border-0">
                    <div className="flex-grow">
                      <p className="font-bold text-lg text-text-dark">{item.name}</p>
                      <p className="text-primary-fuchsia font-semibold">${item.price.toLocaleString('es-CO')}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white rounded-full px-2 py-1 shadow-sm border">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-primary-fuchsia font-bold text-xl">-</button>
                      <span className="font-medium w-4 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-primary-fuchsia font-bold text-xl">+</button>
                    </div>
                    <p className="font-bold w-24 text-right text-text-dark">${(item.price * item.quantity).toLocaleString('es-CO')}</p>
                </div>
                ))}
            </div>
            
            <div className="mt-auto pt-2">
                <div className="flex justify-between items-center font-bold text-2xl mb-6 p-4 bg-white rounded-lg shadow-sm">
                    <span>Total:</span>
                    <span className="text-primary-fuchsia">${total.toLocaleString('es-CO')}</span>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <h3 className="text-xl font-semibold text-text-dark mb-2">Datos de Envío y Pago</h3>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <input type="text" name="nombre" placeholder="Tu Nombre Completo" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-fuchsia focus:outline-none" value={customerInfo.nombre} onChange={handleInputChange} />
                      <input type="tel" name="telefono" placeholder="Tu Teléfono" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-fuchsia focus:outline-none" value={customerInfo.telefono} onChange={handleInputChange} />
                      <input type="text" name="para" placeholder="¿Para quién es el regalo?" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-fuchsia focus:outline-none" value={customerInfo.para} onChange={handleInputChange} />
                      <input type="text" name="direccion" placeholder="Dirección completa de entrega" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-fuchsia focus:outline-none" value={customerInfo.direccion} onChange={handleInputChange} />
                      
                      <textarea 
                        name="mensajeTarjeta" 
                        placeholder="Mensaje para la tarjeta (opcional)" 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-fuchsia focus:outline-none resize-none h-24" 
                        value={customerInfo.mensajeTarjeta} 
                        onChange={handleInputChange} 
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Método de Pago</label>
                        <select 
                          name="metodoPago" 
                          required 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-fuchsia focus:outline-none bg-white"
                          value={customerInfo.metodoPago}
                          onChange={handleInputChange}
                        >
                          <option value="">Selecciona una opción</option>
                          <option value="Nequi">Nequi</option>
                          <option value="Daviplata">Daviplata</option>
                          <option value="Datafono">Datáfono</option>
                          <option value="Efectivo">Efectivo</option>
                        </select>
                      </div>
                    </div>

                    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl mt-4 transition-colors flex items-center justify-center gap-2">
                      <span>Completar Pedido en WhatsApp</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    </button>
                </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
