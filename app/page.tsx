'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const estadosVirtuales = [
  { id: 'quintana-roo', name: 'QUINTANA ROO', image: '/mapa_quintana_roo.jpeg', disponible: true },
  { id: 'jalisco', name: 'JALISCO', image: '/mapa_quintana_roo.jpeg', disponible: false },
];

export default function ViosVirtualPlanetRoot() {
  const [idioma, setIdioma] = useState('es');
  
  // Inicializamos en 'true' para cargar el fondo claro directamente
  const [introTerminada, setIntroTerminada] = useState(true);

  const BotonIdioma = () => (
    <button 
      onClick={() => setIdioma(idioma === 'es' ? 'en' : 'es')} 
      className="flex items-center gap-2 px-6 py-2 border border-[#d4af37] rounded-full text-sm tracking-widest hover:bg-[#d4af37] hover:text-black transition-all bg-white shadow-[0_0_15px_rgba(212,175,55,0.2)] cursor-pointer text-black font-semibold z-10"
    >
      <span className="text-lg leading-none">{idioma === 'es' ? '🇬🇧' : '🇲🇽'}</span>
      <span className="font-bold">{idioma === 'es' ? 'ENG' : 'ESP'}</span>
    </button>
  );

  return (
    <div className={`min-h-screen ${!introTerminada ? 'bg-black' : 'bg-white'} font-inter selection:bg-[#e91e63] selection:text-white pb-20 antialiased transition-colors duration-1000`}>
      
      {/* 🌌 BARRA DE NAVEGACIÓN */}
      <nav className={`fixed top-0 w-full ${!introTerminada ? 'bg-black/90 border-gray-800' : 'bg-white/95 border-gray-200'} backdrop-blur-md border-b z-50 px-6 py-4 flex justify-between items-center shadow-sm transition-all duration-1000`}>
        <div className="flex items-center gap-3 relative z-10">
          {/* 👇 LOGOTIPO OFICIAL INTEGRADO COMO ENLACE 👇 */}
          <Link 
            href="https://vioscode.io" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Ir a ViOs Code"
            className="block transition-transform hover:scale-105"
          >
            <img 
              src="/logo_vios.jpeg" 
              alt="ViOs Code Logo" 
              className={`h-12 w-auto object-contain transition-all duration-1000 ${!introTerminada ? 'invert brightness-0' : ''}`}
            />
          </Link>
        </div>
        <BotonIdioma />
      </nav>

      {/* 👤 SECCIÓN 1: INTRO (Mundo Girando a la Izquierda + Texto a la Derecha) */}
      <section className="pt-36 px-6 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[40vh] md:min-h-[50vh] mb-24 relative">
        
        <div className="flex flex-col md:flex-row items-center md:items-center gap-12 lg:gap-20 w-full animate-[fadeIn_1s_ease-in-out]">
          
         {/* 🌍 EL MUNDO 3D INTERACTIVO (Izquierda) */}
          <div className="w-72 h-72 md:w-96 md:h-96 shrink-0 relative mx-auto md:mx-0 flex justify-center items-center drop-shadow-[0_10px_40px_rgba(212,175,55,0.2)]">
            <iframe 
              title="Earth 3D Model" 
              className="w-full h-full border-none"
              src="https://sketchfab.com/models/1cf4059411fc42ce9e29ecf2c499f384/embed?autostart=1&transparent=1&ui_infos=0&ui_watermark=0&ui_controls=0&autospin=0.2" 
              allow="autoplay; fullscreen; xr-spatial-tracking" 
            ></iframe>
          </div>
          
          {/* 📝 TEXTOS (Derecha, justificados a la izquierda) */}
          <div className="flex flex-col gap-4 text-left text-black w-full">
            <h2 className="font-montserrat text-4xl md:text-5xl lg:text-7xl font-black tracking-tight">
              {idioma === 'es' ? 'El Planeta Virtual' : 'The Virtual Planet'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">
                {idioma === 'es' ? 'de ViOs.' : 'of ViOs.'}
              </span>
            </h2>
            
            <p className="text-gray-700 text-lg lg:text-xl leading-relaxed max-w-2xl mt-4 font-normal text-left">
              {idioma === 'es' 
                ? 'ViOs Virtual Planet es el contenedor de ecosistemas inmersivos que unifica la gestión empresarial de alto nivel con tecnologías de vanguardia como realidad virtual y escaneo 3D. Explora entornos globales divididos por industrias y descubre la siguiente dimensión del comercio digital.'
                : 'ViOs Virtual Planet is the container for immersive ecosystems that unifies high-level business management with cutting-edge technologies like virtual reality and 3D scanning. Explore global environments divided by industries and discover the next dimension of digital commerce.'}
            </p>
          </div>
          
        </div>
            
      </section>

      {/* 📊 SECCIÓN 2: EL PLANETA (Estados Virtuales Interactivos) */}
      <section className="px-6 max-w-7xl mx-auto mb-32 flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-16">
          <h2 className={`font-montserrat text-3xl md:text-5xl font-black ${!introTerminada ? 'text-white' : 'text-black'} transition-colors duration-1000`}>
            {idioma === 'es' ? 'Estados Virtuales' : 'Virtual States'}
          </h2>
          <div className={`h-px ${!introTerminada ? 'bg-gradient-to-r from-gray-800 to-transparent' : 'bg-gradient-to-r from-gray-300 to-transparent'} flex-grow ml-8 transition-colors duration-1000`}></div>
        </div>

        {/* --- MAPA INTERACTIVO DE ESTADOS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
          {estadosVirtuales.map((estado) => (
            <div key={estado.id} className="relative group">
              {estado.disponible ? (
                <Link 
                  href={`/${estado.id}`} 
                  className="w-full aspect-[1.1/1] relative p-2 bg-black/30 border border-neutral-800 rounded-3xl overflow-hidden cursor-pointer block 
                              hover:border-[#d4af37] hover:shadow-[0_0_60px_-15px_rgba(212,175,55,0.4)] transition-all duration-300"
                  aria-label={idioma === 'es' ? `Entrar al mapa virtual de ${estado.name}` : `Enter the virtual map of ${estado.name}`}
                >
                  <Image 
                    src={estado.image} 
                    alt={`Mapa interactivo del estado de ${estado.name}, México.`} 
                    fill
                    className="rounded-2xl object-cover w-full h-full z-0 group-hover:scale-105 transition-all duration-500"
                    priority 
                  />

                  <div className="absolute inset-0 w-full h-full rounded-2xl bg-cyan-400/0 border-4 border-cyan-400 opacity-0 group-hover:opacity-100 group-hover:bg-cyan-400/10 group-hover:shadow-[0_0_60px_20px_rgba(34,211,238,0.6)] group-hover:animate-pulse transition-all duration-300" />
                  
                  <div className="absolute bottom-6 left-6 right-6 bg-black/70 backdrop-blur-md p-4 rounded-xl border border-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 text-center">
                    <h3 className="font-montserrat text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700 uppercase tracking-tight">
                      {estado.name}
                    </h3>
                    <p className="text-gray-300 text-xs font-mono tracking-wider mt-1">
                      {idioma === 'es' ? 'Haga clic para Entrar' : 'Click to Enter'}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="w-full aspect-[1.1/1] relative p-2 bg-neutral-900/50 border border-neutral-800 rounded-3xl overflow-hidden opacity-50">
                  <Image 
                    src={estado.image} 
                    alt={`Mapa interactivo del estado de ${estado.name}, México. No disponible.`} 
                    fill
                    className="rounded-2xl object-cover w-full h-full z-0"
                    priority 
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm p-6 rounded-2xl z-10 text-center">
                    <h3 className="font-montserrat text-3xl font-black text-gray-400 uppercase tracking-tight">
                      {estado.name}
                    </h3>
                    <p className="text-gray-200 text-sm font-bold mt-2">
                      {idioma === 'es' ? 'Próximamente...' : 'Coming Soon...'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* --- FIN MAPA INTERACTIVO DE ESTADOS --- */}

        <div className="mt-20 flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-cyan-400 animate-ping"></div>
          <h2 className="text-xl md:text-2xl font-mono text-cyan-400 tracking-widest animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            {idioma === 'es' ? 'NAVEGACIÓN DE PLANETA ACTIVA...' : 'PLANET NAVIGATION ACTIVE...'}
          </h2>
        </div>
      </section>

      {/* 🌌 SECCIÓN 3: LA ARQUITECTURA (6 elementos) */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`font-montserrat text-3xl md:text-5xl font-black mb-4 ${!introTerminada ? 'text-white' : 'text-black'} transition-colors duration-1000`}>
            {idioma === 'es' ? 'La Arquitectura del Multiverso' : 'The Multiverse Architecture'}
          </h2>
          <p className={`${!introTerminada ? 'text-gray-400' : 'text-gray-600'} text-lg max-w-2xl mx-auto transition-colors duration-1000`}>
            {idioma === 'es' ? 'ViOs Virtual Planet es el núcleo de un sistema escalable diseñado para conquistar el mercado digital paso a paso.' : 'ViOs Virtual Planet is the core of a scalable system designed to conquer the digital market step by step.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <Link 
            href="https://www.viosmetaverse.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white border border-gray-100 p-8 rounded-3xl hover:border-gray-200 hover:shadow-lg transition-all relative overflow-hidden group shadow-sm block cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full blur-3xl group-hover:bg-gray-200 transition-all"></div>
            <div className="text-5xl mb-6">🌐</div>
            <h3 className="font-montserrat text-2xl font-bold text-black mb-2">ViOs Metaverso</h3>
            <p className="text-gray-600 text-sm">
              {idioma === 'es' ? 'El portal principal. La interfaz de conexión interactiva que unifica nuestra tecnología, negocios y usuarios.' : 'The main portal. The interactive connection interface that unifies our technology, businesses, and users.'}
            </p>
          </Link>

          <div className="bg-white border border-gray-100 p-8 rounded-3xl hover:border-gray-200 hover:shadow-lg transition-all relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full blur-3xl group-hover:bg-gray-200 transition-all"></div>
            <div className="text-5xl mb-6">🌌</div>
            <h3 className="font-montserrat text-2xl font-bold text-black mb-2">Virtual Universe</h3>
            <p className="text-gray-600 text-sm">
              {idioma === 'es' ? 'La red maestra. El contenedor global que aloja todos nuestros ecosistemas y tecnologías.' : 'The master network. The global container that hosts all our ecosystems and technologies.'}
            </p>
          </div>

          <Link 
            href="/" 
            className="bg-white border border-[#d4af37]/30 p-8 rounded-3xl hover:border-[#d4af37] hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all relative overflow-hidden group shadow-sm block cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-3xl group-hover:bg-[#d4af37]/20 transition-all"></div>
            <div className="text-5xl mb-6">🪐</div>
            <h3 className="font-montserrat text-2xl font-bold text-[#d4af37] mb-2">Virtual Planet</h3>
            <p className="text-gray-700 text-sm">
              {idioma === 'es' ? 'Entornos globales divididos por industrias (Hospitalidad, Bienes Raíces, Retail). Este es su portal principal.' : 'Global environments divided by industries (Hospitality, Real Estate, Retail). This is its main portal.'}
            </p>
          </Link>

          <div className="bg-white border border-gray-100 p-8 rounded-3xl hover:border-gray-200 hover:shadow-lg transition-all relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full blur-3xl group-hover:bg-gray-200 transition-all"></div>
            <div className="text-5xl mb-6">🏙️</div>
            <h3 className="font-montserrat text-2xl font-bold text-black mb-2">Virtual Metra</h3>
            <p className="text-gray-600 text-sm">
              {idioma === 'es' ? 'Proyectos locales y específicos. El hogar de desarrollos inmersivos como Tianguis Tulum.' : 'Local and specific projects. The home of immersive developments like Tianguis Tulum.'}
            </p>
          </div>

          <div className="bg-white border border-gray-100 p-8 rounded-3xl hover:border-gray-200 hover:shadow-lg transition-all relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full blur-3xl group-hover:bg-gray-200 transition-all"></div>
            <div className="text-5xl mb-6">🤝</div>
            <h3 className="font-montserrat text-2xl font-bold text-black mb-2">Virtual Social</h3>
            <p className="text-gray-600 text-sm">
              {idioma === 'es' ? 'El núcleo de la comunidad. Plataformas interactivas diseñadas para conectar usuarios, avatares y marcas en tiempo real.' : 'The community core. Interactive platforms designed to connect users, avatars, and brands in real-time.'}
            </p>
          </div>

          <div className="bg-white border border-gray-100 p-8 rounded-3xl hover:border-gray-200 hover:shadow-lg transition-all relative overflow-hidden group shadow-sm">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full blur-3xl group-hover:bg-gray-200 transition-all"></div>
            <div className="text-5xl mb-6">🌍</div>
            <h3 className="font-montserrat text-2xl font-bold text-black mb-2">Virtual Nomad</h3>
            <p className="text-gray-600 text-sm">
              {idioma === 'es' ? 'El puente físico-digital. Soluciones para ciudadanos del mundo que trabajan, viajan y viven sin fronteras.' : 'The physical-digital bridge. Solutions for global citizens who work, travel, and live without borders.'}
            </p>
          </div>

        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}