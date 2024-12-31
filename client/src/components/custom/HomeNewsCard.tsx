import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../ui/card";

interface HomeNewsCardProps {
    title: string;
    imageUrl: string;
    minutes: number;
    time: string;
}

const HomeNewsCard = ({title, imageUrl, minutes, time}: HomeNewsCardProps) => {
    const navigate = useNavigate();

    const onCardClick = () => {
        navigate('/read');
    }

    return(
        <Card onClick={onCardClick} className="p-1 rounded-xl m-4 border border-black/20 hover:shadow-2xl transition-all duration-300 h-[140px] select-none">
            <CardContent className="grid grid-cols-[100px_100%] w-full p-2 h-full">
                <div className="h-[110px] rounded-xl overflow-hidden">
                    <img src={imageUrl} alt="Image" className="block h-full w-full object-cover" />
                </div>
                <div className="w-[75%] p-3 flex flex-col justify-between">
                    <div className="font-bold pr-2" >
                        <p className="text-sm">{title}</p>
                    </div>
                    <div className="flex text-xs justify-between font-medium text-black/50 p-1 w-[90%]">
                        <span>{minutes} mins read</span>
                        <span>{time}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default HomeNewsCard;