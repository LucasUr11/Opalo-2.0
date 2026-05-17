import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from 'lucide-react';
import { useRef } from "react";

export const Hero = () => {

    // Referencia para medir el progreso del scroll.-
    const containerRef = useRef<HTMLDivElement>(null);

    // useScroll nos da un valor de 0 a 1 según cuánto scroll hizo el usuario en esta sección.-
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Se intercepta el progreso de 0 a 1.-
    const filterBlur = useTransform(scrollYProgress, [0, 0.8], ["blur(0px)", "blur(20px)"]);

    // La opacidad empezará a caer progresivamente.-
    const globalOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

    // ----- TRANSFORMACIONES DE ANIMACIÓN SEGÚN EL SCROLL -----

    // El circulo principal se expande.-
    const circleScale = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const circleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    // Trazos vectorales rotan y se expanden hacia los lados.-
    const strokeAzulScale = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const strokeAzulRotate = useTransform(scrollYProgress, [0, 1], [12, 45]);

    const strokeRoseScale = useTransform(scrollYProgress, [0, 1], [1, 4.5]);
    const strokeRoseRotate = useTransform(scrollYProgress, [0, 1], [-45, -90]);

    // Glows de pintura líquida se dispersan y desvanecen.-
    const glowAzulX = useTransform(scrollYProgress, [0, 1], ["-50%", "-120%"]);
    const glowRoseX = useTransform(scrollYProgress, [0, 1], ["-30%", "-40%"]);
    const glowOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    // El texto subirá lentamente a medida que se va desenfocando.-
    const textY = useTransform(scrollYProgress, [0, 0.8], [0, -60]);

    return (

        // La sección será un poco más alta para dar margen a la animación.-
        <section
            ref={containerRef}
            className="relative h-[130vh] bg-black"
        >

            <motion.div
                style={{
                    filter: filterBlur,
                    opacity: globalOpacity,
                }}
                className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center select-none"
            >
                {/* --- CAPA DE MANCHAS Y TRAZOS.- */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">

                    {/* Glow Azul.- */}
                    <motion.div
                        style={{ x: glowAzulX, opacity: glowOpacity, y: "-50" }}
                        className="absolute top-1/2 left-1/2 w-137.5 h-137.5 bg-artisan-blue/20 rounded-full blur-[130px] mix-blend-screen"
                    />

                    {/* Glow Rosa Viejo.- */}
                    <motion.div
                        style={{ x: glowRoseX, opacity: glowOpacity }}
                        className="absolute top-1/3 left-1/3 w-112.5 h-112.5 bg-artisan-rose/15 rounded-full blur-[110px] mix-blend-screen"
                    />

                    {/* Trazado Vectorial Azul.- */}
                    <motion.div
                        style={{ scale: strokeAzulScale, rotate: strokeAzulRotate, opacity: circleOpacity, x: "-33%", y: "-50%" }}
                        className="absolute top-1/2 left-1/2 w-160 h-120 rounded-full border border-artisan-blue/20"
                    />

                    {/* Trazado Vectorial Rosa.- */}
                    <motion.div
                        style={{ scale: strokeRoseScale, rotate: strokeRoseRotate, opacity: circleOpacity, x: "-66%", y: "-50%" }}
                        className="absolute top-1/2 left-1/2 w-140 h-160 rounded-full border border-artisan-rose/15"
                    />

                    { /*Circulo Principal */}
                    <motion.div
                        style={{ scale: circleScale, opacity: circleOpacity, x: "-50%", y: "-50%" }}
                        className="absolute top-1/2 left-1/2 w-150 h-150 rounded-full border border-white/10"
                    />
                </div>

                {/* --- CONTENIDO DE TEXTO EDITORIAL.- ---- */}
                <div className="fixed inset-0 h-screen w-full flex flex-col items-center justify-center z-10 text-center px-6 max-w-3xl mx-auto pointer-events-none">
                    <motion.div style={{ y: textY }}>
                        <p className="text-white/60 tracking-[0.3em] uppercase text-xs font-light mb-6">
                            Arte & Tradición Argentina
                        </p>

                        <h1 className="text-7xl md:text-9xl font-light text-white mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                            Ópalo
                        </h1>

                        <h2 className="text-3xl md:text-4xl font-light text-white/90 mb-4" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                            Creaciones
                        </h2>

                        <div className="w-16 h-px bg-white/40 mx-auto my-8" />

                        <p className="text-white/80 text-lg font-light leading-relaxed max-w-lg mx-auto">
                            Cada pieza es única, hecha a mano con dedicación. <br />
                            Descubrí el arte de matear con estilo.
                        </p>
                    </motion.div>

                    {/* Botón de exploración que se desvanece con el scroll.- */}
                    <div className="absolute bottom-12">
                        <button
                            onClick={() => document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group inline-flex flex-col items-center gap-2 text-white/70 hover:text-white transition-all cursor-pointer"
                        >
                            <span className="text-xs tracking-[0.4em] uppercase">Explorar</span>
                            <ChevronDown className="w-5 h-5 animate-bounce stroke-[1px]" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}