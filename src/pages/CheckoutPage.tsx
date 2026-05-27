import React, { useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { useNavigate } from "react-router-dom";
import { MapPin, User, MessageCircle } from "lucide-react";

export const CheckoutPage = () => {
    const { cart, getTotalPrice, clearCart } = useCartStore();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        localidad: '',
        direccion: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleWhatsAppLink = () => {
        const telefono = "5493537333758"

        // Mensaje detallado para enviar por WhatsApp.-
        const mensajeProductos = cart.map(item =>
            `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString('es-AR')})`
        ).join('%0A');

        const mensaje = `¡Hola! Soy *${formData.nombre} ${formData.apellido}*.%0A%0A` +
            `Quiero realizar el siguiente pedido:%0A${mensajeProductos}%0A%0A` +
            `*Total: $${getTotalPrice().toLocaleString('es-AR')}*%0A%0A` +
            `*Datos de envío:*%0A` +
            `- Localidad: ${formData.localidad}%0A` +
            `- Dirección: ${formData.direccion}`;

        window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');

        clearCart();
        navigate('/');
    }

    if (cart.length === 0) {
        return (
            <div className="pt-40 text-center">
                <h2 className="text-2xl font-serif text-artisan-brown">Tu carrito esta vacio.</h2>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 text-artisan-leaf underline">Volver a ver mates
                </button>
            </div>
        )
    }

    return (
        <section className="pt-24 pb-16 bg-artisan-paper/30 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Formulario.- */}
                <div className="space-y-8">
                    <h1 className="font-serif text-3xl text-artisan-brown"> Finalizar Pedido</h1>

                    <form className="space-y-6">

                        {/* Datos de Contacto.- */}
                        <div className="bg-white p-6 rounded-2xl border border-artisan-brown/10 shadow-sm">
                            <h3 className="flex items-center gap-2 font-bold text-artisan-brown mb-4 uppercase text-xs tracking-widest">
                                <User className="w-4 h-4" /> Datos de Contacto
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Nombre"
                                        className="p-3 rounded-xl border border-artisan-brown/10 focus:ring-2 focus:ring-artisan-leaf outline-none"
                                    />
                                    <input
                                        name="apellido"
                                        value={formData.apellido}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Apellido"
                                        className="p-3 rounded-xl border border-artisan-brown/10 focus:ring-2 focus:ring-artisan-leaf outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Datos de Entrega.- */}
                        <div className="bg-white p-6 rounded-2xl border border-artisan-brown/10 shadow-sm">
                            <h3 className="flex items-center gap-2 font-bold text-artisan-brown mb-4 uppercase text-xs tracking-widest">
                                <MapPin className="w-4 h-4" /> Entrega
                            </h3>
                            <div className="space-y-4">
                                <input 
                                    name="localidad" 
                                    value={formData.localidad} 
                                    onChange={handleChange} 
                                    type="text" 
                                    placeholder="Ciudad / Localidad" 
                                    className="w-full p-3 rounded-xl border border-artisan-brown/10 focus:ring-2 focus:ring-artisan-leaf outline-none" 
                                />
                                <input 
                                    name="direccion" 
                                    value={formData.direccion} 
                                    onChange={handleChange} 
                                    type="text" 
                                    placeholder="Dirección (Calle y Altura)" className="w-full p-3 rounded-xl border border-artisan-brown/10 focus:ring-2 focus:ring-artisan-leaf outline-none" 
                                />
                            </div>
                        </div>
                    </form>
                </div>

                {/* Resumen y Botón de WhatsApp.- */}
                <div className="lg:sticky lg:top-24 h-fit">
                    <div className="bg-artisan-brown text-artisan-paper p-8 rounded-3xl shadow-xl">
                        <h3 className="font-serif text-2xl mb-6">Resumen del Pedido</h3>
                        <div className="space-y-4 mb-8">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between items-center text-sm"
                                >
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>${(item.price * item.quantity).toLocaleString('es-AR')}</span>
                                </div>
                            ))}
                            <div className="pt-4 border-t border-artisan-paper/20 flex justify-between items-center font-bold text-xl">
                                <span>Total</span>
                                <span>${getTotalPrice().toLocaleString('es-AR')}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleWhatsAppLink}
                            disabled={!formData.nombre || !formData.direccion}
                            className="w-full py-4 bg-artisan-leaf text-white rounded-xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-transform">
                            <MessageCircle className="w-6 h-6" />
                            Confirmar por WhatsApp
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}