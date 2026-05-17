import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';
import { type Product } from '../../types/product';
import { useCartStore } from '../../store/useCartStore';

interface ProductCardProps {
    product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {

    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <Link to={`/product/${product.id}`}>
            <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-artisan-brown/5"
            >
                {/* Imagen del Producto */}
                <div className="relative aspect-square overflow-hidden bg-artisan-paper/30">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badges y Botones rápidos.- */}
                    {product.featured && (
                        <span className="absolute top-3 left-3 bg-artisan-leaf text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                            Destacado
                        </span>
                    )}

                    <button className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-artisan-brown opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                        <Heart className="w-4 h-4" />
                    </button>
                </div>

                {/* Info del Producto */}
                <div className="p-5">
                    <p className="text-xs text-artisan-leaf font-semibold uppercase tracking-wider mb-1">
                        {product.category.replace('_', ' ')}
                    </p>
                    <h3 className="font-serif text-lg text-artisan-brown mb-2 line-clamp-1">
                        {product.name}
                    </h3>

                    <div className="flex items-center justify-between mt-4">
                        <span className="text-xl font-bold text-artisan-brown">
                            ${product.price.toLocaleString('es-AR')}
                        </span>

                        <button
                            onClick={() => addToCart(product)}
                            className="p-3 bg-artisan-brown text-artisan-paper rounded-xl hover:bg-black transition-colors flex items-center gap-2 group/btn">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="hidden sm:inline text-sm font-medium">Añadir</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};