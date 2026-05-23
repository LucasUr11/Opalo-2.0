import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { cart, updateQuantity, removeFromCart, getTotalPrice } = useCartStore();
    const navigate = useNavigate();

    const handleCheckout = () => {
        onClose();
        navigate('/checkout');
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay oscuro de fondo */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60"
                    />

                    {/* Panel Lateral */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-artisan-paper shadow-2xl z-70 flex flex-col"
                    >
                        {/* Header del Carrito */}
                        <div className="p-6 border-b border-artisan-brown/10 flex justify-between items-center bg-white">
                            <div className="flex items-center gap-2">
                                <ShoppingBag className="w-5 h-5 text-artisan-leaf" />
                                <h2 className="font-serif text-xl text-artisan-brown">Tu Carrito</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-artisan-brown/5 rounded-full transition-colors">
                                <X className="w-6 h-6 text-artisan-brown cursor-pointer" />
                            </button>
                        </div>

                        {/* Lista de Productos */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <ShoppingBag className="w-12 h-12 mb-4" />
                                    <p>Todavía no sumaste ningún mate a tu ronda.</p>
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 bg-white p-3 rounded-xl border border-artisan-brown/5">
                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h4 className="font-medium text-artisan-brown text-sm">{item.name}</h4>
                                            <p className="text-artisan-leaf font-bold text-sm mt-1">
                                                ${(item.price * item.quantity).toLocaleString('es-AR')}
                                            </p>

                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center border border-artisan-brown/10 rounded-lg">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="p-1 hover:text-artisan-leaf"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="px-3 text-sm font-medium">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-1 hover:text-artisan-leaf"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-400 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer del Carrito (Total y Checkout) */}
                        {cart.length > 0 && (
                            <div className="p-6 bg-white border-t border-artisan-brown/10 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-artisan-brown/60">Total estimado:</span>
                                    <span className="text-2xl font-bold text-artisan-brown">
                                        ${getTotalPrice().toLocaleString('es-AR')}
                                    </span>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full py-4 bg-artisan-brown text-artisan-paper rounded-xl font-bold hover:bg-black transition-all shadow-lg"
                                >
                                    Finalizar Compra
                                </button>

                                <p className="text-[10px] text-center text-artisan-brown/40 uppercase tracking-widest">
                                    Envío gratis en compras superiores a $50.000
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};