import PageHeader from "@/components/custom/PageHeader";
import StackedNewsCarousel from "@/components/custom/stacked-news-caurosel";
import Categories from "@/components/custom/categories";
import HomeNewsCard from "@/components/custom/HomeNewsCard";
import CouldntFind from "@/components/custom/CouldntFind";

const newsItems = [
    {
        id: "1",
        title: "Covid-19: ICMR studying vaccine effect on Delta plus, result likely soon",
        imageUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        href: "#"
    },
    {
        id: "2",
        title: "New research shows promising results in cancer treatment",
        imageUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        href: "#"
    },
    {
        id: "3",
        title: "Climate change: Global temperatures hit new record high",
        imageUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        href: "#"
    },
    {
        id: "4",
        title: "Space exploration: New discoveries on Mars surface",
        imageUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        href: "#"
    },
    {
        id: "5",
        title: "Technology: AI breakthroughs in medical diagnosis",
        imageUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        href: "#"
    },
    {
        id: "1",
        title: "Covid-19: ICMR studying vaccine effect on Delta plus, result likely soon",
        imageUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        href: "#"
    },
    {
        id: "2",
        title: "New research shows promising results in cancer treatment",
        imageUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        href: "#"
    },
    {
        id: "3",
        title: "Climate change: Global temperatures hit new record high",
        imageUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        href: "#"
    },
    {
        id: "4",
        title: "Space exploration: New discoveries on Mars surface",
        imageUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        href: "#"
    },
    {
        id: "5",
        title: "Technology: AI breakthroughs in medical diagnosis",
        imageUrl: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        href: "#"
    }
]

const HomePage = () => {
    return (
        <>
            <PageHeader
                title="Good Morning"
                subtitle="Stay updated with the latest news"
            />
            <StackedNewsCarousel items={newsItems} />
            <Categories />
            {
                newsItems.length == 0?
                <CouldntFind />
                :
                newsItems.map(newsitem => (
                    <HomeNewsCard
                        title={newsitem.title}
                        minutes={10}
                        imageUrl={newsitem.imageUrl}
                        time='Today'
                    />
                ))
            }
            <br /><br /><br />
        </>
    )
};

export default HomePage;