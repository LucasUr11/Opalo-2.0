import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { MapPin, Mail, Leaf } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-artisan-brown text-artisan-paper pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-artisan-paper/10 pb-12">

                {/* Marca y Propósito */}
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <Leaf className="text-artisan-leaf w-6 h-6" />
                        <span className="font-serif text-2xl font-bold tracking-tight">Ópalo Creaciones</span>
                    </div>
                    <p className="text-artisan-paper/60 text-sm leading-relaxed">
                        Llevando la tradición argentina a otro nivel con piezas únicas hechas a mano por el Lic. Lucas Urquiza.
                    </p>
                </div>

                {/* Enlaces Rápidos */}
                <div>
                    <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em]">Navegación</h4>
                    <ul className="space-y-4 text-sm text-artisan-paper/60">
                        <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Productos</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Personalizados</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Galería de Arte</a></li>
                    </ul>
                </div>

                {/* Contacto.- */}
                <div>
                    <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em]">Contacto</h4>
                    <ul className="space-y-4 text-sm text-artisan-paper/60">
                        <li className="flex items-center gap-3">
                            <MapPin className="w-4 h-4 text-artisan-leaf" />
                            <span>Buenos Aires, Argentina</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-artisan-leaf" />
                            <span>lucasestudios2021@gmail.com</span>
                        </li>
                    </ul>
                </div>

                {/* Redes Sociales */}
                <div>
                    <h4 className="font-bold mb-6 uppercase text-xs tracking-[0.2em]">Seguinos</h4>
                    <div className="flex gap-4">
                        <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                            <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors">
                            <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-artisan-paper/40">
                <p>© {currentYear} Ópalo Creaciones - Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};