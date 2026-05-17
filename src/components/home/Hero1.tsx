import { easeOut, motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero1 = () => {
    return (
        <section className="relative pt-20 pb-16 lg:pt-30 lg:pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">

                    {/* Texto y CTA.- */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: easeOut }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-artisan-leaf/10 text-artisan-leaf text-sm font-medium mb-6">
                            <Sparkles className='w-4 h-4' />
                            <span>Artesania Argentina</span>
                        </div>

                        <h1 className="font-serif text-5xl lg:text-7xl text-artisan-brown leading-tight mb-6">
                            El arte de cebar, <br />
                            <span className="italic text-artisan-leaf">hecho a mano.</span>
                        </h1>

                        <p className="text-lg text-artisan-brown/70 mb-8 max-w-lg">
                            Mates imperiales, de madera y sets completos personalizados.
                            Cada pieza es única, pintada y cincelada por manos artesanas.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="px-8 py-4 bg-artisan-brown text-artisan-paper rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-black transition-all group">
                                Explorar Colección
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="px-8 py-4 border-2 border-artisan-brown/20 text-artisan-brown rounded-full font-semibold hover:bg-artisan-brown/5 transition-all">
                                Personalizar el mío
                            </button>
                        </div>
                    </motion.div>

                    {/* Imagen.- */}
                    <motion.div
                        className="relative mt-16 lg:mt-0"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <div className="relative z-10 w-full aspect-square rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://tiendachemate.com.ar/wp-content/uploads/2023/06/Mate-imperial-premium-1.jpg"
                                alt="Mate Imperial Artesanal"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Decoración "Futurista/Orgánica.-" */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-artisan-leaf/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-artisan-brown/10 rounded-full blur-3xl" />
                    </motion.div>
                </div>
            </div>
        </section >
    );
}