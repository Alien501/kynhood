import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './page/Home'
import ReadPage from './page/ReadPage'
import TrendingPage from './page/Trending'
import BookmarksPage from './page/Bookmarks'
import AppLayout from './page/AppLayout'
import ProfilePage from './page/Profile'
import LandingPage from './page/Landing'
import NotFoundPage from './page/NotFoundPage'
import NewAccountPage from './page/NewAccount'
import { Toaster } from './components/ui/toaster'
import ProtectedRoute from './components/custom/ProtectedRoute'


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
          element: <ProtectedRoute><BookmarksPage /></ProtectedRoute>
        },
        {
          path: '/profile',
          element: <ProtectedRoute><ProfilePage /></ProtectedRoute>
        },
        {
          path: '/*',
          element: <NotFoundPage />
        }
      ]
    },
    {
      path: '/read',
      element: <ReadPage />
    },
    {
      path: '/landing',
      element: <LandingPage />
    },
    {
      path: '/sign-up',
      element: <NewAccountPage />
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App
