import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { scrollToTop } from '../utils/scrollToTop'
import { useApp } from '../context/AppContext'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const navigate = useNavigate()
  const { user, logout, cartItemCount, wishlistCount } = useApp()


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Update scrolled state for styling
      setIsScrolled(currentScrollY > 20)
      
      // Hide header when scrolling up, show when scrolling down
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide header
        setIsHeaderVisible(false)
      } else {
        // Scrolling up - show header
        setIsHeaderVisible(true)
      }
      
      // Always show header at the top
      if (currentScrollY < 10) {
        setIsHeaderVisible(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  // Close mobile menu when clicking outside or when header is hidden
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setIsMenuOpen(false)
      }
    }
    
    // Close mobile menu when header is hidden
    if (!isHeaderVisible && isMenuOpen) {
      setIsMenuOpen(false)
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen, isHeaderVisible])

  return (
    <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
      isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
    } ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-md border-b border-slate-200/60 shadow-lg' 
        : 'bg-white/90 backdrop-blur-sm border-b border-slate-200/40'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
            onClick={() => {
              navigate('/')
              scrollToTop()
            }}
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-base sm:text-lg lg:text-xl shadow-sm transform group-hover:scale-105 transition-transform">
              🍏
            </div>
            <span className="font-bold text-lg sm:text-xl lg:text-2xl text-slate-900 font-['Poppins']">Fruitopia</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {[
              { to: '/', label: 'Home', end: true },
              { to: '/products', label: 'Fresh' },
              { to: '/plans', label: 'Plans' },
              { to: '/contact', label: 'Contact' },
            ].map((item) => (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    end={item.end}
                    onClick={() => scrollToTop('smooth')}
                    className={({ isActive }) => 
                      `px-3 py-2 rounded-md transition-all duration-200 font-['Inter'] ${
                        isActive 
                          ? 'text-emerald-600 bg-emerald-50 font-semibold' 
                          : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
            ))}
            
          </nav>

          {/* Desktop Actions - Only visible on large screens */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Wishlist Icon */}
            <button
              onClick={() => {
                navigate('/wishlist')
                scrollToTop('smooth')
              }}
              className="relative p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-all duration-200"
              aria-label="Wishlist"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button 
              onClick={() => {
                navigate('/cart')
                scrollToTop('smooth')
              }}
              className="relative p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-all duration-200"
              aria-label="Cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Profile Icon / Login */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-all duration-200"
                  aria-label="Profile"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                
                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowProfileMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-20">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false)
                          navigate('/profile')
                          scrollToTop('smooth')
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => {
                          setShowProfileMenu(false)
                          logout()
                          navigate('/')
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button 
                onClick={() => {
                  navigate('/login')
                  scrollToTop('smooth')
                }}
                className="p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-all duration-200"
                aria-label="Login"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            )}
          </div>

          {/* Mobile Menu Button - Only visible on small/medium screens */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Cart Icon */}
            <button
              onClick={() => {
                navigate('/cart')
                scrollToTop('smooth')
              }}
              className="relative p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-all duration-200"
              aria-label="Cart"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          ? 'max-h-[600px] bg-white/98 backdrop-blur-md border-b border-slate-200/60 shadow-lg' 
          : 'max-h-0'
      }`}>
        <nav className="px-3 py-3 space-y-1">
          {[
            { to: '/', label: 'Home', end: true },
            { to: '/products', label: 'Fresh' },
            { to: '/plans', label: 'Plans' },
            { to: '/contact', label: 'Contact' },
          ].map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => 
                    `block px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm ${
                      isActive 
                        ? 'text-emerald-600 bg-emerald-50 font-semibold' 
                        : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
                    }`
                  }
                  onClick={() => {
                    setIsMenuOpen(false)
                    scrollToTop('smooth')
                  }}
                >
                  {item.label}
                </NavLink>
          ))}
          
          {/* Mobile Games Button */}
          <button
            onClick={() => {
              setIsMenuOpen(false)
              window.open('http://fruitopiaa.vercel.app', '_blank')
            }}
            className="block w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
          >
            <span className="flex items-center gap-2">
              <span>🎮</span>
              <span>Games</span>
              <span className="text-xs text-gray-500">(Fruitopia Games)</span>
            </span>
          </button>
          
          {/* Mobile Icons */}
          <div className="pt-3 border-t border-slate-200">
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {/* Wishlist */}
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  navigate('/wishlist')
                  scrollToTop('smooth')
                }}
                className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-all"
              >
                <div className="relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px]">Wishlist</span>
              </button>

              {/* Cart */}
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  navigate('/cart')
                  scrollToTop('smooth')
                }}
                className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-all"
              >
                <div className="relative">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px]">Cart</span>
              </button>

              {/* Profile/Login */}
              {user ? (
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    navigate('/profile')
                    scrollToTop('smooth')
                  }}
                  className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-[10px]">Profile</span>
                </button>
              ) : (
                <button 
                  onClick={() => {
                    setIsMenuOpen(false)
                    navigate('/login')
                    scrollToTop('smooth')
                  }}
                  className="flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-[10px]">Login</span>
                </button>
              )}
            </div>

            {/* Logout button for logged in users */}
            {user && (
              <button
                onClick={() => {
                  setIsMenuOpen(false)
                  logout()
                  navigate('/')
                }}
                className="w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
