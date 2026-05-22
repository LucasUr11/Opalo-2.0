import { useState } from "react";
import { useNavigate, useLocation  } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Categories } from "../components/home/Categories";
import { ProductGrid } from "../components/products/ProductGrid";

export const CatalogPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const initialCategory = location.state?.initialCategory || "all";
    const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

    return (
        <div className="pt-28 pb-16 bg-artisan-paper/20 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-artisan-brown/60 hover:text-artisan-brown mb-8 transition-colors group cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium uppercase tracking-widest">
                        Volver al Inicio
                    </span>
                </button>

                <h1 className="font-serif text-4xl text-artisan-brown mb-8 text-center">
                    Nuestro Catálogo
                </h1>

                <Categories activeCategory={selectedCategory} setActiveCategory={setSelectedCategory} />

                <div className="mt-12">
                    <ProductGrid category={selectedCategory} />
                </div>
            </div>
        </div>
    )
}