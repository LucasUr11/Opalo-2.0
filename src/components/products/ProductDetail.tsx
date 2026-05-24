import { motion } from "framer-motion";
import { useState } from "react";
import { ShoppingCart, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import { type Product } from "../../types/product";
import { useCartStore } from '../../store/useCartStore';
import { useNavigate } from "react-router-dom";

interface ProductDetailProps {
    product: Product;
    onBack: () => void;
}

export const ProductDetail = ({ product }: ProductDetailProps) => {

    const addToCart = useCartStore((state) => state.addToCart);
    const [selectedImage, setSelectedImage] = useState(product.images[0]);
    const navigate = useNavigate();

    return (
        <section className="pt-24 pb-16 bg-artisan-paper/20 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Botón Volver.- */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-artisan-brown/60 hover:text-artisan-brown mb-8 transition-colors group cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium uppercase tracking-widest">Volver al catálogo</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start px-4 sm:px-6">

                    {/* Galería de Imágenes */}
                    <div className="flex flex-col lg:flex-row-reverse gap-4">

                        <div className="w-full aspect-square rounded-3xl overflow-hidden bg-artisan-paper/30 border border-artisan-brown/5">
                            <motion.img
                                key={selectedImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                src={selectedImage}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Carrousel.- */}
                        <div className="flex flex-row lg:flex-col items-center justify-start lg:justify-center gap-3 overflow-x-auto lg:overflow-x-visible py-2 lg:py-0 scrollbar-none">
                            {product.images.map((img, index) => {
                                const isSelected = selectedImage === img;
                                return (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(img)}
                                        className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${isSelected
                                            ? 'border-artisan-leaf scale-105 shadow-md'
                                            : 'border-transparent opacity-70 hover:opacity-100'
                                            }`}
                                    >
                                        <img
                                            src={img}
                                            alt={`Miniatura ${index + 1}`}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Información y Compra */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} // Cambiamos x por y para un efecto de subida más orgánico en responsive
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col w-full h-full mt-4 lg:mt-0" // 👈 w-full arregla el achique en celular
                    >
                        <span className="text-artisan-leaf font-bold uppercase tracking-widest text-xs mb-2">
                            {product.category.replace('_', ' ')}
                        </span>
                        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-artisan-brown mb-4 leading-tight">
                            {product.name}
                        </h1>
                        <p className="text-2xl sm:text-3xl font-bold text-artisan-brown mb-6 sm:mb-8">
                            ${product.price.toLocaleString('es-AR')}
                        </p>

                        <div className="prose prose-stone mb-6 sm:mb-8">
                            <p className="text-artisan-brown/70 leading-relaxed text-base sm:text-lg">
                                {product.description}
                            </p>
                        </div>

                        {/* Opciones para personalización */}
                        {product.customizable && (
                            <div className="mb-6 sm:mb-8 p-4 bg-artisan-paper/50 rounded-2xl border border-artisan-leaf/20">
                                <p className="text-sm font-medium text-artisan-brown flex items-center gap-2">
                                    <span className="w-2 h-2 bg-artisan-leaf rounded-full animate-pulse" />
                                    Este producto admite grabado personalizado.
                                </p>
                            </div>
                        )}

                        {/* Acciones */}
                        <div className="space-y-4 lg:mt-auto">
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full py-4 sm:py-5 bg-artisan-brown text-artisan-paper rounded-2xl font-bold text-base sm:text-lg hover:bg-artisan-brown/85 transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer"
                            >
                                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                                Agregar al carrito
                            </button>

                            <div className="grid grid-cols-2 gap-4 pt-6 sm:pt-8 border-t border-artisan-brown/10">
                                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-artisan-brown/60">
                                    <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-artisan-leaf shrink-0" />
                                    <span>Envíos a todo el país</span>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-artisan-brown/60">
                                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-artisan-leaf shrink-0" />
                                    <span>Garantía artesanal</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}