import { Card, CardContent } from "../ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { LocationIcon, SearchIcon } from "./icon";

const chennaiLocations = [
    { id: '1', name: 'Adyar' },
    { id: '2', name: 'Anna Nagar' },
    { id: '3', name: 'T Nagar' },
    { id: '4', name: 'Velachery' },
    { id: '5', name: 'OMR' },
    { id: '6', name: 'Tambaram' },
    { id: '7', name: 'Porur' },
    { id: '8', name: 'Vadapalani' },
    { id: '9', name: 'Guindy' },
    { id: '10', name: 'Chromepet' },
    { id: '11', name: 'Sholinganallur' },
    { id: '12', name: 'Mylapore' },
    { id: '13', name: 'Thoraipakkam' },
    { id: '14', name: 'Pallavaram' },
    { id: '15', name: 'KK Nagar' },
    { id: '16', name: 'Nungambakkam' },
    { id: '17', name: 'Perungudi' },
    { id: '18', name: 'Egmore' },
    { id: '19', name: 'Royapettah' },
    { id: '20', name: 'Kilpauk' }
  ]

const LocationDialog = () => {
    return(
        <Card className="border-none w-[90%]">
            <CardContent className="w-[90%] space-y-3">
                <h1>Select Location</h1>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Your Location" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            chennaiLocations.map(location => (
                                <SelectItem value={`${location.name}`} id={`${location.id}`}>{location.name}</SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    )
}

const Topbar = () => {
    return(
        <header className="z-50 shadow-sm flex justify-evenly items-center h-20 fixed left-0 top-0 right-0 bg-white backdrop-blur-sm">
            <div className="w-[80%]">
                <div className="bg-slate-200 flex items-center space-x-1 rounded-lg">
                    <Input placeholder="Search news" className="font-semibold bg-transparent outline-none active:ring-0 focus-visible:ring-transparent focus-within:ring-0 border-none active:border-none focus:border-none active:outline-none focus:outline-none" />
                    <span className="w-[50px] h-[50px] flex items-center justify-center">
                        <SearchIcon />
                    </span>
                </div>
            </div>
            <div>
                <Dialog>
                    <DialogTrigger>
                        <button>
                            <LocationIcon />
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <LocationDialog />
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    )
}

export default Topbar;