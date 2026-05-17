import { useState } from "react";
import { Hero } from "../components/home/Hero";
import { Categories } from "../components/home/Categories";
import { ProductGrid } from "../components/products/ProductGrid";
import { BrandStory } from "../components/home/BrandStory";

export const Home = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    return (
        <>
            <Hero />
            <Categories 
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />
            <ProductGrid category={activeCategory}  />
            <BrandStory />
        </>
    );
}