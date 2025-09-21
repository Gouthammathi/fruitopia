import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()
  const { cartItemCount, wishlistCount } = useApp()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-lg lg:text-xl shadow-lg transform group-hover:scale-105 transition-transform">
              🍏
            </div>
            <span className="font-bold text-xl lg:text-2xl text-gray-900 font-['Poppins']">Fruitopia</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {[
              { to: '/', label: 'Home', end: true },
              { to: '/products', label: 'Products' },
              { to: '/contact', label: 'Contact' },
            ].map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.end}
                className={({ isActive }) => 
                  `px-4 py-2 rounded-xl transition-all duration-200 hover:scale-105 font-['Inter'] ${
                    isActive 
                      ? 'text-green-600 bg-green-50 font-semibold shadow-sm' 
                      : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Cart & Wishlist Icons */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/wishlist')}
                className="relative p-2 rounded-xl text-gray-600 hover:text-red-500 hover:bg-red-50 transition-all duration-200 group"
              >
                <svg className="w-6 h-6" fill={wishlistCount > 0 ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => navigate('/cart')}
                className="relative p-2 rounded-xl text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-200 group"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
            
            <button 
              onClick={() => navigate('/products')}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Order Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Mobile Cart/Wishlist Icons */}
            <button 
              onClick={() => navigate('/cart')}
              className="relative p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            <button 
              className="mobile-menu-container p-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-gray-50 transition-colors"
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
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden mobile-menu-container transition-all duration-300 overflow-hidden ${
        isMenuOpen 
          ? 'max-h-96 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg' 
          : 'max-h-0'
      }`}>
        <nav className="px-4 py-4 space-y-2">
          {[
            { to: '/', label: 'Home', end: true },
            { to: '/products', label: 'Products' },
            { to: '/wishlist', label: `Wishlist ${wishlistCount > 0 ? `(${wishlistCount})` : ''}` },
            { to: '/contact', label: 'Contact' },
          ].map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              className={({ isActive }) => 
                `block px-4 py-3 rounded-xl transition-colors font-medium ${
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
          <div className="pt-4 border-t border-gray-200">
            <button 
              onClick={() => {
                setIsMenuOpen(false)
                navigate('/products')
              }}
              className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200"
            >
              Order Now
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
