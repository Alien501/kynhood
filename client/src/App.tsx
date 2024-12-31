import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Topbar from './components/custom/Topbar'
import HomePage from './page/Home'
import ReadPage from './page/ReadPage'


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/home',
      element: <HomePage />
    },
    {
      path: '/read',
      element: <ReadPage />
    }
  ])

  return (
    <>
      {/* <Topbar /> */}
        <RouterProvider router={router} />
    </>
  )
}

export default App
