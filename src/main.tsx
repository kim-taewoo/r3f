import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root'
import { ErrorPage } from './pages/ErrorPage'
import { PhysicsPage } from './pages/PhysicsPage'
import { Game3DPage } from './pages/Game3DPage'
import { Game2DPage } from './pages/Game2DPage'
import { HomePage } from './pages/HomePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'projects/3d-game',
        element: <Game3DPage />,
      },
      {
        path: 'projects/physics',
        element: <PhysicsPage />,
      },
      {
        path: 'projects/2d-game',
        element: <Game2DPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
