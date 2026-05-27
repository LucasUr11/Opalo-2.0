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
    <div className="bg-white rounded-2xl shadow-sm border border-artisan-brown/10 p-5 flex items-center gap-4 w-full">
        <div className={`${color} text-white p-3.5 rounded-xl shadow-inner shrink-0`}>
            {icon}
        </div>
        <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-artisan-brown/50 truncate">{title}</p>
            <p className="text-2xl sm:text-3xl font-serif text-artisan-brown truncate">{value}</p>
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

            navigate(location.pathname, { replace: true });
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
        <div
            className={`min-h-screen bg-artisan-paper/10 pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto w-full
                ${isScrolled
                    ? "py-4 bg-white/10 backdrop-blur-md border-b border-white/5"
                    : "py-6 bg-white"
                }
        `}>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 border-b border-artisan-brown/5 pb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-artisan-brown text-white rounded-xl shadow-md">
                        <LayoutDashboard className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="font-serif text-2xl sm:text-3xl text-artisan-brown">Panel de Control</h1>
                        <p className="text-xs text-artisan-brown/50 font-light">Gestión interna de Ópalo</p>
                    </div>
                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors self-end sm:self-auto"
                >
                    <LogOut className="w-4 h-4" /> Salir
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
                <MetricCard title="Productos Totales" value={totalProducts} icon={<Package />} color="bg-artisan-brown" />
                <MetricCard title="Stock Bajo (<=5)" value={lowStock} icon={<AlertTriangle />} color="bg-orange-500" />
                <MetricCard title="Sin Stock" value={noStock} icon={<XCircle />} color="bg-red-500" />
            </div>

            {/* Sección del Listado.- */}
            <div className="bg-white rounded-2xl border border-artisan-brown/5 shadow-sm p-4 sm:p-6">

                {/* Barra superior de la tabla.- */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h2 className="font-serif text-xl text-artisan-brown">Inventario de Piezas</h2>
                        <p className="text-xs text-artisan-brown/50 font-light">Agregá, editá o eliminá ítems del catálogo</p>
                    </div>
                    <button
                        onClick={() => navigate("/admin/new")}
                        className="flex items-center justify-center gap-2 bg-artisan-leaf text-white px-5 py-3 rounded-xl font-bold text-xs tracking-wider uppercase hover:bg-green-700 transition-colors shadow-md shadow-green-700/10 cursor-pointer"
                    >
                        <Plus className="w-4 h-4" /> Nuevo Producto
                    </button>
                </div>

                {/* Vista responsive.- */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {products.length === 0 ? (
                        <div className="text-center py-10 text-artisan-brown/40 text-sm">No hay productos en el catálogo.</div>
                    ) : (
                        products.map((product) => (
                            <div key={product.id} className="p-4 rounded-xl border border-artisan-brown/10 bg-artisan-paper/5 flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    {product.images && product.images[0] ? (
                                        <img src={product.images[0]} alt={product.name} className="w-14 h-14 object-cover rounded-lg bg-white border border-artisan-brown/10 shrink-0" />
                                    ) : (
                                        <div className="w-14 h-14 bg-artisan-brown/5 rounded-lg flex items-center justify-center text-artisan-brown/30 shrink-0"><Package className="w-5 h-5" /></div>
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <h4 className="font-medium text-sm text-artisan-brown truncate">{product.name}</h4>
                                        <p className="text-xs text-artisan-brown/40 uppercase tracking-wider font-semibold mt-0.5">{product.category}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-lg border border-artisan-brown/5 text-xs">
                                    <div>
                                        <span className="text-artisan-brown/40 block">Precio (ARS)</span>
                                        <span className="font-bold text-artisan-brown">${product.price.toLocaleString('es-AR')}</span>
                                    </div>
                                    <div>
                                        <span className="text-artisan-brown/40 block">Stock</span>
                                        <span className={`font-bold ${product.stock === 0 ? 'text-red-500' : 'text-artisan-brown'}`}>{product.stock} u.</span>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-1">
                                    <button
                                        onClick={() => navigate(`/admin/edit/${product.id}`)}
                                        className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                    >
                                        <Pencil className="w-3.5 h-3.5" /> Editar
                                    </button>
                                    <button
                                        onClick={() => setProductToDeleteId(product.id)}
                                        className="flex-1 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" /> Eliminar
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Vista para PC.- */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-artisan-brown/10 text-[11px] font-bold uppercase tracking-widest text-artisan-brown/40">
                                <th className="pb-4 font-bold">Imagen</th>
                                <th className="pb-4 font-bold">Nombre</th>
                                <th className="pb-4 font-bold">Categoría</th>
                                <th className="pb-4 font-bold">Precio (ARS)</th>
                                <th className="pb-4 font-bold">Stock</th>
                                <th className="pb-4 text-right font-bold">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-artisan-brown/5 text-sm text-artisan-brown/80">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="text-center py-10 text-artisan-brown/40">No hay productos cargados todavía.</td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-artisan-paper/5 transition-colors group">
                                        <td className="py-4">
                                            {product.images && product.images[0] ? (
                                                <img src={product.images[0]} alt={product.name} className="w-12 h-12 object-cover rounded-lg bg-artisan-paper/20 border border-artisan-brown/10 shadow-sm" />
                                            ) : (
                                                <div className="w-12 h-12 bg-artisan-brown/5 rounded-lg flex items-center justify-center text-artisan-brown/30"><Package className="w-4 h-4" /></div>
                                            )}
                                        </td>
                                        <td className="py-4 font-medium text-artisan-brown">{product.name}</td>
                                        <td className="py-4 text-xs uppercase tracking-wider text-artisan-brown/60">{product.category}</td>
                                        <td className="py-4 font-semibold">${product.price.toLocaleString('es-AR')}</td>
                                        <td className="py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${product.stock === 0 ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${product.stock === 0 ? 'bg-red-500' : 'bg-green-500'}`} />
                                                {product.stock} unidades
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => navigate(`/admin/edit/${product.id}`)}
                                                    className="p-2 text-artisan-brown/60 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer transition-all"
                                                    title="Editar pieza"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => setProductToDeleteId(product.id)}
                                                    className="p-2 text-artisan-brown/60 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer transition-all"
                                                    title="Eliminar pieza"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            {
                toast.show && (
                    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl border text-xs sm:text-sm font-medium tracking-wide bg-white animate-fade-in
                    ${toast.type === "success" ? 'border-green-200 text-green-800' : 'border-red-200 text-red-800'}    
                `}>
                        <span className={`w-2 h-2 rounded-full ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`} />
                        {toast.message}
                    </div>
                )
            }

            <ConfirmModal
                isOpen={productToDeleteId !== null}
                title="¿Confirmas eliminar?"
                message="Esta acción no se puede deshacer. El producto se borrará permanentemente de la tienda."
                onConfirm={executeDelete}
                onCancel={() => setProductToDeleteId(null)}
            />
        </div >
    );
}
