import { Card, CardContent } from "@/components/ui/card"

interface NewsCardProps {
  title: string
  imageUrl: string
  href?: string
}

export default function NewsCard({ 
  title,
  imageUrl,
}: NewsCardProps) {
  return (
    <Card className="w-full h-full overflow-hidden">
      <button className="block w-full h-full">
        <div className="relative w-full h-full">
          <img
            src={imageUrl}
            alt=""
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
          
          <CardContent className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-lg font-semibold leading-tight text-white md:text-xl">
              {title}
            </h2>
          </CardContent>
        </div>
      </button>
    </Card>
  )
}

