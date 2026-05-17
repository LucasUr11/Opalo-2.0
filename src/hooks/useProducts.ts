import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { type Product } from '../types/product';
import { categories } from '../components/home/Categories';

export const useProducts = (categoryId?: string) => {
    const [products, setProdcuts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                let query = supabase.from('products').select('*');
                
                if (categoryId && categoryId !== 'all') {

                    // Busca la categoría activa en el arreglo de categorías para obtener sus subcategorías.-
                    const activeCategory = categories.find(c => c.id === categoryId);

                    if (activeCategory?.sub && activeCategory.sub.length > 0) {
                        // Si el producto tiene subcategorias, se utiliza el '.in'.-
                        query = query.in('category', activeCategory.sub);
                    } else {
                        // Si no tiene subcategorias, se filtra por la categoría principal.-
                        query = query.eq('category', categoryId);
                    }
                }

                const { data, error: supabaseError } = await query;

                if (supabaseError) throw supabaseError;
                setProdcuts(data as Product[])
            } catch (err: any) {
                setError(err.message)
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    return { products, loading, error };
}