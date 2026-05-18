import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { navigationLinks } from '../../types/navigation';
import { useCartStore } from '../../store/useCartStore';
import { CartDrawer } from '../cart/CartDrawer';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItems = useCartStore((state) => state.cart);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    const [isScrolled, setIsScrolled] = useState(false);

    // Efecto para detectar el scroll y cambiar las clases.-
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

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 
                ${isScrolled
                        ? "backdrop-blur-md bg-slate-950/40"
                        : "py-2 bg-transparent"
                    }`
                }
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">

                    {/* Logo.- */}
                    <div className="flex items-center">
                        <div className="w-15 h-15 overflow-hidden">
                            <img
                                src="/logo-artisan.png"
                                alt="Logo"
                                className='w-full h-full p-0 object-cover'
                            />
                        </div>
                        <span
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            className='text-gray-100 text-3xl font-light'
                        >
                            Ópalo
                        </span>
                    </div>

                    {/* Links.- */}
                    <div
                        className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest"
                    >
                        <div className="hidden md:flex items-center gap-8">
                             {navigationLinks.map((link) => (
                                <a
                                    key={link.path}
                                    href={link.path}
                                    className='text-sm font-medium text-gray-100 font-serif transition-colors relative group'
                                >
                                    {link.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-artisan-blue transition-all group-hover:w-full" />
                                </a>
                            ))}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className='relative p-2 cursor-pointer hover:bg-artisan-main/20 rounded-full transition-all'
                            >
                                <ShoppingCart className="w-5 h-5 text-gray-100" />
                                <span className="absolute top-0 right-0 bg-artisan-blue text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                    {totalItems}
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Responsive.- */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className='relative p-2 cursor-pointer hover:bg-artisan-main/20 rounded-full transition-all'
                        >
                            <ShoppingCart className="w-5 h-5 text-gray-100" />
                            <span className="absolute top-0 right-0 bg-artisan-blue text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                {totalItems}
                            </span>
                        </button>

                        {/* Hamburguesa.- */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className='p-2 text-gray-100 cursor-pointer'
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-artisan-blue/80 overflow-hidden"
                        >
                            <div className="px-4 pt-2 pb-6 space-y-1">
                                {navigationLinks.map((link) => (
                                    <a
                                        key={link.path}
                                        href={link.path}
                                        className="block px-3 py-4 text-base font-medium text-white hover:bg-artisan-leaf/10 rounded-lg"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};