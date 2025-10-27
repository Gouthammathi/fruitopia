import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from '../Pages/Home'
import Products from '../Pages/Products'
import ProductDetails from '../Pages/ProductDetails'
import Plans from '../Pages/Plans'
import PlanDetails from '../Pages/PlanDetails'
import Contact from '../Pages/Contact'
import Cart from '../Pages/Cart'
import Checkout from '../Pages/Checkout'
import Wishlist from '../Pages/Wishlist'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Profile from '../Pages/Profile'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'products', element: <Products /> },
      { path: 'product/:id', element: <ProductDetails /> },
      { path: 'plans', element: <Plans /> },
      { path: 'plan/:planId', element: <PlanDetails /> },
      { path: 'contact', element: <Contact /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'wishlist', element: <Wishlist /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
])

const Routers = () => {
  return <RouterProvider router={router} />
}

export default Routers