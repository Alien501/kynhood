"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bookmark, Share2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const ReadPage = () => {
    const navigate = useNavigate();

    const onBackButtonClicked = () => {
        navigate(-1);
    }

    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    return (
        <div className="min-h-screen relative bg-background">
            <div className="fixed z-30 left-0 top-0 right-0 h-full overflow-hidden">
                <img
                    src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                    alt="Bitcoin cryptocurrency"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/40" />
                <Button
                    onClick={onBackButtonClicked}
                    variant="ghost"
                    size="icon"
                    className="absolute top-4 left-4 text-white"
                >
                    <ArrowLeft className="h-6 w-6" />
                </Button>
            </div>

            <div className="relative z-40 mt-[40vh] bg-black/30 backdrop-blur-sm  text-white rounded-t-3xl min-h-screen max-h-full bg-gradient-to-t from-black to-slate-50/0">
                <div className="px-4 py-6 space-y-6">
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <Badge variant="secondary">Trendy</Badge>
                            <Badge variant="secondary">Crypto</Badge>
                        </div>
                        <h1 className="text-2xl font-bold">
                            Top Cryptocurrency Prices Today: Bitcoin, Binance Coin up; Dogecoin surges 25
                        </h1>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarImage src="/placeholder.svg" alt="Economic Times" />
                                <AvatarFallback>ET</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">Economic Times</p>
                                <span className="text-sm text-muted-foreground">Today, 8:21 AM</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                                <Bookmark className="h-5 w-5" />
                            </Button>
                            <Button variant="ghost" size="icon">
                                <Share2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4 text-white leading-relaxed">
                        <p>
                            Major cryptocurrencies were trading higher on Friday. Eight out of the top 10 digital tokens were trading with solid gains at 8:30 hours IST, led by Dogecoin which gained as much as 25 per cent.
                        </p>
                        <p>
                            Cryptocurrencies are digital or virtual currencies secured by cryptography, making them nearly impossible to counterfeit or double-spend. They are decentralized and operate on blockchain technology, a distributed ledger enforced by a network of computers (nodes).
                        </p>
                        <p>
                            Bitcoin, created by an anonymous entity known as Satoshi Nakamoto in 2009, was the first cryptocurrency and remains the most prominent. Cryptocurrencies enable peer-to-peer transactions without intermediaries like banks or governments, promoting transparency, security, and lower transaction costs.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReadPage