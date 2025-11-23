
import React from 'react';

const REVIEWS = [
  { name: "Andrea M.", text: "¡El desayuno llegó calientito y a tiempo! 🥐", stars: 5 },
  { name: "Carlos R.", text: "La ancheta le encantó a mi esposa. Gracias. 🍷", stars: 5 },
  { name: "Valentina S.", text: "Detalles hermosos y excelente atención. ⭐", stars: 5 },
  { name: "Juan David", text: "El peluche gigante es espectacular. 🧸", stars: 5 },
  { name: "Luisa F.", text: "Recomendados 100%, muy puntuales. ⏰", stars: 5 },
  { name: "Camila T.", text: "Todo tal cual las fotos, muy lindo. 💖", stars: 5 },
  { name: "Felipe G.", text: "Me salvaron el aniversario a última hora. 🙏", stars: 5 },
  { name: "Maria Jose", text: "El empaque es divino, muy pulidos. 🎁", stars: 5 },
];

const AboutSection: React.FC = () => {
  // Duplicar reseñas para efecto infinito
  const infiniteReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <section className="w-full py-8 md:py-12 px-4 relative z-10 font-poppins">
      <div className="max-w-5xl mx-auto"> {/* Contenedor más estrecho */}
        
        {/* Título de la sección (Más pequeño) */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-pacifico text-primary-fuchsia drop-shadow-sm">
            Nuestra Esencia
          </h2>
          <div className="w-16 h-1 bg-primary-fuchsia mx-auto mt-2 rounded-full opacity-60"></div>
        </div>

        {/* Contenedor Principal Glassmorphism Satinado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          
          {/* Tarjeta: Quiénes Somos (Compacta) */}
          <div className="md:col-span-2 backdrop-blur-xl bg-gradient-to-br from-white/70 via-white/50 to-white/30 border border-white/60 shadow-sm rounded-2xl p-6 md:p-8 relative overflow-hidden group">
            <h3 className="text-xl font-bold text-text-dark mb-3 flex items-center gap-2">
              <span className="text-2xl">💝</span> ¿Quiénes Somos?
            </h3>
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed text-justify">
              En <strong>Detalles Cariñitos</strong>, transformamos sentimientos en regalos. Con más de <strong>10 años de experiencia</strong> en Dosquebradas, creamos desayunos sorpresa, anchetas y detalles personalizados. Nos mantenemos a la vanguardia para ofrecer regalos únicos que impacten el corazón.
            </p>
          </div>

          {/* Tarjeta: Misión (Compacta) */}
          <div className="backdrop-blur-lg bg-white/40 border border-white/50 shadow-sm rounded-2xl p-5 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-lg shadow-sm mb-2 text-primary-fuchsia">
              🚀
            </div>
            <h3 className="text-lg font-bold text-text-dark mb-2">Misión</h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              Brindar experiencias inolvidables con regalos innovadores, entregando amor y felicidad en cada paquete con un servicio cálido y oportuno.
            </p>
          </div>

          {/* Tarjeta: Visión (Compacta) */}
          <div className="backdrop-blur-lg bg-white/40 border border-white/50 shadow-sm rounded-2xl p-5 flex flex-col items-center text-center">
             <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center text-lg shadow-sm mb-2 text-primary-fuchsia">
              🌟
            </div>
            <h3 className="text-lg font-bold text-text-dark mb-2">Visión</h3>
            <p className="text-gray-600 text-xs leading-relaxed">
              Ser la tienda de regalos líder en el Eje Cafetero, reconocidos por nuestra creatividad, excelencia 24/7 y por conectar corazones en todo el país.
            </p>
          </div>
        </div>

        {/* Sección de Fundamentos y Valores (Compacta) */}
        <div className="mt-6">
            <div className="backdrop-blur-md bg-white/30 border border-white/40 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-primary-fuchsia mb-4 text-center font-pacifico">Nuestros Pilares</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {/* Valor 1 */}
                    <div className="bg-white/60 rounded-xl p-3 text-center shadow-sm hover:scale-105 transition-transform">
                        <span className="block text-xl mb-1">💖</span>
                        <h4 className="font-bold text-sm text-text-dark">Amor</h4>
                        <p className="text-[10px] text-gray-500 leading-tight">Ingrediente secreto.</p>
                    </div>
                    {/* Valor 2 */}
                    <div className="bg-white/60 rounded-xl p-3 text-center shadow-sm hover:scale-105 transition-transform">
                        <span className="block text-xl mb-1">🎨</span>
                        <h4 className="font-bold text-sm text-text-dark">Creatividad</h4>
                        <p className="text-[10px] text-gray-500 leading-tight">Diseños únicos.</p>
                    </div>
                    {/* Valor 3 */}
                    <div className="bg-white/60 rounded-xl p-3 text-center shadow-sm hover:scale-105 transition-transform">
                        <span className="block text-xl mb-1">⭐</span>
                        <h4 className="font-bold text-sm text-text-dark">Calidad</h4>
                        <p className="text-[10px] text-gray-500 leading-tight">Acabados perfectos.</p>
                    </div>
                    {/* Valor 4 */}
                    <div className="bg-white/60 rounded-xl p-3 text-center shadow-sm hover:scale-105 transition-transform">
                        <span className="block text-xl mb-1">⏰</span>
                        <h4 className="font-bold text-sm text-text-dark">Compromiso</h4>
                        <p className="text-[10px] text-gray-500 leading-tight">Seriedad y puntualidad.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* CARRUSEL DE RESEÑAS (NUEVO) */}
        <div className="mt-12 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-8 md:w-20 h-full bg-gradient-to-r from-background-cream to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-8 md:w-20 h-full bg-gradient-to-l from-background-cream to-transparent z-10 pointer-events-none"></div>
            
            <h4 className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Lo que dicen nuestros clientes</h4>

            <div className="flex w-max animate-marquee">
                {infiniteReviews.map((review, idx) => (
                    <div key={idx} className="w-52 md:w-64 flex-shrink-0 mx-2 md:mx-4 bg-white p-4 rounded-xl shadow-sm border border-pink-100 flex flex-col gap-2">
                        <div className="flex text-yellow-400 text-xs">
                            {'★'.repeat(review.stars)}
                        </div>
                        <p className="text-xs text-gray-600 italic">"{review.text}"</p>
                        <p className="text-[10px] font-bold text-primary-fuchsia text-right">- {review.name}</p>
                    </div>
                ))}
            </div>
        </div>

      </div>
      <style>{`
        .animate-marquee {
            animation: marquee 40s linear infinite;
        }
        @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
