import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { MapPin, Mail, Leaf, PhoneForwarded } from 'lucide-react';
import { useCartStore } from '../../store/useCartStore';
import { useState } from 'react';
import { CartDrawer } from '../cart/CartDrawer';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const cartItems = useCartStore((state) => state.cart);
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <footer className="bg-artisan-brown text-artisan-paper pt-20 pb-8 border-t border-artisan-brown/10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-artisan-paper/10 pb-16">

                {/* Titulo.- */}
                <div className="flex flex-col justify-start">
                    <div className="flex items-center gap-2 mb-6">
                        <Leaf className="text-artisan-leaf w-5 h-5" />
                        <span
                            style={{ fontFamily: 'Cormorant Garamond, serif' }}
                            className="text-2xl font-light tracking-wide text-white"
                        >
                            Ópalo Creaciones
                        </span>
                    </div>
                    <p className="text-artisan-paper/70 text-sm leading-relaxed font-light">
                        Llevando la tradición argentina a otro nivel con piezas únicas hechas a mano por el Lic. Lucas Urquiza.
                    </p>
                </div>

                {/* Links.- */}
                <div>
                    <h4 className="font-sans font-bold mb-6 uppercase text-xs tracking-[0.2em] text-white/50">
                        Navegación
                    </h4>
                    <ul className="space-y-4 text-sm text-artisan-paper/75 font-light">
                        <li>
                            <a href="/">
                                <button className="hover:text-white transition-colors cursor-pointer block">
                                    Inicio
                                </button>
                            </a>
                        </li>
                        <li>
                            <a href="/productos">
                                <button className="hover:text-white transition-colors cursor-pointer block">
                                    Catálogo de Productos
                                </button>
                            </a>
                        </li>
                        <li>
                            <button 
                                onClick={() => setIsCartOpen(true)}
                                className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                            >
                                Mi Carrito
                                {totalItems > 0 && (
                                    <span className="bg-artisan-blue text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                                        {totalItems}
                                    </span>
                                )}
                            </button>
                        </li>
                    </ul>
                </div>

                {/* Contacto.- */}
                <div>
                    <h4 className="font-sans font-bold mb-6 uppercase text-xs tracking-[0.2em] text-white/50">
                        Contacto
                    </h4>
                    <ul className="space-y-4 text-sm text-artisan-paper/75 font-light">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-artisan-leaf shrink-0 mt-0.5" />
                            <span>Villa Maria, Córdoba, Argentina</span>
                        </li>
                        <li className="flex items-start gap-3 break-all">
                            <Mail className="w-4 h-4 text-artisan-leaf shrink-0 mt-0.5" />
                            <span>rominapaolameitre@gmail.com</span>
                        </li>
                        <li className="flex items-start gap-3 break-all">
                            <PhoneForwarded className="w-4 h-4 text-artisan-leaf shrink-0 mt-0.5" />
                            <span>+54 9 3537-333758</span>
                        </li>
                    </ul>
                </div>

                {/* Redes Sociales.- */}
                <div>
                    <h4 className="font-sans font-bold mb-6 uppercase text-xs tracking-[0.2em] text-white/50">
                        Comunidad Ópalo
                    </h4>
                    <p className="text-xs text-artisan-paper/60 mb-4 font-light">
                        Seguinos para ver los procesos de fabricación en directo.
                    </p>
                    <div className="flex gap-3">
                        <a
                            href="https://www.instagram.com/romina.meitre/"
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 bg-white/5 rounded-xl hover:bg-artisan-leaf hover:text-white transition-all text-artisan-paper/80"
                        >
                            <FontAwesomeIcon icon={faInstagram} className="w-4 h-4 block" />
                        </a>
                        <a
                            href="https://www.facebook.com/romina.meitre.7"
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 bg-white/5 rounded-xl hover:bg-artisan-leaf hover:text-white transition-all text-artisan-paper/80"
                        >
                            <FontAwesomeIcon icon={faFacebook} className="w-4 h-4 block" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright.- */}
            <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-artisan-paper/40 font-medium">
                <p>© {currentYear} Ópalo Creaciones. Todos los derechos reservados.</p>
                <p className="font-light">Diseño de Autor Argentino</p>
            </div>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </footer>
    );
};