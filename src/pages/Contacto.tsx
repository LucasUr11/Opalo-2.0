import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { MessageCircle, ShoppingBag, Mail, MapPin, ArrowUpRight, Clock } from "lucide-react";

export const Contacto = () => {

    const phoneNumber = "543537333758";

    const abrirWhatsApp = (mensaje: string) => {
        const encodedMessage = encodeURIComponent(mensaje);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <section 
            id="contacto"
            className="min-h-screen bg-artisan-paper/30 pt-32 pb-20 px-4 sm:px-6"
        >
            <div className="max-w-4xl mx-auto">

                {/* Encabezado Principal */}
                <div className="text-center mb-16">
                    <span className="text-artisan-leaf font-bold uppercase tracking-widest text-xs block mb-3 animate-pulse">
                        Contacto Directo
                    </span>
                    <h1
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        className="text-4xl sm:text-5xl text-artisan-brown font-light"
                    >
                        Atelier Abierto
                    </h1>
                    <p className="text-artisan-brown/60 text-sm sm:text-base font-light mt-4 max-w-md mx-auto leading-relaxed">
                        ¿Tenés alguna duda o querés incorporar nuestras piezas en tu espacio? Elegí el canal que mejor se adapte a lo que buscás.
                    </p>
                    <div className="w-12 h-0.5 bg-artisan-brown/20 mx-auto mt-6" />
                </div>

                {/* Grilla con las Opciones de Canales */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

                    {/* Canal 1: Dudas Generales / Soporte */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="bg-white p-8 sm:p-10 rounded-3xl border border-artisan-brown/5 shadow-md flex flex-col justify-between group"
                    >
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-artisan-leaf/10 flex items-center justify-center text-artisan-leaf mb-6">
                                <MessageCircle className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif text-2xl text-artisan-brown font-light mb-3">
                                Consultas y Envíos
                            </h3>
                            <p className="text-artisan-brown/70 text-sm font-light leading-relaxed mb-8">
                                ¿Querés saber sobre stock disponible, tiempos de entrega a tu provincia o cómo cuidar tu mate de madera? Hablemos de forma directa.
                            </p>
                        </div>

                        <button
                            onClick={() => abrirWhatsApp("👋 ¡Hola Lucas! Estaba viendo la web de Ópalo y quería sacarme una duda sobre los productos...")}
                            className="w-full py-4 bg-artisan-brown text-artisan-paper rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-artisan-leaf hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm group-hover:shadow-md"
                        >
                            Chatear con Soporte <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </motion.div>

                    {/* Canal 2: Ventas Mayoristas / Corporativos */}
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="bg-white p-8 sm:p-10 rounded-3xl border border-artisan-brown/5 shadow-md flex flex-col justify-between group"
                    >
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-artisan-blue/10 flex items-center justify-center text-artisan-blue mb-6">
                                <ShoppingBag className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif text-2xl text-artisan-brown font-light mb-3">
                                Ventas Mayoristas
                            </h3>
                            <p className="text-artisan-brown/70 text-sm font-light leading-relaxed mb-8">
                                Si formas parte de una institución, tenes un local comercial o querés hacer regalos empresariales con la impronta artesanal de Ópalo, armemos una propuesta.
                            </p>
                        </div>

                        <button
                            onClick={() => abrirWhatsApp("💼 ¡Hola Lucas! Me comunico desde la web porque me interesa recibir información y catálogo para compras mayoristas/corporativas.")}
                            className="w-full py-4 bg-transparent text-artisan-brown border border-artisan-brown/30 rounded-xl font-bold text-xs tracking-widest uppercase hover:bg-artisan-brown hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:border-transparent"
                        >
                            Solicitar Catálogo <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </motion.div>

                </div>

                {/* Fila Inferior: Información Fija de Transparencia */}
                <div className="bg-white/60 backdrop-blur-sm rounded-3xl border border-artisan-brown/5 p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left items-center">

                    {/* Ubicación */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-artisan-brown/80 font-light">
                        <div className="p-2.5 bg-artisan-paper/80 rounded-xl text-artisan-leaf">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-artisan-brown/40">Origen</p>
                            <p className="font-medium text-xs sm:text-sm">Villa María, Cba.</p>
                        </div>
                    </div>

                    {/* Tiempos de Respuesta */}
                    <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-artisan-brown/80 font-light border-y sm:border-y-0 sm:border-x border-artisan-brown/10 py-4 sm:py-0 sm:px-6">
                        <div className="p-2.5 bg-artisan-paper/80 rounded-xl text-artisan-leaf">
                            <Clock className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold tracking-widest text-artisan-brown/40">Respuesta</p>
                            <p className="font-medium text-xs sm:text-sm">Por lo general, al instante</p>
                        </div>
                    </div>

                    {/* Respaldo por Mail y Redes */}
                    <div className="flex flex-col items-center sm:items-end justify-center h-full">
                        <a
                            href="mailto:rominapaolameitre@gmail.com"
                            className="text-xs font-medium text-artisan-brown/60 hover:text-artisan-leaf transition-colors flex items-center gap-2 mb-3 break-all"
                        >
                            <Mail className="w-3.5 h-3.5" /> rominapaolameitre@gmail.com
                        </a>
                        <div className="flex gap-2">
                            <a
                                href="https://www.instagram.com/romina.meitre/"
                                target="_blank"
                                rel="noreferrer"
                                className="w-8 h-8 rounded-lg bg-artisan-brown/5 text-artisan-brown/70 flex items-center justify-center hover:bg-artisan-leaf hover:text-white transition-all text-xs"
                            >
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a
                                href="https://www.facebook.com/romina.meitre.7"
                                target="_blank"
                                rel="noreferrer"
                                className="w-8 h-8 rounded-lg bg-artisan-brown/5 text-artisan-brown/70 flex items-center justify-center hover:bg-artisan-leaf hover:text-white transition-all text-xs"
                            >
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}