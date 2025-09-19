import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">F</div>
          <span className="font-bold text-gray-900">Fruitopia</span>
        </div>

        <nav className="hidden sm:flex mx-auto gap-6 text-sm">
          {[
            { to: '/', label: 'Home', end: true },
            { to: '/about', label: 'About' },
            { to: '/fruits', label: 'Fruits' },
            { to: '/products', label: 'Pricing' },
          ].map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `px-1 py-1 ${isActive ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto">
          <NavLink to="/signup" className="px-4 py-2 rounded-full bg-green-600 text-white text-sm hover:bg-green-700 shadow">
            Sign Up
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header