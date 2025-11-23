
import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="w-full py-16 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-pacifico text-primary-fuchsia drop-shadow-sm">
            Nuestra Esencia
          </h2>
          <div className="w-24 h-1 bg-primary-fuchsia mx-auto mt-4 rounded-full opacity-70"></div>
        </div>

        {/* Contenedor Principal Glassmorphism Satinado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Tarjeta: Quiénes Somos (Grande) */}
          <div className="lg:col-span-2 backdrop-blur-xl bg-gradient-to-br from-white/60 via-white/40 to-white/20 border border-white/50 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-3xl p-8 md:p-12 hover:shadow-[0_8px_32px_0_rgba(233,18,99,0.15)] transition-all duration-500 relative overflow-hidden group">
            {/* Brillo Satinado Decorativo */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-fuchsia/10 rounded-full blur-3xl group-hover:bg-primary-fuchsia/20 transition-colors"></div>
            
            <h3 className="text-3xl font-bold text-text-dark mb-6 flex items-center gap-3">
              <span className="text-4xl">💝</span> ¿Quiénes Somos?
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed font-poppins text-justify">
              En <strong>Detalles Cariñitos</strong>, somos más que una tienda de regalos; somos creadores de emociones. Con más de <strong>10 años de experiencia</strong> en el mercado, nos hemos dedicado a transformar sentimientos en detalles tangibles. Ubicados en el corazón de Dosquebradas, nos especializamos en la elaboración, venta y personalización de sorpresas para toda ocasión. Desde desayunos que alegran mañanas hasta anchetas que celebran la vida, nuestro arte consiste en mantenernos siempre a la vanguardia de las tendencias para ofrecer regalos únicos que realmente impacten el corazón de quien los recibe.
            </p>
          </div>

          {/* Tarjeta: Misión */}
          <div className="backdrop-blur-lg bg-white/30 border border-white/40 shadow-lg rounded-3xl p-8 flex flex-col items-center text-center hover:bg-white/40 transition-colors duration-300">
            <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center text-3xl shadow-sm mb-4 text-primary-fuchsia">
              🚀
            </div>
            <h3 className="text-2xl font-bold text-text-dark mb-4">Misión</h3>
            <p className="text-gray-700 leading-relaxed">
              Brindar experiencias inolvidables a través de regalos innovadores y personalizados de alta calidad. Nos esforzamos por ser el cómplice perfecto en cada celebración, entregando amor y felicidad en cada paquete, garantizando siempre la satisfacción total de nuestros clientes a través de un servicio cálido y oportuno.
            </p>
          </div>

          {/* Tarjeta: Visión */}
          <div className="backdrop-blur-lg bg-white/30 border border-white/40 shadow-lg rounded-3xl p-8 flex flex-col items-center text-center hover:bg-white/40 transition-colors duration-300">
             <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center text-3xl shadow-sm mb-4 text-primary-fuchsia">
              🌟
            </div>
            <h3 className="text-2xl font-bold text-text-dark mb-4">Visión</h3>
            <p className="text-gray-700 leading-relaxed">
              Consolidarnos como la tienda de regalos y detalles sorpresa líder en el Eje Cafetero y expandir nuestra plataforma digital para conectar corazones en todo el país. Aspiramos a ser reconocidos por nuestra creatividad inagotable, nuestra excelencia operativa 24/7 y por ser pioneros en la personalización de experiencias.
            </p>
          </div>
        </div>

        {/* Sección de Fundamentos y Valores */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Fundamentos */}
            <div className="md:col-span-3 backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl p-8 shadow-md">
                <h3 className="text-2xl font-bold text-primary-fuchsia mb-6 text-center font-pacifico">Nuestros Pilares</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Valor 1 */}
                    <div className="bg-white/60 rounded-xl p-4 text-center shadow-sm hover:scale-105 transition-transform">
                        <span className="block text-3xl mb-2">💖</span>
                        <h4 className="font-bold text-text-dark">Amor</h4>
                        <p className="text-xs text-gray-600 mt-1">El ingrediente secreto en cada detalle.</p>
                    </div>
                    {/* Valor 2 */}
                    <div className="bg-white/60 rounded-xl p-4 text-center shadow-sm hover:scale-105 transition-transform">
                        <span className="block text-3xl mb-2">🎨</span>
                        <h4 className="font-bold text-text-dark">Creatividad</h4>
                        <p className="text-xs text-gray-600 mt-1">Diseños únicos que no verás en otro lugar.</p>
                    </div>
                    {/* Valor 3 */}
                    <div className="bg-white/60 rounded-xl p-4 text-center shadow-sm hover:scale-105 transition-transform">
                        <span className="block text-3xl mb-2">⭐</span>
                        <h4 className="font-bold text-text-dark">Calidad</h4>
                        <p className="text-xs text-gray-600 mt-1">Productos premium y acabados perfectos.</p>
                    </div>
                    {/* Valor 4 */}
                    <div className="bg-white/60 rounded-xl p-4 text-center shadow-sm hover:scale-105 transition-transform">
                        <span className="block text-3xl mb-2">⏰</span>
                        <h4 className="font-bold text-text-dark">Compromiso</h4>
                        <p className="text-xs text-gray-600 mt-1">Puntualidad y seriedad en cada entrega.</p>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
