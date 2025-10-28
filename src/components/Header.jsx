import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { scrollToTop } from '../utils/scrollToTop'
import { useApp } from '../context/AppContext'

const Header = () => {
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


  return (
    <>
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
            
            {/* Login Button */}
            {!user && (
              <button 
                onClick={() => {
                  navigate('/login')
                  scrollToTop('smooth')
                }}
                className="p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-all duration-200"
                aria-label="Login"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>

    {/* Mobile Bottom Navigation */}
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-lg mobile-bottom-nav">
      <nav className="flex items-center justify-around px-2 py-2">
        {/* Home */}
        <NavLink
          to="/"
          end
          onClick={() => scrollToTop('smooth')}
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive 
                ? 'text-emerald-600 bg-emerald-50' 
                : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
            }`
          }
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs font-medium">Home</span>
        </NavLink>

        {/* Fresh/Products */}
        <NavLink
          to="/products"
          onClick={() => scrollToTop('smooth')}
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive 
                ? 'text-emerald-600 bg-emerald-50' 
                : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
            }`
          }
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <span className="text-xs font-medium">Fresh</span>
        </NavLink>

        {/* Plans */}
        <NavLink
          to="/plans"
          onClick={() => scrollToTop('smooth')}
          className={({ isActive }) => 
            `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
              isActive 
                ? 'text-emerald-600 bg-emerald-50' 
                : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
            }`
          }
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-xs font-medium">Plans</span>
        </NavLink>

        {/* Cart */}
        <button
          onClick={() => {
            navigate('/cart')
            scrollToTop('smooth')
          }}
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 relative"
        >
          <div className="relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
          <span className="text-xs font-medium">Cart</span>
        </button>

        {/* Profile - Only show if user is logged in */}
        {user && (
          <NavLink
            to="/profile"
            onClick={() => scrollToTop('smooth')}
            className={({ isActive }) => 
              `flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'text-emerald-600 bg-emerald-50' 
                  : 'text-slate-600 hover:text-emerald-600 hover:bg-slate-50'
              }`
            }
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs font-medium">Profile</span>
          </NavLink>
        )}
      </nav>
    </div>
    </>
  )
}

export default Header
