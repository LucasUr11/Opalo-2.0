import FadeIn from '../ui/FadeIn';

export const BrandStory = () => {
    return (
        <section className="relative w-full h-137.5 flex items-center justify-center overflow-hidden bg-slate-950">
            
            <img 
                src="/banner.png"
                alt="Esencia y Cultura Argentina Ópalo" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 transition-transform duration-1000 hover:scale-105"
            />

            {/* Capa para bajarle la opcidad.- */}
            <div className="absolute inset-0 bg-linear-to-r from-slate-950/50 via-slate-950/30 to-slate-950/50 backdrop-blur-[2px]" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <FadeIn>
                    <span className="text-artisan-blue font-bold uppercase tracking-widest text-xs block mb-4 drop-shadow">
                        Nuestra Identidad
                    </span>
                    <h2 
                        style={{ fontFamily: 'Cormorant Garamond, serif' }} 
                        className="text-gray-100 text-3xl md:text-5xl lg:text-6xl font-light tracking-wide leading-tight drop-shadow-lg"
                    >
                        Mate, una excusa para <br className="hidden sm:inline" /> detenerse y disfrutar.
                    </h2>
                    <div className="w-16 h-0.5 bg-artisan-blue/50 mx-auto mt-6 shadow-sm" />
                    <p className="text-gray-300/90 font-sans text-sm md:text-base font-light tracking-wide max-w-2xl mx-auto mt-6 drop-shadow">
                        Piezas únicas cargadas de historia, diseñadas para honrar nuestras costumbres.
                    </p>
                </FadeIn>
            </div>

        </section>
    );
};
