
import React, { useState } from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 pt-20 pb-10 text-gray-700 font-poppins border-t border-white/60">
       {/* Capa Base "Opalizada" (Igual al Header para consistencia) */}
       <div className="absolute inset-0 backdrop-blur-2xl bg-gradient-to-t from-white/95 via-pink-50/90 to-blue-50/40 z-0"></div>
        
        {/* Textura Granulada */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
          }}
        ></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Columna 1: Marca y Reputación */}
          <div className="flex flex-col items-center lg:items-start gap-6">
             <div className="flex items-center gap-3">
                <img
                    src="https://lh3.googleusercontent.com/pw/AP1GczPbUPUobrMysGfkmLPDtGDgad4hohhOVrgNUSSVwzQaTBnzPCaxiQDQkCrLMizoxEI1uP8XyBGXjep7zIHNGSobThdhGJpd49wxSdxkWfiS9lOU-vyqpuBFEMhOjKfEF6cW3k157Kx8DyuYO4GmdVs=w717-h717-s-no-gm?authuser=0"
                    alt="Detalles Cariñitos Logo"
                    className="h-20 w-20 object-contain drop-shadow-lg"
                />
                <div>
                    <h3 className="font-poppins font-semibold text-2xl text-primary-fuchsia">Detalles Cariñitos</h3>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Gift Shop</p>
                </div>
             </div>

            <p className="text-sm text-gray-600 text-center lg:text-left leading-relaxed max-w-sm">
              Transformamos sentimientos en regalos únicos. Más de 10 años creando sonrisas con desayunos sorpresa, anchetas y detalles personalizados.
            </p>
            
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <a 
                href="https://g.page/r/CR-XisTcMIhEEBI/review" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/80 border border-white hover:border-yellow-300 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all group flex items-center justify-between"
                >
                <div className="flex flex-col items-start">
                    <span className="text-xs font-bold text-gray-500 uppercase">Danos tu opinión</span>
                    <div className="flex text-yellow-400 text-sm">★★★★★</div>
                </div>
                <span className="text-yellow-600 font-bold text-sm group-hover:translate-x-1 transition-transform">Calificar →</span>
                </a>

                <a 
                href="https://share.google/is8YxfwDLSYu4ENGw" 
                target="_blank" 
                rel="noreferrer"
                className="bg-blue-50/80 border border-white hover:border-blue-300 px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-all group flex items-center justify-between"
                >
                 <div className="flex items-center gap-2">
                    <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z" /></svg>
                    <div className="flex flex-col items-start">
                        <span className="text-xs font-bold text-gray-500 uppercase">Ver Ficha Técnica</span>
                        <span className="text-sm font-bold text-gray-700">Google My Business</span>
                    </div>
                 </div>
                 <span className="text-blue-500 font-bold text-xl group-hover:translate-x-1 transition-transform">›</span>
                </a>
            </div>
          </div>

          {/* Columna 2: Información Rápida */}
          <div className="flex flex-col gap-6 justify-center">
            <h3 className="text-xl font-bold text-primary-fuchsia border-b-2 border-pink-200 pb-2 inline-block w-max">Contacto Directo</h3>
            
            <ul className="space-y-4">
                <li className="flex items-center gap-3 bg-white/50 p-3 rounded-lg hover:bg-white transition-colors">
                    <div className="bg-green-100 p-2 rounded-full text-green-600">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.514-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.084 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                    </div>
                    <a href="https://wa.me/573229297190" target="_blank" rel="noreferrer" className="font-semibold hover:text-primary-fuchsia transition-colors">
                        +57 322 929 7190
                    </a>
                </li>
                <li className="flex items-start gap-3 bg-white/50 p-3 rounded-lg hover:bg-white transition-colors">
                    <div className="bg-red-100 p-2 rounded-full text-red-500 flex-shrink-0">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <span className="text-sm">
                        <strong>Punto Físico:</strong><br/>
                        Calle 34 #11-02, Barrio Guadalupe<br/>
                        Dosquebradas, Risaralda
                    </span>
                </li>
                 <li className="flex items-center gap-3 bg-white/50 p-3 rounded-lg hover:bg-white transition-colors">
                    <div className="bg-blue-100 p-2 rounded-full text-blue-500">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <span className="text-sm font-medium">Atención 24 Horas / 7 Días</span>
                </li>
            </ul>

            <div className="mt-2">
                 <h4 className="font-bold text-sm text-gray-500 uppercase mb-2">Cobertura Domicilios:</h4>
                 <div className="flex flex-wrap gap-2">
                    {['Dosquebradas', 'Pereira', 'Cuba', 'Santa Rosa'].map(zone => (
                        <span key={zone} className="px-3 py-1 bg-white/60 rounded-full text-xs font-medium border border-gray-100 shadow-sm">
                            {zone}
                        </span>
                    ))}
                 </div>
            </div>
          </div>

          {/* Columna 3: Mapa GPS */}
          <div className="flex flex-col gap-4">
             <h3 className="text-xl font-bold text-primary-fuchsia border-b-2 border-pink-200 pb-2 inline-block w-max">Nuestra Ubicación</h3>
             <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-gray-200 relative group">
                {/* Embed de Google Maps usando la dirección y el CID proporcionado */}
                <iframe 
                    src="https://maps.google.com/maps?q=Detalles+Cari%C3%B1itos+Dosquebradas&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    title="Mapa Detalles Cariñitos"
                    className="group-hover:scale-105 transition-transform duration-700"
                ></iframe>
                <a 
                    href="https://www.google.com/maps/place/Detalles+Cari%C3%B1itos/data=!4m2!3m1!1s0x0:0x448830dcc48a971f?sa=X&ved=1t:2428&hl=es-419&ictx=111"
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-primary-fuchsia px-4 py-2 rounded-full font-bold shadow-md text-xs hover:bg-primary-fuchsia hover:text-white transition-colors z-10 whitespace-nowrap flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                    Abrir GPS
                </a>
             </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-gray-300/50 mt-10 pt-6 text-center">
          <p className="font-semibold text-gray-600">&copy; {currentYear} Detalles Cariñitos.</p>
          <p className="text-xs text-gray-500 mt-1">Todos los derechos reservados. Hecho con ♥ en Dosquebradas.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
