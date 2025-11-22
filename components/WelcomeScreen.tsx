import React, { useEffect, useState } from 'react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Start fade out quickly to avoid blocking
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    // Completely unmount
    const completeTimer = setTimeout(() => {
      setShouldRender(false);
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
      onComplete();
    }, 500); // Wait for fade out
  };

  if (!shouldRender) return null;

  return (
    <div 
      onClick={handleDismiss}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background-cream transition-opacity duration-500 ease-in-out cursor-pointer ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-label="Pantalla de bienvenida"
    >
      <div className={`transform transition-all duration-1000 ${isVisible ? 'scale-100 translate-y-0' : 'scale-90 translate-y-4'}`}>
        <img
          src="https://lh3.googleusercontent.com/pw/AP1GczPbUPUobrMysGfkmLPDtGDgad4hohhOVrgNUSSVwzQaTBnzPCaxiQDQkCrLMizoxEI1uP8XyBGXjep7zIHNGSobThdhGJpd49wxSdxkWfiS9lOU-vyqpuBFEMhOjKfEF6cW3k157Kx8DyuYO4GmdVs=w717-h717-s-no-gm?authuser=0"
          alt="Detalles Cariñitos Logo"
          className="w-48 h-48 md:w-72 md:h-72 object-contain drop-shadow-xl mb-6 animate-pulse"
        />
      </div>
      
      <div className="text-center px-4">
        <h1 className="text-4xl md:text-6xl font-pacifico text-primary-fuchsia mb-2">
          ¡Bienvenido!
        </h1>
        <p className="text-xl text-gray-600 font-poppins mb-8">
          Regalos con amor para ti...
        </p>
        <p className="text-sm text-gray-400 animate-bounce">
          (Toca para entrar)
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;