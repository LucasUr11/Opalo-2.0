import { useState } from 'react';

export default function RamoFloresAmarillas() {
  const [key, setKey] = useState(0); // Clave para reiniciar la animación si se desea

  const reiniciarAnimacion = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 via-yellow-50 to-amber-100 flex flex-col items-center justify-center p-6 overflow-hidden relative">
      
      {/* Pétalos de fondo flotantes decorativos */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-4 h-4 bg-yellow-300 rounded-full opacity-60 animate-bounce duration-1000"></div>
        <div className="absolute top-20 right-1/4 w-3 h-3 bg-amber-300 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute bottom-1/3 left-10 w-5 h-5 bg-yellow-400 rounded-full opacity-40 animate-ping"></div>
      </div>

      {/* Contenedor principal de la tarjeta */}
      <div className="max-w-md w-full bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-amber-200 z-10 mt-10">
        
        <h1 className="text-2xl md:text-3xl font-bold text-amber-800 text-center mb-2 font-serif">
          Feliz Día De La Primavera 🌻
        </h1>
        <p className="text-amber-700/80 text-center text-sm mb-6">
          Hace florecer el ramo cada vez que quieras.
        </p>

        {/* Contenedor del Ramo SVG con animación controlada por key */}
        <div key={key} className="w-64 h-72 flex items-center justify-center relative my-4">
          <svg
            viewBox="0 0 300 350"
            className="w-full h-full drop-shadow-lg overflow-visible"
          >
            <defs>
              {/* Estilos CSS internos para las animaciones coordinadas */}
              <style>{`
                @keyframes dibujarTallo {
                  0% { stroke-dashoffset: 250; }
                  100% { stroke-dashoffset: 0; }
                }
                @keyframes florecer {
                  0% { transform: scale(0); opacity: 0; }
                  70% { transform: scale(1.1); opacity: 1; }
                  100% { transform: scale(1); opacity: 1; }
                }
                @keyframes aparecerHoja {
                  0% { transform: scale(0) rotate(-20deg); opacity: 0; }
                  100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }

                .tallo {
                  stroke-dasharray: 250;
                  stroke-dashoffset: 250;
                  animation: dibujarTallo 1.5s ease-out forwards;
                }
                .hoja-1 {
                  transform-origin: 120px 220px;
                  animation: aparecerHoja 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.8s forwards;
                  opacity: 0;
                }
                .hoja-2 {
                  transform-origin: 180px 200px;
                  animation: aparecerHoja 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1s forwards;
                  opacity: 0;
                }
                .flor-izq {
                  transform-origin: 80px 90px;
                  animation: florecer 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.2s forwards;
                  opacity: 0;
                }
                .flor-der {
                  transform-origin: 220px 90px;
                  animation: florecer 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.4s forwards;
                  opacity: 0;
                }
                .flor-cen {
                  transform-origin: 150px 60px;
                  animation: florecer 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1.6s forwards;
                  opacity: 0;
                }
              `}</style>
            </defs>

            {/* --- TALLOS Y HOJAS --- */}
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* Tallo Central */}
              <path d="M150 320 Q150 180 150 60" stroke="#4ade80" strokeWidth="6" className="tallo" style={{ animationDelay: '0.1s' }} />
              {/* Tallo Izquierdo */}
              <path d="M145 320 Q110 200 80 90" stroke="#22c55e" strokeWidth="5" className="tallo" style={{ animationDelay: '0.3s' }} />
              {/* Tallo Derecho */}
              <path d="M155 320 Q190 200 220 90" stroke="#22c55e" strokeWidth="5" className="tallo" style={{ animationDelay: '0.5s' }} />
            </g>

            {/* Hojas */}
            <path d="M120 220 C100 210 90 230 110 245 C130 240 130 225 120 220 Z" fill="#4ade80" className="hoja-1" />
            <path d="M180 200 C200 190 210 210 190 225 C170 220 170 205 180 200 Z" fill="#22c55e" className="hoja-2" />

            {/* Lazo / Listón del ramo */}
            <path d="M 130 290 Q 150 310 170 290 Q 160 330 150 335 Q 140 330 130 290 Z" fill="#f43f5e" />

            {/* --- FLORES AMARILLAS (Girasoles / Margaritas estilizadas) --- */}
            
            {/* Flor Izquierda */}
            <g className="flor-izq">
              <circle cx="80" cy="90" r="24" fill="#facc15" />
              <circle cx="80" cy="90" r="20" fill="#eab308" />
              <circle cx="80" cy="90" r="10" fill="#78350f" />
            </g>

            {/* Flor Derecha */}
            <g className="flor-der">
              <circle cx="220" cy="90" r="24" fill="#facc15" />
              <circle cx="220" cy="90" r="20" fill="#eab308" />
              <circle cx="220" cy="90" r="10" fill="#78350f" />
            </g>

            {/* Flor Central (Más grande) */}
            <g className="flor-cen">
              <circle cx="150" cy="60" r="30" fill="#fde047" />
              <circle cx="150" cy="60" r="25" fill="#facc15" />
              <circle cx="150" cy="60" r="13" fill="#78350f" />
            </g>

          </svg>
        </div>

        {/* Botón para repetir la animación */}
        <button
          onClick={reiniciarAnimacion}
          className="mt-6 px-6 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-medium rounded-full shadow-lg transition-all duration-200 cursor-pointer"
        >
          Volver a florecer 🌻
        </button>

      </div>
    </div>
  );
}