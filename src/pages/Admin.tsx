import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, useLocation } from "react-router-dom";
import { LogOut, Plus, Loader2, Package, AlertTriangle, XCircle, Pencil, Trash2, LayoutDashboard } from "lucide-react";
import { type Product } from "../types/product";
import { ConfirmModal } from "../components/admin/ConfirmModal";

interface MetricCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
}

const MetricCard = ({ title, value, icon, color }: MetricCardProps) => (
    <div className="bg-white rounded-2xl shadow-sm border border-artisan-brown/10 p-6 flex items-center gap-4">
        <div className={`${color} text-white p-4 rounded-2xl shadow-inner`}>
            {icon}
        </div>
        <div>
            <p className="text-xs font-bold uppercase tracking-widest text-artisan-brown/50">{title}</p>
            <p className="text-3xl font-serif text-artisan-brown">{value}</p>
        </div>
    </div>
)

export default function Admin() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [productToDeleteId, setProductToDeleteId] = useState<string | null>(null)

    // Detectamos el scroll para cambiar el estado del fondo.-
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Estado para el Toast.-
    const [toast, setToast] = useState<{ show: boolean; message: string; type: 'success' | 'error' }>({
        show: false,
        message: '',
        type: 'success'
    });

    // Función para activar el Toast.-
    const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ show: true, message, type });

        setTimeout(() => {
            setToast((prev) => ({ ...prev, show: false }));
        }, 3000);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false })

        if (!error && data) setProducts(data);
        setIsLoading(false);
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    // Esta función ahora solo "prepara" el borrado abriendo el modal
    const handleDeleteClick = (id: string) => {
        setProductToDeleteId(id); // Al guardar el ID, el modal se va a abrir
    };

    // Esta función es la que realmente se conecta a Supabase cuando el usuario confirma en el modal eliminar un producto.-
    const executeDelete = async () => {
        if (!productToDeleteId) return;

        try {
            const productToDelete = products.find(p => p.id === productToDeleteId);

            if (productToDelete?.images && productToDelete.images.length > 0) {
                const filesNames = productToDelete.images.map(url => {
                    const parts = url.split('/');
                    return parts[parts.length - 1];
                });

                const { error: storageError } = await supabase.storage
                    .from("product-images")
                    .remove(filesNames);

                if (storageError) {
                    console.error("Error al eliminar imágenes del almacenamiento:", storageError);
                }
            }

            const { error: dbError } = await supabase
                .from("products")
                .delete()
                .eq("id", productToDeleteId); // Usamos el ID del estado

            if (dbError) throw dbError;

            fetchProducts();
            showNotification("Producto eliminado correctamente.", "success");

        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            showNotification("Hubo un error al eliminar el producto.", "error");
        } finally {
            setProductToDeleteId(null);
        }
    };

    useEffect(() => {
        if (location.state && location.state.notification) {
            const message = location.state.notification;
            const type = location.state.type || 'success';

            showNotification(message, type);

            navigate(location.pathname, { replace: true});
        }
    }, [location, navigate]);


    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-artisan-paper">
            <Loader2 className="w-12 h-12 animate-spin text-artisan-leaf" />
        </div>
    )

    const totalProducts = products.length;
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 5).length;
    const noStock = products.filter(p => p.stock === 0).length;

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-artisan-paper">
                <Loader2 className="w-12 h-12 animate-spin text-artisan-leaf" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-artisan-paper/30 pb-20">
            <header 
                className={`border-b border-artisan-brown/10 py-4 px-8 mb-8 sticky top-0 z-10
                    ${isScrolled
                        ? "py-4 bg-white/10 backdrop-blur-md border-b border-white/5"
                        : "py-6 bg-white"
                    }
                `}
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3 text-artisan-brown">
                        <LayoutDashboard className="w-6 h-6" />
                        <h1 className="font-serif text-2xl">Administración Ópalo</h1>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center gap-2 text-red-500 hover:text-red-700 font-bold text-sm uppercase tracking-widest transition-colors cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" /> Salir
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <MetricCard title="Productos Totales" value={totalProducts} icon={<Package />} color="bg-artisan-brown" />
                    <MetricCard title="Stock Bajo (<=5)" value={lowStock} icon={<AlertTriangle />} color="bg-orange-500" />
                    <MetricCard title="Sin Stock" value={noStock} icon={<XCircle />} color="bg-red-500" />
                </div>

                <div className="flex justify-between items-center mb-8">
                    <h2 className="font-serif text-2xl text-artisan-brown italic">Inventario Actual</h2>
                    <button
                        onClick={() => navigate("/admin/new")}
                        className="bg-artisan-leaf text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 shadow-lg transition-all cursor-pointer"
                    >
                        <Plus className="w-5 h-5" /> Nuevo Producto
                    </button>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-artisan-brown/10 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-artisan-paper/50 text-artisan-brown border-b border-artisan-brown/10">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Producto</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-center">Stock</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-center">Precio</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-artisan-brown/5">
                            {products.map((product) => (
                                <tr 
                                    key={product.id} 
                                    className="hover:bg-artisan-paper/20 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src={product.images?.[0]}
                                                className="w-12 h-12 rounded-lg object-cover bg-artisan-paper"
                                            />
                                            <span className="font-medium text-artisan-brown">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock === 0 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                            {product.stock} unidades
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-artisan-brown">
                                        ${product.price?.toLocaleString('es-AR')}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button
                                            onClick={() => navigate(`/admin/edit/${product.id}`)}
                                            className="p-2 text-artisan-leaf hover:bg-artisan-leaf/10 rounded-lg transition-all cursor-pointer"
                                        >
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(product.id)}
                                            className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>

            {toast.show && (
                <div
                    className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-xl border text-sm font-medium tracking-wide animate-bounce
                        ${toast.type === "success"
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                        }    
                    `}
                >
                    <span
                        className={`w-2 h-2 rounded-full
                            ${toast.type === 'success'
                                ? 'bg-green-500'
                                : 'bg-red-500'
                            }
                        `}
                    />
                    {toast.message}
                </div>
            )}

            <ConfirmModal
                isOpen={productToDeleteId !== null}
                title="¿Confirmas eliminar?"
                message="Esta acción no se puede deshacer. El producto se borrará permanentemente."
                onConfirm={executeDelete}
                onCancel={() => setProductToDeleteId(null)}
            />
        </div>
    );
}
