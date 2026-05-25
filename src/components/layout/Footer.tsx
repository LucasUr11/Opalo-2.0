import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { MapPin, Mail, Phone } from 'lucide-react';

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="bg-artisan-brown text-artisan-paper pt-18 pb-6 border-t border-artisan-brown/10">
            <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center">

                {/* Logo.- */}
                <a href="/">
                    <div className="w-17 h-17 rounded-full border border-artisan-paper/20 flex items-center justify-center mb-8 bg-white/5">
                        <img
                            src="/logo-artisan.png"
                            alt="Logo"
                            className='w-full h-full pt-3 object-cover'
                        />
                    </div>
                </a>

                {/* Gran Manifiesto de Autor */}
                <div className="max-w-3xl mb-12">
                    <h3
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide text-white leading-tight mb-6"
                    >
                        Piezas únicas con identidad y tradición argentina.
                    </h3>
                    <p className="text-artisan-paper/60 text-base sm:text-lg font-light max-w-xl mx-auto leading-relaxed">
                        Cada artículo de Ópalo es diseñado a mano por la Lic. Romina Meitre.
                    </p>
                </div>

                {/* Bloque de Contacto Directo e Interactivo */}
                <div className="w-full border-t border-b border-artisan-paper/10 py-8 my-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-sm font-light text-artisan-paper/80">

                    {/* Ubicación */}
                    <div className="flex items-center justify-center gap-2 hover:text-white transition-colors">
                        <MapPin className="w-4 h-4 text-artisan-leaf shrink-0" />
                        <span>Villa María, Córdoba, Argentina</span>
                    </div>

                    {/* Redes Sociales Estilizadas */}
                    <div className="flex justify-center gap-4 order-last md:order-0">
                        <a
                            href="https://www.instagram.com/romina.meitre/"
                            target="_blank"
                            rel="noreferrer"
                            className="w-10 h-10 rounded-full border border-artisan-paper/10 flex items-center justify-center hover:bg-artisan-leaf hover:text-white hover:border-transparent transition-all text-artisan-paper/70"
                        >
                            <FontAwesomeIcon icon={faInstagram} className="w-4 h-4" />
                        </a>
                        <a
                            href="https://www.facebook.com/romina.meitre.7"
                            target="_blank"
                            rel="noreferrer"
                            className="w-10 h-10 rounded-full border border-artisan-paper/10 flex items-center justify-center hover:bg-artisan-leaf hover:text-white hover:border-transparent transition-all text-artisan-paper/70"
                        >
                            <FontAwesomeIcon icon={faFacebook} className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Vías de Comunicación */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 text-xs uppercase tracking-widest font-medium">
                        <a href="mailto:rominapaolameitre@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-artisan-leaf" /> Esbribinos
                        </a>
                        <a href="https://wa.me/5493537333758" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-artisan-leaf" /> WhatsApp
                        </a>
                    </div>

                </div>

                {/* Créditos y Cierre Final */}
                <div className="w-full mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-artisan-paper/40 font-medium">
                    <p>© {currentYear} Ópalo Creaciones. Todos los derechos reservados.</p>
                    <p className="font-serif italic lowercase tracking-normal text-sm text-artisan-paper/30">
                        diseño de autor argentino
                    </p>
                </div>

            </div>
        </footer>
    );
};