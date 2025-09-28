import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { scrollToTop } from '../utils/scrollToTop'

const Layout = () => {
  const location = useLocation()

  // Scroll to top when route changes
  useEffect(() => {
    scrollToTop('smooth')
  }, [location.pathname])

  return (
    <div className="flex flex-col bg-slate-50 overflow-x-hidden zoom-container">
      <Header />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Layout