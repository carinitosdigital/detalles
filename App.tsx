
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Product, CartItem, CustomerInfo } from './types';
import { generateProducts } from './services/geminiService';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorDisplay from './components/ErrorDisplay';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import CartModal from './components/CartModal';
import ChatWidget from './components/ChatWidget';
import WelcomeScreen from './components/WelcomeScreen';

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  
  const productsSectionRef = useRef<HTMLDivElement>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedProducts = await generateProducts();
      setProducts(generatedProducts);
      setFilteredProducts(generatedProducts);
    } catch (err) {
      console.error(err);
      setError('No pudimos cargar los regalos. Por favor, intenta de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Extract categories
  const categories = useMemo(() => {
    const cats = products.map(p => p.category);
    return Array.from(new Set(cats));
  }, [products]);

  useEffect(() => {
    let filtered = products;

    // Filter by Search
    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(lowercasedFilter) ||
        product.description.toLowerCase().includes(lowercasedFilter) ||
        product.category.toLowerCase().includes(lowercasedFilter)
      );
    }

    // Filter by Category Button
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, products, selectedCategory]);

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
    setIsCartOpen(true); // Open cart feedback
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
    
    setCart([]);
    setIsCartOpen(false);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToProducts = () => {
    productsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background-cream font-poppins text-text-dark flex flex-col relative">
      {/* Background Image Layer */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519751138087-5bf79df62d58?q=80&w=2670&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08, // Kept very subtle to not interfere with text readability
          pointerEvents: 'none'
        }}
      />

      {showWelcome && <WelcomeScreen onComplete={() => setShowWelcome(false)} />}

      <Header cartItemCount={cartItemCount} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-fuchsia mb-3 font-pacifico drop-shadow-sm">Detalles Cariñitos</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Regalos únicos, desayunos sorpresa y detalles que enamoran. <br/>
            <span className="text-base text-primary-fuchsia font-semibold">¡Servicio a domicilio 24/7!</span>
          </p>
        </div>
        
        {/* Search & Filters */}
        <div className="mb-10">
            <SearchBar onSearch={setSearchTerm} />
            
            {/* Category Pills */}
            {!isLoading && categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
                    selectedCategory === null 
                    ? 'bg-primary-fuchsia text-white shadow-md transform scale-105' 
                    : 'bg-white/90 text-gray-600 hover:bg-white border border-gray-200'
                  }`}
                >
                  Todos
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all shadow-sm ${
                      selectedCategory === cat 
                      ? 'bg-primary-fuchsia text-white shadow-md transform scale-105' 
                      : 'bg-white/90 text-gray-600 hover:bg-white border border-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
        </div>

        <div ref={productsSectionRef}>
            {isLoading ? (
            <LoadingSpinner />
            ) : error ? (
            <ErrorDisplay message={error} onRetry={fetchProducts} />
            ) : (
            <ProductGrid 
                products={filteredProducts} 
                onProductClick={setSelectedProduct} 
                onAddToCart={handleAddToCart} 
            />
            )}
        </div>
      </main>
      
      <div className="relative z-10">
        <Footer />
      </div>
      
      <ChatWidget products={products} onScrollToProducts={scrollToProducts} />

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
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default App;
