import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
            F
          </div>
          <span className="font-bold text-xl text-gray-900">Fruitopia</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { to: '/', label: 'Home', end: true },
            { to: '/products', label: 'Products' },
            { to: '/about', label: 'About' },
            { to: '/contact', label: 'Contact' },
          ].map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) => 
                `px-3 py-2 rounded-lg transition-all duration-200 ${
                  isActive 
                    ? 'text-green-600 bg-green-50 font-semibold' 
                    : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-gray-50 transition-colors relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 2.5M7 13l2.5 2.5m6-7h.01M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
            </svg>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center">0</span>
          </button>
          <NavLink 
            to="/signin" 
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Sign In
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-gray-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="px-4 py-4 space-y-2">
            {[
              { to: '/', label: 'Home', end: true },
              { to: '/products', label: 'Products' },
              { to: '/about', label: 'About' },
              { to: '/contact', label: 'Contact' },
            ].map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'text-green-600 bg-green-50 font-semibold' 
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-gray-200 mt-4">
              <NavLink 
                to="/signin" 
                className="block w-full px-4 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-center font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </NavLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header