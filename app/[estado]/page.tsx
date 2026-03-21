"use client"; // Obligatorio para Client Components e interacción

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // 👈 Importamos Link para la navegación

interface EstadoPageProps {
  params: Promise<{
    estado: string;
  }>;
}

// Respetamos tus coordenadas exactas y solo agregamos la propiedad 'slug' al final de cada uno
const puntosDeInteresQuintanaRoo = [
  { id: 'isla_mujeres', name: 'ISLA MUJERES', top: '16%', left: '85%', size: 'medium', slug: 'isla-mujeres' },
  { id: 'cancun_party', name: 'CANCÚN / PARTY CENTER', top: '32%', left: '60%', size: 'medium', slug: 'cancun' },
  { id: 'cozumel_cielito', name: 'COZUMEL / EL CIELITO', top: '39%', left: '88%', size: 'medium', slug: 'cozumel' },
  { id: 'playa_del_carmen', name: 'PLAYA DEL CARMEN / QUINTA AVENIDA', top: '50%', left: '48%', size: 'large', slug: 'playa-del-carmen' },
  { id: 'tulum_castillo', name: 'TULUM / ZAMNA', top: '77%', left: '65%', size: 'medium', slug: 'tulum' },
  { id: 'bacalar_laguna', name: 'BACALAR / LAGUNA DE LOS SIETE COLORES', top: '70%', left: '26%', size: 'medium', slug: 'bacalar' },
  { id: 'cenotes', name: 'CENOTES', top: '95%', left: '69%', size: 'small', slug: 'cenotes' },
  { id: 'arrecifes', name: 'ARRECIFES', top: '95%', left: '84%', size: 'small', slug: 'arrecifes' },
];

export default function EstadoLandingPage({ params }: EstadoPageProps) {
  const [pointHovered, setPointHovered] = useState<string | null>(null);
  const [pointSelected, setPointSelected] = useState<string | null>(null);

  const formatStateName = (slug: string) => {
    if (!slug) return '';
    const cleanSlug = decodeURIComponent(slug); 
    return cleanSlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const resolvedParams = use(params);
  const estado = resolvedParams.estado;

  const nombreEstado = formatStateName(estado); 
  const esQuintanaRoo = estado.toLowerCase() === 'quintana-roo';

  // LÓGICA DE REDIRECCIÓN A VIRTUAL METRA
  const handlePointSelect = (id: string, name: string, slug: string) => {
    setPointSelected(id);
    
    // Construimos la URL usando el estado actual y el slug de la ciudad seleccionada
    const urlDestino = `https://www.viosvirtualmetra.com/${estado}/${slug}`;
    
    // Redirigimos al usuario a la nueva dimensión
    window.location.href = urlDestino;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-6 text-center relative">
      
      {/* 👇 NUEVO BOTÓN DE REGRESO 👇 */}
      <Link 
        href="https://viosvirtualplanet.com"
        className="absolute top-6 left-6 md:top-8 md:left-8 px-5 py-2.5 bg-black/40 text-white/90 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-all duration-300 border border-white/20 backdrop-blur-md cursor-pointer z-50 flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
      >
        <span className="text-lg leading-none">⬅</span> Explorar Marcas Asociadas
      </Link>
      
      <div className="flex flex-col items-center space-y-12 w-full max-w-7xl relative mt-16 md:mt-0">
        
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] px-4">
          QUINTANA ROO
        </h1>

        <div className="w-full max-w-2xl aspect-[1/1.05] relative p-2 bg-black/30 border border-neutral-800 rounded-2xl shadow-[0_0_60px_-15px_rgba(234,179,8,0.3)] overflow-hidden">
          
          <Image 
            src="/mapa_quintana_roo.jpeg" 
            alt="Mapa interactivo de Quintana Roo, México, con sus principales ciudades y puntos de interés seleccionables." 
            fill
            className="rounded-xl object-cover w-full h-auto z-0"
            priority 
          />

          <div className="absolute inset-0 z-10 w-full h-full">
            {puntosDeInteresQuintanaRoo.map((point) => {
              const isHovered = pointHovered === point.id;
              const isSelected = pointSelected === point.id;

              return (
                <button
                  key={point.id}
                  type="button"
                  onMouseEnter={() => setPointHovered(point.id)}
                  onMouseLeave={() => setPointHovered(null)}
                  onClick={() => handlePointSelect(point.id, point.name, point.slug)}
                  className={`absolute flex items-center justify-center -translate-x-1/2 -translate-y-1/2 
                              border-transparent rounded-full
                              cursor-pointer transition-all duration-300 ease-in-out
                              ${isHovered || isSelected 
                                ? 'shadow-[0_0_15px_10px_rgba(34,211,238,0.5)] border-cyan-400 bg-cyan-400/10' 
                                : 'bg-transparent'
                              }
                            `}
                  style={{
                    top: point.top,
                    left: point.left,
                    width: point.size === 'small' ? '80px' : point.size === 'medium' ? '120px' : '160px',
                    height: '40px',
                  }}
                  aria-label={`Seleccionar ${point.name}`}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-cyan-400 animate-ping"></div>
          <h2 className="text-xl md:text-2xl font-mono text-cyan-400 tracking-widest animate-pulse drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            INICIANDO ENTORNO VIRTUAL...
          </h2>
        </div>
        
      </div>
    </main>
  );
}