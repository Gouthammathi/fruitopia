import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CartSidebar from './CartSidebar'
import { scrollToTop } from '../utils/scrollToTop'

const Layout = () => {
  const location = useLocation()

  // Scroll to top when route changes
  useEffect(() => {
    scrollToTop('smooth')
  }, [location.pathname])

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
      <CartSidebar />
    </div>
  )
}

export default Layout