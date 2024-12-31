import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel"


interface NewsItem {
  id: string
  title: string
  imageUrl: string
  href: string
}

interface NewsCardProps {
  title: string
  imageUrl: string
  href?: string
}

function NewsCard({ title, imageUrl }: NewsCardProps) {
  return (  
    <Card className="h-60 w-[90%] mx-auto bg-black relative rounded-md overflow-hidden hover:cursor-pointer">
        <CardContent className="p-0">
            <div>
                <img className="object-cover h-full w-full absolute" src={imageUrl} alt={title} />
            </div>
            <div className="absolute h-full w-full bg-gradient-to-t from-gray-900 to-slate-50/0"></div>
            <div className="absolute bottom-0 left-0 p-2">
                <p className="text-white text-lg font-medium">{title}</p>
            </div>
        </CardContent>
        <CarouselPrevious />
        <CarouselNext />
    </Card>
  )
}

interface StackedNewsCarouselProps {
  items: NewsItem[]
}

export default function StackedNewsCarousel({ items }: StackedNewsCarouselProps) {
//   const [currentIndex, setCurrentIndex] = React.useState(0)

//   const handlePrevious = () => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
//   }

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
//   }
  return (
    <Carousel
    >
        <CarouselContent>
            {
                items.map(item => (
                    <CarouselItem>
                        <NewsCard title={item.title} imageUrl={item.imageUrl} />
                    </CarouselItem>
                ))
            }
        </CarouselContent>
    </Carousel>
  )
}