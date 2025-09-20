import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from '../Pages/Home'
import Products from '../Pages/Products'
import ProductDetails from '../Pages/ProductDetails'
import Contact from '../Pages/Contact'
import Cart from '../Pages/Cart'
import Wishlist from '../Pages/Wishlist'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: 'contact', element: <Contact /> },
      { path: 'cart', element: <Cart /> },
      { path: 'wishlist', element: <Wishlist /> },
    ],
  },
])

const Routers = () => {
  return <RouterProvider router={router} />
}

export default Routers