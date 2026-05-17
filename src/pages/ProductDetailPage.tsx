import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { ProductDetail } from "../components/products/ProductDetail";
import { type Product } from "../types/product";

export const ProductDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (!error && data) {
                setProduct(data as Product)
            }
            setLoading(false);
        };

        if (id) fetchProduct();
    }, [id]);



    if (loading) return <div className="pt-40 text-center">Cargando detalles del mate...</div>;
    if (!product) return <div className="pt-40 text-center">No encontramos ese producto.</div>;

    return <ProductDetail product={product} onBack={() => navigate('/')} />;
}