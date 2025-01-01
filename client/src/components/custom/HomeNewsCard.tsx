'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bookmark, Trash2, TrendingUp } from 'lucide-react'
import { useNavigate } from "react-router-dom"

interface HomeNewsCardProps {
    title: string
    imageUrl: string
    minutes: number
    time: string
    variant?: 'normal' | 'trending' | 'bookmark'
    onDelete?: () => void
}

const HomeNewsCard = ({ title, imageUrl, minutes, time, variant = 'normal', onDelete }: HomeNewsCardProps) => {
    const navigate = useNavigate()

    const onCardClick = () => {
        navigate('/read')
    }

    const renderNormalCard = () => (
        <Card onClick={onCardClick} className="p-1 rounded-xl m-4 border border-black/20 hover:shadow-2xl transition-all duration-300 h-[140px] select-none cursor-pointer">
            <CardContent className="grid grid-cols-[100px_1fr] w-full p-2 h-full">
                <div className="h-[110px] rounded-xl overflow-hidden">
                    <img src={imageUrl} alt="Image" className="block h-full w-full object-cover" />
                </div>
                <div className="w-full p-3 flex flex-col justify-between">
                    <div className="font-bold pr-2">
                        <p className="text-sm">{title}</p>
                    </div>
                    <div className="flex text-xs justify-between font-medium text-black/50 p-1 w-full">
                        <span>{minutes} mins read</span>
                        <span>{time}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    const renderTrendingCard = () => (
        <Card onClick={onCardClick} className="p-1 rounded-xl m-4 border border-black/20 hover:shadow-2xl transition-all duration-300 h-[160px] select-none cursor-pointer">
            <CardContent className="grid grid-cols-[120px_1fr] w-full p-2 h-full">
                <div className="h-[130px] rounded-xl overflow-hidden relative">
                    <img src={imageUrl} alt="Image" className="block h-full w-full object-cover" />
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                    </div>
                </div>
                <div className="w-full p-3 flex flex-col justify-between">
                    <div className="font-bold pr-2">
                        <p className="text-sm">{title}</p>
                    </div>
                    <div className="flex text-xs justify-between font-medium text-black/50 p-1 w-full">
                        <span>{minutes} mins read</span>
                        <span>{time}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    const renderBookmarkCard = () => (
        <Card onClick={onCardClick} className="p-1 rounded-xl m-4 border border-black/20 hover:shadow-2xl transition-all duration-300 h-[160px] select-none">
            <CardContent className="grid grid-cols-[120px_1fr] w-full p-2 h-full">
                <div className="h-[130px] rounded-xl overflow-hidden relative">
                    <img src={imageUrl} alt="Image" className="block h-full w-full object-cover" />
                    <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs flex items-center">
                        <Bookmark className="w-3 h-3 mr-1" />
                        Bookmarked
                    </div>
                </div>
                <div className="w-full p-3 flex flex-col justify-between">
                    <div className="font-bold pr-2">
                        <p className="text-sm">{title}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex text-xs font-medium text-black/50 p-1">
                            <span>{minutes} mins read</span>
                            <span className="mx-2">•</span>
                            <span>{time}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation()
                                onDelete?.()
                            }}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 className="w-4 h-4" />
                            <span className="sr-only">Delete bookmark</span>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    switch (variant) {
        case 'trending':
            return renderTrendingCard()
        case 'bookmark':
            return renderBookmarkCard()
        default:
            return renderNormalCard()
    }
}

export default HomeNewsCard

