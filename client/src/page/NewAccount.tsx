import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from 'lucide-react'
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import axios from "axios";
import { useNavigate } from 'react-router-dom'

type Category = {
  id: string
  name: string
}

// For now some locations from chennai has been added for testing
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

const categories: Category[] = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Sports' },
  { id: '3', name: 'Politics' },
  { id: '4', name: 'Entertainment' },
  { id: '5', name: 'Science' },
]

const NewAccountPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const navigate = useNavigate();

  const handleAddLocation = (locationId: string) => {
    const location = chennaiLocations.find(loc => loc.id === locationId)
    if (location && !selectedLocations.includes(locationId)) {
      setSelectedLocations([...selectedLocations, locationId])
    }
  }

  const handleRemoveLocation = (locationId: string) => {
    setSelectedLocations(selectedLocations.filter(id => id !== locationId))
  }

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(current =>
      current.includes(categoryId)
        ? current.filter(id => id !== categoryId)
        : [...current, categoryId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const data = {
      name,
      email,
      password,
      location: selectedLocations.map(id => 
        chennaiLocations.find(loc => loc.id === id)?.name
      ),
      interests: selectedCategories.map(id => categories.map(cat => cat.id == id)?.name ),
    }
    try {
      const res = await axios.post('http://localhost:3000/api/v1/users', {
        ...data
      })

      if(res.status === 200) {
        const d = res.data();
        navigate('/');
      }
    } catch(e) {
      console.error(e);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <Card className="w-full max-w-md border-2 border-black">
        <CardHeader className="space-y-1 border-b border-black">
          <CardTitle className="text-2xl font-bold">
            Create New Account
          </CardTitle>
          <p className="text-sm text-gray-600">Fill in your details below</p>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border-2 border-black focus:ring-2 focus:ring-black"
                placeholder="Enter your name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-2 border-black focus:ring-2 focus:ring-black"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-2 border-black focus:ring-2 focus:ring-black"
                placeholder="Create a secure password"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Select Locations</Label>
              <Select onValueChange={handleAddLocation}>
                <SelectTrigger className="border-2 border-black focus:ring-2 focus:ring-black">
                  <SelectValue placeholder="Choose a location" />
                </SelectTrigger>
                <SelectContent>
                  {chennaiLocations.map((location) => (
                    <SelectItem 
                      key={location.id} 
                      value={location.id}
                      disabled={selectedLocations.includes(location.id)}
                    >
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedLocations.length > 0 && (
                <div className="mt-2 space-y-2">
                  {selectedLocations.map((locationId) => {
                    const location = chennaiLocations.find(loc => loc.id === locationId)
                    return (
                      <div key={locationId} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
                        <span>{location?.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveLocation(locationId)}
                          className="hover:bg-gray-200"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Interests</Label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category.id}`}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleCategoryToggle(category.id)}
                      className="border-2 border-black data-[state=checked]:bg-black data-[state=checked]:border-black"
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="text-sm cursor-pointer"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default NewAccountPage