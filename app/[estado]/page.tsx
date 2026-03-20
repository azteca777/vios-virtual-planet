"use client"; // Obligatorio para Client Components e interacción

import { useState, use } from 'react';
import Image from 'next/image';

interface EstadoPageProps {
  params: Promise<{
    estado: string;
  }>;
}

// Definimos los puntos de interés con coordenadas aproximadas basadas en image_1.png y image_3.png
// (estimaciones en porcentajes, puede requerir ajuste fino manual)
const puntosDeInteresQuintanaRoo = [
  { id: 'isla_mujeres', name: 'ISLA MUJERES', top: '16%', left: '85%', size: 'medium' },
  { id: 'cancun_party', name: 'CANCÚN / PARTY CENTER', top: '32%', left: '60%', size: 'medium' },
  { id: 'cozumel_cielito', name: 'COZUMEL / EL CIELITO', top: '39%', left: '88%', size: 'medium' },
  { id: 'playa_del_carmen', name: 'PLAYA DEL CARMEN / QUINTA AVENIDA', top: '50%', left: '48%', size: 'large' },
  { id: 'tulum_castillo', name: 'TULUM / ZAMNA', top: '77%', left: '65%', size: 'medium' },
  { id: 'bacalar_laguna', name: 'BACALAR / LAGUNA DE LOS SIETE COLORES', top: '70%', left: '26%', size: 'medium' },
  { id: 'cenotes', name: 'CENOTES', top: '95%', left: '69%', size: 'small' },
  { id: 'arrecifes', name: 'ARRECIFES', top: '95%', left: '84%', size: 'small' },
];

export default function EstadoLandingPage({ params }: EstadoPageProps) {
  // Estado para el punto que está siendo hovered (para el glow temporal)
  const [pointHovered, setPointHovered] = useState<string | null>(null);
  // Estado para el punto seleccionado (para la demo)
  const [pointSelected, setPointSelected] = useState<string | null>(null);

  // Aunque ya no mostramos el título, mantenemos esta lógica para accesibilidad (el 'alt' de la imagen)
  const formatStateName = (slug: string) => {
    if (!slug) return '';
    const cleanSlug = decodeURIComponent(slug); 
    return cleanSlug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Desempaquetamos los parámetros usando el hook 'use' de React
  const resolvedParams = use(params);
  const estado = resolvedParams.estado;

  // Ahora 'estado' es un string normal y a TypeScript le encantará
  const nombreEstado = formatStateName(estado); 
  const esQuintanaRoo = estado.toLowerCase() === 'quintana-roo';

  const handlePointSelect = (id: string, name: string) => {
    setPointSelected(id);
    alert(`¡Seleccionaste ${name}! Cargando entorno...`);
    // Aquí es donde integrarías la lógica real para cargar el entorno 3D
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-6 text-center">
      <div className="flex flex-col items-center space-y-12 w-full max-w-7xl relative">
        
        {/* Título T2 (Moderado) */}
        <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-yellow-200 via-yellow-500 to-yellow-700 drop-shadow-[0_3px_3px_rgba(0,0,0,0.8)] px-4">
          QUINTANA ROO
        </h1>

        {/* --- MAPA INTERACTIVO --- */}
        {/* Contenedor relativo para posicionar los botones sobre la imagen */}
        <div className="w-full max-w-2xl aspect-[1/1.05] relative p-2 bg-black/30 border border-neutral-800 rounded-2xl shadow-[0_0_60px_-15px_rgba(234,179,8,0.3)] overflow-hidden">
          
          <Image 
            src="/mapa_quintana_roo.jpeg" 
            alt="Mapa interactivo de Quintana Roo, México, con sus principales ciudades y puntos de interés seleccionables." 
            fill
            className="rounded-xl object-cover w-full h-auto z-0"
            priority 
          />

          {/* Superposición de botones interactivos */}
          <div className="absolute inset-0 z-10 w-full h-full">
            {puntosDeInteresQuintanaRoo.map((point) => {
              const isHovered = pointHovered === point.id;
              const isSelected = pointSelected === point.id;
              const sizeClass = point.size === 'small' ? 'w-[70px] h-[30px]' : point.size === 'medium' ? 'w-[110px] h-[40px]' : 'w-[150px] h-[50px]';

              return (
                <button
                  key={point.id}
                  type="button"
                  onMouseEnter={() => setPointHovered(point.id)}
                  onMouseLeave={() => setPointHovered(null)}
                  onClick={() => handlePointSelect(point.id, point.name)}
                  // 1. Manita (cursor-pointer)
                  // 2. Efecto de Glow/Highlight (box-shadow cyan) al hover o seleccionado
                  // 3. Posicionamiento absoluto
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
                    width: point.size === 'small' ? '80px' : point.size === 'medium' ? '120px' : '160px', // Ajusta el ancho del hotspot
                    height: '40px', // Ajusta el alto del hotspot
                  }}
                  aria-label={`Seleccionar ${point.name}`}
                />
              );
            })}
          </div>
        </div>
        {/* --- FIN MAPA INTERACTIVO --- */}

        {/* Letrero Neón de Carga */}
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