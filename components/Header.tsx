
import React from 'react';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="bg-secondary-rose-light shadow-md w-full sticky top-0 z-30">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src="https://lh3.googleusercontent.com/pw/AP1GczPbUPUobrMysGfkmLPDtGDgad4hohhOVrgNUSSVwzQaTBnzPCaxiQDQkCrLMizoxEI1uP8XyBGXjep7zIHNGSobThdhGJpd49wxSdxkWfiS9lOU-vyqpuBFEMhOjKfEF6cW3k157Kx8DyuYO4GmdVs=w717-h717-s-no-gm?authuser=0"
            alt="Detalles Cariñitos Logo"
            className="h-16 md:h-20"
          />
          <h1 className="text-4xl md:text-5xl font-pacifico text-text-dark cursor-pointer">
            Detalles Cariñitos
          </h1>
        </div>
        <button onClick={onCartClick} className="relative group p-2" aria-label={`Ver carrito de compras con ${cartItemCount} artículos`}>
          <svg className="h-9 w-9 text-primary-fuchsia group-hover:scale-110 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 block h-6 w-6 rounded-full bg-accent-lilac text-white text-sm flex items-center justify-center transform group-hover:scale-125 transition-transform">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
