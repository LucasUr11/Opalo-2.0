import { motion } from 'framer-motion';
import { Coffee, Trees, Sparkles, Package, Shirt } from 'lucide-react';
import FadeIn from '../ui/FadeIn';

export const categories = [
    { id: 'all', label: 'Todos', icon: Sparkles },
    { id: 'mates', label: 'Mates', sub: ['mates_torpedo', 'mates_imperiales', 'mates_madera', 'mates_camionero'], icon: Sparkles },
    { id: 'bombillas', label: 'Bombillas', sub: ['bombillas'], icon: Trees },
    { id: 'yerberas', label: 'Yerberas', sub: ['yerberas_azucareras'], icon: Package },
    { id: 'cuencos', label: 'Cuencos', icon: Coffee },
    { id: 'otros', label: 'Otros', sub: ['cuencos_tablas', 'cajas'], icon: Shirt },
];

export const Categories = ({ onCategoryChange }: any) => {
    return (
        <section 
            className="py-12 bg-artisan-sand">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <FadeIn>
                    <div className="flex flex-wrap gap-4 justify-center">
                        {categories.map((cat) => (
                            <motion.button
                                key={cat.id}
                                onClick={() => onCategoryChange(cat.id)}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2 px-6 py-3 rounded-full border transition-all 'bg-transparent text-artisan-brown border-artisan-brown/20 hover:border-artisan-brown cursor-pointer"
                            >
                                <cat.icon className="w-4 h-4 mb-3 text-artisan-leaf group-hover:text-artisan-paper transition-colors" />
                                <span className="text-sm font-bold uppercase tracking-widest text-artisan-brown group-hover:text-artisan-paper">
                                    {cat.label}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </FadeIn>

            </div>
        </section>
    );
};