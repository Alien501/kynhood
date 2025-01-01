import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast'
interface User {
  id: string
  email: string
  name: string
  location: string[]
  interests: string[]
  createdAt: Date
  updatedAt: Date
}

const mockUser: User = {
  id: '1',
  email: 'kumar@gmail.com',
  name: 'Kumar',
  location: ['Chennai', 'India'],
  interests: ['Sports', 'Politics', 'Entertainment'],
  createdAt: new Date('2023-01-01'),
  updatedAt: new Date('2023-06-01')
}

export default function ProfilePage() {
  const [user, setUser] = useState<User>(mockUser)
  const toast = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'location' | 'interests') => {
    const values = e.target.value.split(',').map(item => item.trim())
    setUser(prev => ({ ...prev, [field]: values }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Updated user:', user)
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
      status: "success",
    })
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-900 dark:text-white">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={user.location.join(', ')}
                  onChange={(e) => handleArrayInputChange(e, 'location')}
                  placeholder="City, Country"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="interests" className="text-gray-700 dark:text-gray-300">Interests</Label>
                <Input
                  id="interests"
                  name="interests"
                  value={user.interests.join(', ')}
                  onChange={(e) => handleArrayInputChange(e, 'interests')}
                  placeholder="Separate interests with commas"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bio" className="text-gray-700 dark:text-gray-300">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                rows={4}
                placeholder="Tell us about yourself"
                className="mt-1"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
                Update Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

