import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import mate from "../../assets/mates_geometrico-2.png"
import bombilla from "../../assets/bombilla_aluminio-2.jpg"
import prenda from "../../assets/prenda_compleja-1.png"
import yerbera from "../../assets/yerbera_cuero_sintetico-2.png"

interface CategoryCard {
    id: string;
    name: string;
    image: string;
    description: string;
}

export const HomeCategories = () => {
    const navigate = useNavigate();

    // Ubico las categorias elegidas.-
    const mainCategories: CategoryCard[] = [
        {
            id: 'mates',
            name: 'Mates',
            image: mate,
            description: 'Piezas únicas en madera y calabaza'
        },
        {
            id: 'bombillas',
            name: 'Bombillas',
            image: bombilla,
            description: 'Alpaca y cincelados artesanales'
        },
        {
            id: 'yerberas',
            name: 'Yerberas',
            image: yerbera,
            description: 'Cuero genuino y guardado premium'
        },
        {
            id: 'prendas',
            name: 'Prendas',
            image: prenda,
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {mainCategories.map((cat) => (
                        <div
                            key={cat.id}
                            onClick={() => handleCategoryClick(cat.id)}
                            className="group relative h-100 rounded-3xl overflow-hidden cursor-pointer border border-artisan-brown/5 bg-white shadow-sm transition-all duration-500 hover:shadow-xl"
                        >
                            <div className="w-full h-full overflow-hidden">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                />
                            </div>

                            <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

                            <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end text-white">
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