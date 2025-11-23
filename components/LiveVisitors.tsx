
import React, { useState, useEffect } from 'react';

const LiveVisitors: React.FC = () => {
  // Inicializar con un número creíble (ej. entre 12 y 25)
  const [count, setCount] = useState(18);

  useEffect(() => {
    // Actualizar el contador cada 5-8 segundos para simular tráfico real
    const interval = setInterval(() => {
      setCount((prev) => {
        // Variación aleatoria entre -2 y +3
        const change = Math.floor(Math.random() * 6) - 2; 
        const newCount = prev + change;
        // Mantener límites lógicos (mínimo 8, máximo 45)
        if (newCount < 8) return 10;
        if (newCount > 45) return 40;
        return newCount;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-30 pointer-events-none select-none animate-fade-in">
      <div className="flex items-center gap-2 bg-white/40 backdrop-blur-md border border-white/50 shadow-lg rounded-full px-3 py-1.5 transition-all hover:bg-white/60">
        
        {/* Indicador Pulsante (Punto Verde) */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>

        {/* Texto */}
        <div className="flex items-baseline gap-1">
          <span className="text-xs font-bold text-gray-800 font-poppins tabular-nums">
            {count}
          </span>
          <span className="text-[9px] font-medium text-gray-600 uppercase tracking-tight">
            clientes viendo
          </span>
        </div>
      </div>
    </div>
  );
};

export default LiveVisitors;
