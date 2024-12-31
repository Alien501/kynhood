import BottomNavbar from "@/components/custom/BottomNavbar"
import Topbar from "@/components/custom/Topbar"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
    return (
        <>
            <Topbar />
            <main className='h-screen mt-20 font-satoshi'>
                <Outlet />
            </main>
            <BottomNavbar />
        </>
    )
}

export default AppLayout;