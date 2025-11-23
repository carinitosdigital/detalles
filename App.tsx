
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Product, CartItem, CustomerInfo } from './types';
import { generateProducts } from './services/geminiService';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import CartModal from './components/CartModal';
import ChatWidget from './components/ChatWidget';
import WelcomeScreen from './components/WelcomeScreen';
import AboutSection from './components/AboutSection';
import InfiniteCarousel from './components/InfiniteCarousel';
import LiveVisitors from './components/LiveVisitors';

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // PERSISTENCIA: Categoría
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    try {
      return localStorage.getItem('dc_selectedCategory');
    } catch {
      return null;
    }
  });

  // PERSISTENCIA: Modo de Vista
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'single'>(() => {
    try {
      const saved = localStorage.getItem('dc_viewMode');
      return (saved === 'grid' || saved === 'single') ? saved : 'list';
    } catch {
      return 'list';
    }
  });

  // PERSISTENCIA: Carrito de Compras
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  
  const productsSectionRef = useRef<HTMLDivElement>(null);

  // EFECTOS DE GUARDADO (LocalStorage)
  useEffect(() => {
    localStorage.setItem('dc_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (selectedCategory) {
      localStorage.setItem('dc_selectedCategory', selectedCategory);
    } else {
      localStorage.removeItem('dc_selectedCategory');
    }
  }, [selectedCategory]);

  useEffect(() => {
    localStorage.setItem('dc_viewMode', viewMode);
  }, [viewMode]);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedProducts = await generateProducts();
      setProducts(generatedProducts);
      setFilteredProducts(generatedProducts);
    } catch (err) {
      console.error(err);
      setError('No pudimos cargar el catálogo. Por favor, recarga la página.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const categories = useMemo(() => {
    const cats = products.map(p => p.category);
    return Array.from(new Set(cats));
  }, [products]);

  useEffect(() => {
    let filtered = products;
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [products, selectedCategory]);

  const handleAddToCart = (productToAdd: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...productToAdd, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCart(prevCart => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };
  
  const handleCheckout = (customerInfo: CustomerInfo) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const productList = cart.map(item => `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString('es-CO')})`).join('\n');

    const message = `*NUEVO PEDIDO - DETALLES CARIÑITOS* 🎁
-----------------------------------
*Datos del Cliente:*
👤 Nombre: ${customerInfo.nombre}
📞 Teléfono: ${customerInfo.telefono}
📍 Dirección: ${customerInfo.direccion}
🎁 Para: ${customerInfo.para}
-----------------------------------
*Productos:*
${productList}

*💰 TOTAL: $${total.toLocaleString('es-CO')}*
-----------------------------------
*Detalles Adicionales:*
💳 Método de Pago: ${customerInfo.metodoPago}
✉️ Mensaje Tarjeta: ${customerInfo.mensajeTarjeta || "Sin mensaje"}
-----------------------------------
¡Hola! Quisiera confirmar este pedido. 😊`;

    const whatsappUrl = `https://wa.me/573229297190?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Limpiar carrito y almacenamiento local del formulario
    setCart([]);
    localStorage.removeItem('dc_customerInfo'); 
    setIsCartOpen(false);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background-cream font-poppins text-text-dark flex flex-col relative overflow-x-hidden" id="inicio">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519751138087-5bf79df62d58?q=80&w=2670&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
          pointerEvents: 'none'
        }}
      />

      {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}

      <Header 
        cartItemCount={cartItemCount} 
        onCartClick={() => setIsCartOpen(true)} 
        products={products}
        onProductSelect={setSelectedProduct}
        // Filters Props
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        // View Mode Props
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      
      {/* Infinite Carousel with Overlay effect 
          Added more top padding (pt-36 md:pt-44) because header is taller now with filters
      */}
      <div className="pt-40 md:pt-48 relative z-20 mb-4 md:mb-8">
          {!isLoading && products.length > 0 && (
            <InfiniteCarousel products={products} onProductClick={setSelectedProduct} />
          )}
      </div>
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-2 pb-12 relative z-10">
        <div className="text-center mb-4 md:mb-12">
          <h1 className="text-xl md:text-5xl font-semibold text-primary-fuchsia mb-1 md:mb-3 font-poppins drop-shadow-sm">Detalles Cariñitos</h1>
          <p className="text-xs md:text-xl text-gray-600 max-w-2xl mx-auto leading-tight">
            Regalos únicos y desayunos sorpresa.<br/>
            <span className="text-[10px] md:text-base text-primary-fuchsia font-semibold">¡Servicio a domicilio 24/7!</span>
          </p>
        </div>
        
        {/* Filters have been moved to Header.tsx */}

        <div id="catalogo" ref={productsSectionRef} className="scroll-mt-48 min-h-[500px]">
            {isLoading ? (
            <LoadingSpinner />
            ) : error ? (
            <ErrorDisplay message={error} onRetry={fetchProducts} />
            ) : (
            <ProductGrid 
                products={filteredProducts} 
                onProductClick={setSelectedProduct} 
                onAddToCart={handleAddToCart} 
                viewMode={viewMode}
            />
            )}
        </div>

        <div id="nosotros" className="mt-10 md:mt-24 scroll-mt-32">
           <AboutSection />
        </div>
      </main>
      
      <div id="contacto" className="relative z-10">
        <Footer />
      </div>
      
      <ChatWidget 
        products={products} 
        onScrollToProducts={scrollToProducts} 
        onProductSelect={setSelectedProduct} // Passed prop to open modal
      />
      <LiveVisitors />

      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product) => {
            handleAddToCart(product);
            setSelectedProduct(null);
          }}
        />
      )}

      <CartModal 
        isOpen={isCartOpen}
        cartItems={cart}
        products={products}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onCheckout={handleCheckout}
        onAddRecommendation={handleAddToCart}
      />
    </div>
  );
};

export default App;
