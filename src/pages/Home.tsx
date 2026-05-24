import { Hero } from "../components/home/Hero";
import { BrandStory } from "../components/home/BrandStory";
import { HomeCategories } from "../components/home/HomeCategories";
import { FeaturedProducts } from "../components/home/FeaturedProducts";

export const Home = () => {
    return (
        <>
            <Hero />
            <HomeCategories />
            <FeaturedProducts />
            <BrandStory />
        </>
    );
}