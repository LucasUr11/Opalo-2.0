import { useNavigate } from "react-router-dom";
import { ArrowLeft, Compass, ShoppingBag } from "lucide-react";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <section className="min-h-[80vh] flex items-center justify-center px-6 py-20 bg-artisan-paper/10">
            <div className="max-w-md w-full text-center">

                <div className="inline-flex p-5 rounded-full bg-artisan-brown/5 text-artisan-brown/40 mb-6 animate-pulse">
                    <Compass className="w-10 h-10 stroke-[1.2]" />
                </div>

                <h1
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    className="text-8xl sm:text-9xl text-artisan-brown/20 font-light leading-none mb-2 select-none"
                >
                    404
                </h1>

                <h2
                    style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    className="text-2xl sm:text-3xl text-artisan-brown font-light mb-4"
                >
                    Pieza no encontrada
                </h2>

                <p className="text-artisan-brown/60 text-sm sm:text-base font-light mb-10 leading-relaxed">
                    El camino que buscás no existe o la coordenada cambió. Así como cada veta de la madera es única, los rincones de nuestro atelier también lo son.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-2 px-5 py-3 border border-artisan-brown/20 text-artisan-brown rounded-xl font-bold text-xs tracking-wider uppercase hover:bg-artisan-brown/5 transition-colors cursor-pointer"
                    >
                        <ArrowLeft className="w-4 h-4" /> Volver atrás
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center justify-center gap-2 px-5 py-3 bg-artisan-brown text-white rounded-xl font-bold text-xs tracking-wider uppercase hover:bg-black transition-colors shadow-md cursor-pointer"
                    >
                        <ShoppingBag className="w-4 h-4" /> Ir al Inicio
                    </button>
                </div>

            </div>
        </section>
    );
};