import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from '../Pages/Home'
import Products from '../Pages/Products'
import Contact from '../Pages/Contact'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
])

const Routers = () => {
  return <RouterProvider router={router} />
}

export default Routers