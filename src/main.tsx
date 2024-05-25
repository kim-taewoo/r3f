import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root.tsx'
import { ErrorPage } from './pages/ErrorPage.tsx'
import { PhysicsPage } from './pages/PhysicsPage.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <App />,
      },
      {
        path: 'projects/medal',
        element: <App />,
      },
      {
        path: 'projects/physics',
        element: <PhysicsPage />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
