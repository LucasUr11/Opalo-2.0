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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Galería.- */}
                    <motion.div
                        key={selectedImage}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4 flex flex-row-reverse"
                    >
                        <div className="aspect-square rounded-3xl overflow-hidden bg-artisan-paper/30 border border-artisan-brown/5">
                            <img
                                src={selectedImage}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex flex-col items-center justify-center mr-3 gap-4 ">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(img)} // Actualiza el estado.-
                                    className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${selectedImage === img ? 'border-artisan-leaf scale-110' : 'border-transparent'
                                        }`}
                                >
                                    <img src={img} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Información y Compra.- */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col w-4/5 h-full"
                    >
                        <span className="text-artisan-leaf font-bold uppercase tracking-widest text-xs mb-2">
                            {product.category.replace('_', ' ')}
                        </span>
                        <h1 className="font-serif text-4xl lg:text-5xl text-artisan-brown mb-4">
                            {product.name}
                        </h1>
                        <p className="text-3xl font-bold text-artisan-brown mb-8">
                            ${product.price.toLocaleString('es-AR')}
                        </p>

                        <div className="prose prose-stone mb-8">
                            <p className="text-artisan-brown/70 leading-relaxed text-lg">
                                {product.description}
                            </p>
                        </div>

                        {/* Opciones para personalización.- */}
                        {product.customizable && (
                            <div className="mb-8 p-4 bg-artisan-paper/50 rounded-2xl border border-artisan-leaf/20">
                                <p className="text-sm font-medium text-artisan-brown flex items-center gap-2">
                                    <span className="w-2 h-2 bg-artisan-leaf rounded-full animate-pulse" />
                                    Este producto admite grabado personalizado.
                                </p>
                            </div>
                        )}

                        {/* Acciones.- */}
                        <div className="space-y-4 mt-auto">
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full py-5 bg-artisan-brown text-artisan-paper rounded-2xl font-bold text-lg hover:bg-artisan-brown/85 transition-all shadow-lg flex items-center justify-center gap-3 cursor-pointer">
                                <ShoppingCart className="w-6 h-6" />
                                Agregar al carrito
                            </button>

                            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-artisan-brown/10">
                                <div className="flex items-center gap-3 text-sm text-artisan-brown/60">
                                    <Truck className="w-5 h-5 text-artisan-leaf" />
                                    <span>Envíos a todo el país</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-artisan-brown/60">
                                    <ShieldCheck className="w-5 h-5 text-artisan-leaf" />
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