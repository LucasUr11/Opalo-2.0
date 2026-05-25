import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useCartStore } from "../../store/useCartStore";

export const FeaturedProducts = () => {
    const navigate = useNavigate();
    const { products, loading, error } = useProducts('all');
    const addToCart = useCartStore((state) => state.addToCart);

    const featuredList = products
        .filter((product) => product.featured === true)
        .slice(0, 4);

    if (loading) {
        return (
            <div className="py-20 text-center text-artisan-brown/60 animate-pulse">
                Buscando piezas destacadas...
            </div>
        );
    }

    if (error) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                    <div>
                        <span className="text-artisan-leaf font-bold uppercase tracking-widest text-xs block mb-3">
                            Selección exclusiva
                        </span>

                        <h2 className="font-serif text-3xl lg:text-4xl text-artisan-brown">
                            Productos Destacados
                        </h2>
                    </div>

                    <button
                        onClick={() => navigate('/productos')}
                        className="mt-4 md:mt-0 flex items-center gap-2 text-sm font-medium text-artisan-brown hover:text-artisan-leaf transition-colors group cursor-pointer"
                    >
                        Ver todo el catálogo
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuredList.map((product) => (
                        <div
                            key={product.id}
                            className="group flex flex-col h-full bg-artisan-paper/10 rounded-3xl overflow-hidden border border-artisan-brown/5 p-4 transition-all duration-300 hover:shadow-md"
                        >
                            {/* Imagen del Producto */}
                            <div
                                onClick={() => navigate(`/product/${product.id}`)}
                                className="aspect-square rounded-2xl overflow-hidden bg-white relative cursor-pointer"
                            >
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {product.customizable && (
                                    <span className="absolute top-3 left-3 bg-artisan-leaf/90 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md backdrop-blur-sm">
                                        Personalizable
                                    </span>
                                )}
                            </div>

                            {/* Información Básica */}
                            <div className="flex flex-col pt-4 grow">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-artisan-brown/40 mb-1">
                                    {product.category.replace('_', ' ')}
                                </span>
                                <h3
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    className="font-serif text-lg text-artisan-brown font-medium line-clamp-1 hover:text-artisan-leaf cursor-pointer transition-colors"
                                >
                                    {product.name}
                                </h3>

                                <p className="text-xl font-bold text-artisan-brown mt-2">
                                    ${product.price.toLocaleString('es-AR')}
                                </p>

                                {/* Acciones rápidas de la Card */}
                                <div className="grid grid-cols-5 gap-2 mt-4 pt-3 border-t border-artisan-brown/5">
                                    <button
                                        onClick={() => navigate(`/product/${product.id}`)}
                                        className="col-span-4 py-2.5 bg-artisan-brown text-white text-xs font-bold rounded-xl hover:bg-artisan-brown/90 transition-colors cursor-pointer"
                                    >
                                        Ver Detalle
                                    </button>
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="col-span-1 flex items-center justify-center bg-artisan-paper text-artisan-brown rounded-xl hover:bg-artisan-brown hover:text-white transition-all cursor-pointer border border-artisan-brown/10"
                                        title="Agregar al carrito"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}