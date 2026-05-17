import { motion } from 'framer-motion';
import { Hammer, Heart, Sparkles } from 'lucide-react';

export const BrandStory = () => {
    return (
        <section className="py-24 bg-artisan-paper relative overflow-hidden">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-linear-to-b from-transparent to-artisan-brown/20" />

            <div className="max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className='space-y-6'
                >
                    <h2 className="font-serif text-4xl md:text-5xl text-artisan-brown leading-tight">
                        Cada pieza cuenta una historia
                    </h2>

                    <p className="text-lg md:text-xl text-artisan-brown/70 max-w-2xl mx-auto leading-relaxed">
                        Trabajamos con materiales nobles y técnicas artesanales para crear piezas que
                        <span className="text-artisan-leaf font-medium"> trascienden el tiempo</span>.
                        No vendemos objetos, compartimos una tradición.
                    </p>

                    {/* Íconos representativos.- */}
                    <div className="grid grid-cols-3 gap-8 pt-12">
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-4 rounded-full bg-white shadow-sm border border-artisan-brown/5">
                                <Hammer className="w-6 h-6 text-artisan-leaf" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-artisan-brown/60">Manual</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-4 rounded-full bg-white shadow-sm border border-artisan-brown/5">
                                <Heart className="w-6 h-6 text-artisan-leaf" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-artisan-brown/60">Pasión</span>
                        </div>
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-4 rounded-full bg-white shadow-sm border border-artisan-brown/5">
                                <Sparkles className="w-6 h-6 text-artisan-leaf" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-artisan-brown/60">Único</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
