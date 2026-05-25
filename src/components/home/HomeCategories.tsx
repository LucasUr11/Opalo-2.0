import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";

interface CategoryCard {
    id: string;
    name: string;
    image: string;
    description: string;
}

export const HomeCategories = () => {
    const navigate = useNavigate();
    const { loading } = useProducts('all');

    if (loading) {
        return (
            <div className="py-20 text-center text-artisan-brown/60 animate-pulse">
                Buscando categorias...
            </div>
        );
    }

    // Ubico las categorias elegidas.-
    const mainCategories: CategoryCard[] = [
        {
            id: 'mates',
            name: 'Mates',
            image: "https://acdn-us.mitiendanube.com/stores/005/105/219/products/dsc_0572-3-fdc090843bd9a64c5117590320677188-1024-1024.webp",
            description: 'Piezas únicas en madera y calabaza'
        },
        {
            id: 'bombillas',
            name: 'Bombillas',
            image: "https://acdn-us.mitiendanube.com/stores/002/027/172/products/untitled-design-1-730d7699c6d1f4d42c17347294066109-640-0.webp",
            description: 'Alpaca y cincelados artesanales'
        },
        {
            id: 'yerberas',
            name: 'Yerberas',
            image: "https://acdn-us.mitiendanube.com/stores/002/425/427/products/img_0575-min-062135b036a61e8d9616993640539276-1024-1024.webp",
            description: 'Cuero genuino y guardado premium'
        },
        {
            id: 'prendas',
            name: 'Prendas',
            image: "https://acdn-us.mitiendanube.com/stores/001/955/538/products/whatsapp-image-2025-07-29-at-19-45-18-2-a0eb3ee21925880f6817538314574153-1024-1024.webp",
            description: 'Indumentaria con identidad'
        },
    ]

    const handleCategoryClick = (categoryId: string) => {
        navigate('/productos', { state: { initialCategory: categoryId } });
    };

    return (
        <section className="py-20 bg-artisan-paper/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-artisan-leaf font-bold uppercase tracking-widest text-xs block mb-3">
                        Artesanía en cada detalle
                    </span>
                    <h2 className="font-serif text-3xl lg:text-4xl text-artisan-brown">
                        Explora nuestras Colecciones
                    </h2>
                    <div className="w-12 h-0.5 bg-artisan-brown/20 mx-auto mt-4" />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {mainCategories.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className="group relative md:h-100 rounded-3xl overflow-hidden cursor-pointer border border-artisan-brown/5 bg-white shadow-sm transition-all duration-500 hover:shadow-xl"
                        >
                            <div className="w-full h-full overflow-hidden">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>

                            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-8 flex flex-col justify-end text-white">
                                <p className="text-xs font-bold uppercase tracking-widest text-artisan-blue mb-1 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                    Ver productos
                                </p>

                                <div className="flex justify-between items-center">
                                    <h3 className="font-serif text-2xl lg:text-3xl font-light tracking-wide">
                                        {cat.name}
                                    </h3>
                                    <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:text-slate-950">
                                        <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>

                                <p className="text-sm text-gray-300 mt-2 font-light line-clamp-2">
                                    {cat.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}