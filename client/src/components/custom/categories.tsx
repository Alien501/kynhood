import { useState } from "react";
import { Card } from "../ui/card";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { type CarouselApi } from '@/components/ui/carousel'

const Categories = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [api, setApi] = useState<CarouselApi>();

    const categories = [
        "Covid-19",
        "Crypto",
        "Tech",
        "Sports",
        "Space"
    ];

    const handleCategoryClick = (index: number) => {
        setSelectedIndex(index);
        api?.scrollTo(index);
    };

    return (
        <Carousel
            setApi={setApi}
            opts={{
                loop: true,
                align: "center"
            }}
            className="mt-10"
        >
            <CarouselContent className="w-full">
                {categories.map((category, index) => (
                    <CarouselItem key={category} className="basis-1/3 pl-6">
                        <Card 
                            className={`p-2 text-center font-bold rounded-full transition-colors duration-300 cursor-pointer ${
                                selectedIndex === index 
                                    ? "bg-black text-white" 
                                    : "bg-white text-black hover:bg-gray-100"
                            }`}
                            onClick={() => handleCategoryClick(index)}
                        >
                            {category}
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
        </Carousel>
    );
};

export default Categories;