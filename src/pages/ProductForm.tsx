import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import {
  ArrowLeft,
  Save,
  Loader2,
  Upload,
  X,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { type Product } from '../types/product';

// Definimos las categorías basadas en Categories.tsx
const CATEGORIES = [
  { id: 'mates', label: 'Mates', subs: ['mates_torpedo', 'mates_imperiales', 'mates_madera', 'mates_camionero', 'mates_criollo', 'mates_rancheros'] },
  { id: 'bombillas', label: 'Bombillas', subs: ['bombillas'] },
  { id: 'yerberas', label: 'Yerberas', subs: ['yerberas_azucareras'] },
  { id: 'cuencos', label: 'Cuencos', subs: ['cuencos_tablas'] },
  { id: 'otros', label: 'Otros', subs: ['cajas', 'cuadros'] },
];

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [isLoading, setIsLoading] = useState(isEdit);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<Product>>({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    category: 'mates',
    featured: false,
    customizable: false,
    images: []
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (isEdit && id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      if (data) {
        setForm(data);
        setPreviews(data.images || []);
      }
    } catch (err: any) {
      setError('No se pudo cargar el producto');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setForm(prev => ({
      ...prev,
      [name]: (name === 'price' || name === 'stock') ? Number(val) : val
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...files]);

      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removePreview = (index: number) => {
    if (form.images && index < form.images.length) {
      const updatedImages = form.images.filter((_, i) => i !== index);
      setForm(prev => ({ ...prev, images: updatedImages }));
      setPreviews(prev => prev.filter((_, i) => i !== index));
    } else {
      const relativeIndex = index - (form.images?.length || 0);
      setSelectedFiles(prev => prev.filter((_, i) => i !== relativeIndex));
      setPreviews(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      let finalImages = [...(form.images || [])];

      if (selectedFiles.length > 0) {
        for (const file of selectedFiles) {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data } = supabase.storage
            .from('products')
            .getPublicUrl(filePath);

          finalImages.push(data.publicUrl);
        }
      }

      const productData = {
        ...form,
        images: finalImages,
      };

      if (isEdit) {
        const { error: updateError } = await supabase
          .from('products')
          .update(productData)
          .eq('id', id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('products')
          .insert([productData]);
        if (insertError) throw insertError;
      }

      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Error al guardar el producto');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-artisan-paper">
        <Loader2 className="w-12 h-12 animate-spin text-artisan-leaf" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-artisan-paper/30 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center gap-2 text-artisan-brown hover:text-artisan-leaf transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Panel
          </button>
          <h1 className="font-serif text-3xl text-artisan-brown">
            {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
          </h1>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-artisan-brown/10">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-artisan-brown/60 mb-2">Nombre del Producto</label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleInputChange}
                    className="w-full p-4 rounded-xl border border-artisan-brown/10 focus:ring-2 focus:ring-artisan-leaf outline-none transition-all"
                    placeholder="Ej: Mate Imperial de Cuero"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-artisan-brown/60 mb-2">Descripción</label>
                  <textarea
                    required
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-4 rounded-xl border border-artisan-brown/10 focus:ring-2 focus:ring-artisan-leaf outline-none transition-all resize-none"
                    placeholder="Detalles del producto, materiales, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-artisan-brown/60 mb-2">Categoría</label>
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-xl border border-artisan-brown/10 focus:ring-2 focus:ring-artisan-leaf outline-none bg-white"
                    >
                      {CATEGORIES.map(cat => (
                        <optgroup key={cat.id} label={cat.label}>
                          {cat.subs?.map(sub => (
                            <option key={sub} value={sub}>{sub.replace('_', ' ').toUpperCase()}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-artisan-brown/60 mb-2">Stock Disponible</label>
                    <input
                      required
                      type="number"
                      name="stock"
                      value={form.stock}
                      onChange={handleInputChange}
                      className="w-full p-4 rounded-xl border border-artisan-brown/10 focus:ring-2 focus:ring-artisan-leaf outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-artisan-brown/10">
              <label className="block text-xs font-bold uppercase tracking-widest text-artisan-brown/60 mb-4">Imágenes del Producto</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-4">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-artisan-brown/10">
                    <img src={src} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePreview(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <label className="aspect-square rounded-xl border-2 border-dashed border-artisan-brown/20 flex flex-col items-center justify-center cursor-pointer hover:border-artisan-leaf hover:bg-artisan-leaf/5 transition-all">
                  <Upload className="w-6 h-6 text-artisan-brown/40" />
                  <span className="text-[10px] uppercase font-bold text-artisan-brown/40 mt-2">Subir</span>
                  <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>
              </div>
              <p className="text-[11px] text-artisan-brown/50">Se recomienda imágenes cuadradas de 800x800px.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-artisan-brown p-8 rounded-3xl shadow-xl text-artisan-paper">
              <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-2">Precio de Venta</label>
              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-serif text-artisan-paper">$</span>
                <input
                  required
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 p-4 pl-10 rounded-xl text-3xl font-serif text-white focus:ring-2 focus:ring-artisan-leaf outline-none transition-all"
                />
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${form.featured ? 'bg-artisan-leaf border-artisan-leaf' : 'border-white/20 group-hover:border-white/40'}`}>
                    {form.featured && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="hidden"
                  />
                  <span className="text-sm font-medium">Producto Destacado</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${form.customizable ? 'bg-artisan-leaf border-artisan-leaf' : 'border-white/20 group-hover:border-white/40'}`}>
                    {form.customizable && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <input
                    type="checkbox"
                    name="customizable"
                    checked={form.customizable}
                    onChange={(e) => setForm({ ...form, customizable: e.target.checked })}
                    className="hidden"
                  />
                  <span className="text-sm font-medium">Es Personalizable</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="w-full mt-8 py-4 bg-artisan-leaf hover:bg-green-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {isEdit ? 'Guardar Cambios' : 'Publicar Producto'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
