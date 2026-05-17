
export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    images: string[];
    description: string;
    featured: boolean;
    stock: number;
    customizable: boolean;
}