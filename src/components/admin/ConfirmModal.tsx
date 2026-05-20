import { AlertTriangle } from "lucide-react";

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) => {
    // No se renderiza.-
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Fondo oscuro desenfocado */}
            <div
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                onClick={onCancel} // Para cerrar el modal al hacer click afuera.-
            />

            {/*  Modal.- */}
            <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-artisan-brown/10 shadow-xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-start gap-4">
                    <div className="bg-red-50 text-red-500 p-3 rounded-2xl">
                        <AlertTriangle className="w-6 h-6" />
                    </div>

                    <div>
                        <h3 className="font-serif text-xl text-artisan-brown font-medium mb-2">
                            {title}
                        </h3>
                        <p className="text-sm text-artisan-brown/70 leading-relaxed">
                            {message}
                        </p>
                    </div>
                </div>

                {/* Botones.- */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onCancel}
                        className="px-5 py-2.5 rounded-xl border border-artisan-brown/20 text-artisan-brown/80 font-bold text-xs uppercase tracking-widest hover:bg-artisan-paper/30 transition-all cursor-pointer"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-bold text-xs uppercase tracking-widest hover:bg-red-600 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                        Eliminar Permanentemente
                    </button>
                </div>
            </div>
        </div>
    );
};