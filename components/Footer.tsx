
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary-rose-light mt-16 py-12 border-t border-gray-200 text-gray-700 font-poppins">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
             <img
              src="https://lh3.googleusercontent.com/pw/AP1GczPbUPUobrMysGfkmLPDtGDgad4hohhOVrgNUSSVwzQaTBnzPCaxiQDQkCrLMizoxEI1uP8XyBGXjep7zIHNGSobThdhGJpd49wxSdxkWfiS9lOU-vyqpuBFEMhOjKfEF6cW3k157Kx8DyuYO4GmdVs=w717-h717-s-no-gm?authuser=0"
              alt="Detalles Cariñitos Logo"
              className="h-24"
            />
            <p className="text-sm max-w-xs">
              Somos una empresa dedicada a la elaboración, venta y personalización de regalos para toda ocasión con más de 10 años de experiencia.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-primary-fuchsia mb-2">Contacto</h3>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-semibold">WhatsApp:</span> 
              <a href="https://wa.me/573229297190" target="_blank" rel="noreferrer" className="hover:text-primary-fuchsia transition-colors">+57 322 929 7190</a>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-semibold">Dirección:</span>
              <span>Calle 34 #11-02, Barrio Guadalupe, Dosquebradas</span>
            </p>
            <p className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-semibold">Horario:</span>
              <span>Atención 24/7</span>
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-bold text-primary-fuchsia mb-2">Cobertura Domicilios</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Dosquebradas</li>
              <li>Pereira</li>
              <li>Cuba</li>
              <li>Santa Rosa</li>
              <li>Y alrededores</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-10 pt-6 text-center">
          <p>&copy; {currentYear} Detalles Cariñitos. Todos los derechos reservados.</p>
          <p className="text-sm mt-1">Hecho con ♥ para encontrar el regalo perfecto.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
