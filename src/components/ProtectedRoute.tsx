import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom"
import { supabase } from "../lib/supabase";
import { Loader2 } from "lucide-react";

export const ProtectedRoute = () => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Se verifica la sesión actual.-
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
            setLoading(false);
        }

        checkAuth();

        const { data: {subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen items-center justify-center bg-artisan-paper">
                <Loader2 className="w-10 h-10 animate-spin text-artisan-leaf" />
            </div>
        )
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}