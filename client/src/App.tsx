import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './page/Home'
import ReadPage from './page/ReadPage'
import TrendingPage from './page/Trending'
import BookmarksPage from './page/Bookmarks'
import AppLayout from './page/AppLayout'
import ProfilePage from './page/Profile'


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/home',
          element: <HomePage />
        },
        {
          path: '/trending',
          element: <TrendingPage />
        },
        {
          path: '/bookmarks',
          element: <BookmarksPage />  
        },
        {
          path: '/profile',
          element: <ProfilePage />
        },
        {
          path: '/*',
          
        }
      ]
    },
    {
      path: '/read',
      element: <ReadPage />
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
