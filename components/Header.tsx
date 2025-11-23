
import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  products?: Product[];
  onProductSelect?: (product: Product) => void;
  // Filter Props
  categories?: string[];
  selectedCategory?: string | null;
  onSelectCategory?: (category: string | null) => void;
  // View Mode Props
  viewMode?: 'grid' | 'list' | 'single';
  setViewMode?: (mode: 'grid' | 'list' | 'single') => void;
}

// Simple Levenshtein distance for fuzzy matching (Spell correction)
const getLevenshteinDistance = (a: string, b: string) => {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

const Header: React.FC<HeaderProps> = ({ 
    cartItemCount, 
    onCartClick, 
    products = [], 
    onProductSelect,
    categories = [],
    selectedCategory,
    onSelectCategory,
    viewMode,
    setViewMode
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY;
        
        // Show header if at the very top or scrolling up
        if (currentScrollY < lastScrollY || currentScrollY < 50) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 50 && !isMobileMenuOpen && !showResults) {
          // Hide header if scrolling down, not at top, menu closed, and not searching
          setIsVisible(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    // Click outside to close search results
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', controlNavbar);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lastScrollY, isMobileMenuOpen, showResults]);

  // Search Logic with Fuzzy Matching
  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const normalizedQuery = searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    const results = products.filter(product => {
      const normalizedName = product.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const normalizedDesc = product.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      const normalizedCat = product.category.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // 1. Exact substring match (Priority)
      if (normalizedName.includes(normalizedQuery) || normalizedCat.includes(normalizedQuery)) return true;
      
      // 2. Fuzzy match (Typo tolerance) - allow up to 2 errors for words > 4 chars
      if (normalizedQuery.length > 3) {
        const distance = getLevenshteinDistance(normalizedQuery, normalizedName);
        // Allow flexible matching relative to string length
        if (distance <= 2) return true;
        
        // Check individual words in name
        const words = normalizedName.split(' ');
        return words.some(word => getLevenshteinDistance(normalizedQuery, word) <= 2);
      }
      
      return false;
    });

    setSearchResults(results.slice(0, 5)); // Limit to 5 suggestions
    setShowResults(true);
  }, [searchQuery, products]);

  // Voice Search
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Tu navegador no soporta búsqueda por voz.");
      return;
    }

    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'es-CO';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript); // Sets query which triggers useEffect
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

   // Category Icon Mapping
   const getCategoryIcon = (category: string) => {
    const map: Record<string, string> = {
      'Desayunos': '🥐',
      'Anchetas': '🧺',
      'Peluches': '🧸',
      'Mugs': '☕',
      'Cojines': '🛋️',
      'Piñatería': '🎉',
      'Billeteras': '👛',
      'Cosméticos': '💄',
      'Empaques': '🎁',
      'Regalos': '💝'
    };
    return map[category] || '✨';
  };

  const navLinks = [
    { name: 'Inicio', id: 'inicio' },
    { name: 'Catálogo', id: 'catalogo' },
    { name: 'Nosotros', id: 'nosotros' },
    { name: 'Contacto', id: 'contacto' },
  ];

  return (
    <>
      <header 
        // Increased duration to duration-1000 for slower disappear
        className={`fixed top-0 z-40 w-full transition-all duration-1000 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        {/* Capa Base "Opalizada" */}
        <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-r from-white/90 via-pink-50/80 to-blue-50/60 border-b border-white/60 shadow-[0_8px_32px_rgba(255,255,255,0.4)]"></div>
        
        {/* Textura Granulada */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-pink-200/20 animate-pulse pointer-events-none"></div>

        <div className="relative w-full max-w-7xl mx-auto flex flex-col z-10">
            
            {/* ROW 1: Logo, Search, Actions */}
            <div className="px-4 sm:px-6 lg:px-8 py-2 flex justify-between items-center gap-2 md:gap-4">
            
            {/* Logo */}
            <div 
                className="flex items-center gap-2 md:gap-3 group cursor-pointer flex-shrink-0" 
                onClick={() => scrollToSection('inicio')}
            >
                <img
                src="https://lh3.googleusercontent.com/pw/AP1GczPbUPUobrMysGfkmLPDtGDgad4hohhOVrgNUSSVwzQaTBnzPCaxiQDQkCrLMizoxEI1uP8XyBGXjep7zIHNGSobThdhGJpd49wxSdxkWfiS9lOU-vyqpuBFEMhOjKfEF6cW3k157Kx8DyuYO4GmdVs=w717-h717-s-no-gm?authuser=0"
                alt="Logo"
                className="h-10 md:h-14 drop-shadow-md transition-transform duration-300 group-hover:scale-105"
                />
                <h1 className="hidden lg:block text-xl md:text-2xl font-poppins font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary-fuchsia to-purple-600 drop-shadow-sm leading-tight pt-1">
                Detalles Cariñitos
                </h1>
            </div>

            {/* Barra de Búsqueda Central */}
            <div className="flex-grow max-w-md relative" ref={searchRef}>
                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/60 backdrop-blur-sm border border-white/50 rounded-full py-2 pl-9 md:pl-10 pr-9 md:pr-10 text-xs md:text-base focus:outline-none focus:ring-2 focus:ring-primary-fuchsia/50 focus:bg-white transition-all shadow-inner placeholder-gray-500 text-gray-700"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    
                    {/* Botón Voz */}
                    <button 
                        onClick={startListening}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 md:p-1.5 rounded-full transition-all hover:bg-gray-100 ${isListening ? 'text-primary-fuchsia scale-110 animate-pulse' : 'text-gray-400'}`}
                        title="Buscar por voz"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                    </button>
                </div>

                {/* Resultados Flotantes */}
                {showResults && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                        <ul>
                            {searchResults.map((product) => (
                                <li 
                                    key={product.id}
                                    onClick={() => {
                                        if(onProductSelect) onProductSelect(product);
                                        setShowResults(false);
                                        setSearchQuery('');
                                    }}
                                    className="flex items-center p-3 hover:bg-pink-50 transition-colors cursor-pointer border-b border-gray-100 last:border-0 gap-3"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-lg p-1 shadow-sm flex-shrink-0">
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="w-full h-full object-contain mix-blend-multiply"
                                        />
                                    </div>
                                    <div className="flex-grow min-w-0">
                                        <p className="text-xs md:text-sm font-bold text-gray-800 truncate">{product.name}</p>
                                        <p className="text-[10px] md:text-xs text-gray-500 truncate">{product.category}</p>
                                    </div>
                                    <span className="text-xs md:text-sm font-bold text-primary-fuchsia whitespace-nowrap">
                                        ${product.price.toLocaleString('es-CO')}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {showResults && searchResults.length === 0 && searchQuery && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white/90 backdrop-blur-xl rounded-xl shadow-lg p-4 text-center text-sm text-gray-500 z-50">
                        No encontramos resultados para "{searchQuery}"
                    </div>
                )}
            </div>

            {/* Menú Navegación (Desktop) */}
            <nav className="hidden md:flex items-center gap-6 flex-shrink-0">
                {navLinks.map((link) => (
                <button
                    key={link.name}
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-700 font-medium hover:text-primary-fuchsia transition-colors relative group py-2 text-sm lg:text-base"
                >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-fuchsia transition-all duration-300 group-hover:w-full"></span>
                </button>
                ))}
            </nav>

            {/* Botones Acción */}
            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
                {/* Carrito */}
                <button 
                onClick={onCartClick} 
                className="relative group p-2 rounded-xl hover:bg-white/50 transition-all duration-300"
                >
                <svg className="h-6 w-6 text-gray-700 group-hover:text-primary-fuchsia transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary-fuchsia text-white text-[10px] font-bold flex items-center justify-center shadow-sm animate-bounce-subtle">
                    {cartItemCount}
                    </span>
                )}
                </button>

                {/* Hamburguesa Móvil */}
                <button 
                className="md:hidden p-2 text-gray-700 hover:text-primary-fuchsia transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                {isMobileMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
                </button>
            </div>
            </div>

            {/* ROW 2: FILTERS & CONTROLS (Integrated into Header) */}
            <div className="px-4 sm:px-6 lg:px-8 pb-2 border-t border-white/20 pt-2">
                <div className="flex items-center justify-between gap-2">
                    {/* Toggle Filters Button */}
                    <button 
                        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all ${
                            isFiltersOpen ? 'bg-primary-fuchsia text-white' : 'bg-white/60 text-gray-600 border border-gray-200/50'
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
                        Filtros {selectedCategory && <span className="ml-1 w-2 h-2 bg-green-400 rounded-full"></span>}
                        <svg className={`w-3 h-3 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </button>

                    {/* View Mode Toggles */}
                    {setViewMode && (
                        <div className="flex items-center bg-white/40 rounded-lg p-0.5 border border-gray-200/50">
                            <button 
                                onClick={() => setViewMode('list')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white text-primary-fuchsia shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                title="Lista"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            </button>
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white text-primary-fuchsia shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                title="Cuadrícula (2)"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                            </button>
                            <button 
                                onClick={() => setViewMode('single')}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'single' ? 'bg-white text-primary-fuchsia shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                                title="Grande (1)"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" /></svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Collapsible Filter Drawer */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFiltersOpen ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                    {categories.length > 0 && onSelectCategory && (
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 flex items-center justify-start md:justify-center gap-2 overflow-x-auto scrollbar-hide touch-pan-x border border-white/30">
                        <button 
                        onClick={() => onSelectCategory(null)}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-300 flex items-center gap-1 border ${
                            selectedCategory === null 
                            ? 'bg-primary-fuchsia text-white border-transparent shadow-md' 
                            : 'bg-white/70 text-gray-600 border-transparent hover:bg-white'
                        }`}
                        >
                        <span className="text-xs">🌟</span> Todos
                        </button>
                        
                        {categories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => onSelectCategory(cat === selectedCategory ? null : cat)}
                            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-semibold transition-all duration-300 flex items-center gap-1 border ${
                            selectedCategory === cat 
                            ? 'bg-primary-fuchsia text-white border-transparent shadow-md' 
                            : 'bg-white/70 text-gray-600 border-transparent hover:bg-white'
                            }`}
                        >
                            <span className="text-xs">{getCategoryIcon(cat)}</span>
                            {cat}
                        </button>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        </div>

        {/* Menú Móvil (Overlay) */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/90 backdrop-blur-xl border-b border-gray-100 ${
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col px-4 py-4 gap-2">
             {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-left px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-primary-fuchsia/10 hover:text-primary-fuchsia transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-3px) scale(1.05); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default Header;
