import { ProductCard } from './ProductCard';
import { useProducts } from '../../hooks/useProducts';

interface ProductGridProps {
  category: string;
}

export const ProductGrid = ({ category }: ProductGridProps) => {
    const { products, loading, error } = useProducts(category);

    if (loading) return <div className="py-20 text-center">Cargando mates artesanales...</div>;
    if (error) return <div className="py-20 text-center text-red-500">Error al conectar con Supabase</div>;

    return (
        <section 
            id='products'
            className="py-16 bg-artisan-paper/20"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lgpx-8">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="font-serif text-3xl md:text-4xl text-artisan-brown">Nuestras Piezas</h2>
                        <div className="h-1 w-20 bg-artisan-leaf mt-2" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard 
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}