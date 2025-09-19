import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Layout