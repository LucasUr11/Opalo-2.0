import { useState } from 'react';
import { motion } from "framer-motion";
import { Send, Sparkles, User, Mail, MessageSquare, Image } from 'lucide-react';

interface PersonalizationData {
    fullName: string;
    email: string;
    productType: string;
    ideaDescription: string;
}

export const Personalizar = () => {
    const [formData, setFormData] = useState<PersonalizationData>({
        fullName: '',
        email: '',
        productType: 'mates', // Lo uso por defecto.-
        ideaDescription: '',
    });

    // Opciones de productos a persolalizar.-
    const productOptions = [
        { id: 'mates', label: 'Mates (Imperial, Torpedo, Madera)' },
        { id: 'bombillas', label: 'Bombillas (Alpaca, Cinceladas)' },
        { id: 'yerberas', label: 'Yerberas / Azucareras' },
        { id: 'cuencos', label: 'Cuencos / Tablas' },
        { id: 'prendas', label: 'Prendas / Indumentaria con Identidad' },
        { id: 'otros', label: 'Otros (Cajas, Regalos Especiales)' }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const phoneNumber = "543537333758";

        const message = `✨ *Nueva Solicitud de Personalización* ✨\n\n` +
            `👤 *Nombre y Apellido:* ${formData.fullName}\n` +
            `📧 *Email:* ${formData.email}\n` +
            `🎁 *Producto a personalizar:* ${formData.productType.toUpperCase()}\n\n` +
            `💡 *Descripción de la idea:* \n"${formData.ideaDescription}"\n\n` +
            `📸 _Nota: Le adjunto las imágenes de referencia a continuación de este mensaje._`;

        const encodedMessage = encodeURIComponent(message);

        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };

    return (
        <section 
            id="personalizar"
            className="min-h-screen bg-artisan-paper/30 pt-32 pb-20 px-4 sm:px-6"
        >
            <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-artisan-brown/5 shadow-xl p-8 sm:p-12 relative overflow-hidden">

                {/* Decoración de fondo sutil */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-artisan-leaf/5 rounded-full blur-2xl -mr-10 -mt-10" />

                {/* Encabezado del Formulario */}
                <div className="text-center mb-10">
                    <span className="text-artisan-leaf font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 mb-2">
                        <Sparkles className="w-3.5 h-3.5" /> Grabados y Diseños de Autor
                    </span>
                    <h1
                        style={{ fontFamily: 'Cormorant Garamond, serif' }}
                        className="text-3xl sm:text-4xl text-artisan-brown font-light"
                    >
                        Crea tu propia pieza única
                    </h1>
                    <div className="w-12 h-0.5 bg-artisan-brown/20 mx-auto mt-3" />
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Nombre y Apellido */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-artisan-brown/60 mb-2 flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-artisan-leaf" /> Nombre y Apellido
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Ej: Juan Pérez"
                            className="w-full px-5 py-3.5 rounded-xl border border-artisan-brown/10 bg-artisan-paper/10 text-artisan-brown placeholder-artisan-brown/30 focus:outline-none focus:border-artisan-leaf focus:bg-white transition-all text-sm"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-artisan-brown/60 mb-2 flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-artisan-leaf" /> Correo Electrónico
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Ej: juan@gmail.com"
                            className="w-full px-5 py-3.5 rounded-xl border border-artisan-brown/10 bg-artisan-paper/10 text-artisan-brown placeholder-artisan-brown/30 focus:outline-none focus:border-artisan-leaf focus:bg-white transition-all text-sm"
                        />
                    </div>

                    {/* Selector de tipo de producto */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-artisan-brown/60 mb-2 flex items-center gap-2">
                            <Image className="w-3.5 h-3.5 text-artisan-leaf" /> ¿Qué producto deseas personalizar?
                        </label>
                        <select
                            name="productType"
                            value={formData.productType}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 rounded-xl border border-artisan-brown/10 bg-artisan-paper/10 text-artisan-brown focus:outline-none focus:border-artisan-leaf focus:bg-white transition-all text-sm appearance-none cursor-pointer"
                        >
                            {productOptions.map(opt => (
                                <option key={opt.id} value={opt.id}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Textarea para la descripción de la idea */}
                    <div>
                        <label className="text-xs font-bold uppercase tracking-widest text-artisan-brown/60 mb-2 flex items-center gap-2">
                            <MessageSquare className="w-3.5 h-3.5 text-artisan-leaf" /> Contanos tu idea
                        </label>
                        <textarea
                            name="ideaDescription"
                            required
                            rows={5}
                            value={formData.ideaDescription}
                            onChange={handleChange}
                            placeholder="Describí detalladamente qué te gustaría grabar, tipografía, frases o el diseño que imaginás para tu pieza..."
                            className="w-full px-5 py-3.5 rounded-xl border border-artisan-brown/10 bg-artisan-paper/10 text-artisan-brown placeholder-artisan-brown/30 focus:outline-none focus:border-artisan-leaf focus:bg-white transition-all text-sm resize-none leading-relaxed"
                        />
                    </div>

                    {/* Aviso informativo sobre las imágenes */}
                    <div className="p-4 bg-artisan-sand/40 border border-artisan-brown/5 rounded-2xl text-xs text-artisan-brown/70 leading-relaxed">
                        💡 *Importante:* Al presionar enviar, se abrirá tu WhatsApp para enviarme los datos estructurados. Recordá adjuntarme por ese mismo chat las fotos o bocetos de referencia que tengas guardados en tu dispositivo.
                    </div>

                    {/* Botón de envío */}
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        type="submit"
                        className="w-full py-4 bg-artisan-brown text-artisan-paper rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-artisan-brown/90 transition-all shadow-md flex items-center justify-center gap-3 cursor-pointer mt-2"
                    >
                        <Send className="w-4 h-4" />
                        Enviar propuesta por WhatsApp
                    </motion.button>

                </form>
            </div>
        </section>
    )
}