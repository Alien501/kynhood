import { Input } from "../ui/input";
import { MenuIcon, SearchIcon } from "./icon";

const Topbar = () => {
    return(
        <header className="flex justify-evenly items-center h-20 fixed left-0 top-0 right-0 bg-white">
            <div className="w-[80%]">
                <div className="bg-slate-200 flex items-center space-x-1 rounded-lg">
                    <Input placeholder="Search news" className="font-semibold bg-transparent outline-none border-none active:border-none focus:border-none active:outline-none focus:outline-none" />
                    <span className="w-[50px] h-[50px] flex items-center justify-center">
                        <SearchIcon />
                    </span>
                </div>
            </div>
            <div>
                <button>
                    <MenuIcon />
                </button>
            </div>
        </header>
    )
}

export default Topbar;