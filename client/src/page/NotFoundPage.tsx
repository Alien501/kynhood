import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    // const navigate = useNavigate();
    return(
        <div>
            <h1>404 Not Found</h1>
            <Button className="rounded-md">Home</Button>
        </div>
    )
}

export default NotFoundPage;