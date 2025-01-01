import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, RefreshCw } from 'lucide-react'

const CouldntFind = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchTerm)
  }

  const handleRefresh = () => {
    console.log('Refreshing results')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-8"
        >
          <Search size={64} className="text-gray-400 dark:text-gray-600" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Oops! We couldn't find anything
        </h1>
        <p className="text-xl mb-8 text-gray-600 dark:text-gray-400">
          We couldn't find anything right at the moment. Let's try again!
        </p>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Try another search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow mr-2"
            />
            <Button type="submit">
              Search
            </Button>
          </div>
        </form>
        <Button
          variant="outline"
          onClick={handleRefresh}
          className="flex items-center"
        >
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh Results
        </Button>
      </motion.div>
    </div>
  )
}

export default CouldntFind

