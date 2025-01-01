import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

// TODO:
// 1. Check jwt with backend - Need to write backend route
// 2. Change alert to toast

const ProtectedRoute = ({ children }: { children: React.JSX.Element }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const data = localStorage.getItem('token');
        if(!data){
            alert("Login to access this!")
            navigate('/landing');
        }
    }, []);

    return(
        <>
            {children}
        </>
    )
}

export default ProtectedRoute;