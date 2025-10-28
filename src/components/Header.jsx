import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { scrollToTop } from '../utils/scrollToTop'
import { useApp } from '../context/AppContext'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
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

  // Handle sidebar body scroll and escape key
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
      
      const handleEscape = (e) => {
        if (e.key === 'Escape') {
          setIsSidebarOpen(false)
        }
      }
      
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleEscape)
      }
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isSidebarOpen])

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

          {/* Sidebar Toggle Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-all duration-200 ml-2"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>
      </div>
    </header>

    {/* Backdrop Overlay */}
    {isSidebarOpen && (
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity duration-300"
        onClick={() => setIsSidebarOpen(false)}
        aria-hidden="true"
      />
    )}

    {/* Professional Sidebar */}
    <div 
      className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl z-[70] transform transition-transform duration-300 ease-out ${
        isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-gradient-to-r from-emerald-50 via-emerald-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <div>
              <h2 className="font-bold text-lg text-slate-900">Menu</h2>
              <p className="text-xs text-slate-600">Explore more</p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
            aria-label="Close sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Quick Links Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Links</h3>
            
            {/* Wishlist */}
            <button
              onClick={() => {
                setIsSidebarOpen(false)
                navigate('/wishlist')
                scrollToTop('smooth')
              }}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50 hover:from-pink-100 hover:to-rose-100 transition-all duration-200 group border border-pink-100"
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white">
                    {wishlistCount}
                  </span>
                )}
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-slate-900">Wishlist</h4>
                <p className="text-sm text-slate-600">{wishlistCount} saved {wishlistCount === 1 ? 'item' : 'items'}</p>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-pink-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Cart */}
            <button
              onClick={() => {
                setIsSidebarOpen(false)
                navigate('/cart')
                scrollToTop('smooth')
              }}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-all duration-200 group border border-emerald-100"
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-slate-900">Shopping Cart</h4>
                <p className="text-sm text-slate-600">{cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}</p>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Information Section */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Information</h3>
            
            {/* About Us */}
            <button
              onClick={() => {
                setIsSidebarOpen(false)
                navigate('/about')
                scrollToTop('smooth')
              }}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group border border-blue-100"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-slate-900">About Us</h4>
                <p className="text-sm text-slate-600">Learn our story</p>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Contact */}
            <button
              onClick={() => {
                setIsSidebarOpen(false)
                navigate('/contact')
                scrollToTop('smooth')
              }}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 transition-all duration-200 group border border-purple-100"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-slate-900">Contact Us</h4>
                <p className="text-sm text-slate-600">Get in touch</p>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* About Company Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                🍏
              </div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Fruitopia</h4>
                <p className="text-xs text-slate-600">Fresh & Healthy</p>
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              We're passionate about bringing you the freshest, highest-quality fruits delivered right to your doorstep. Healthy eating made convenient!
            </p>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-slate-200 bg-white">
          {user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-900 truncate">{user.name}</p>
                  <p className="text-sm text-slate-600 truncate">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsSidebarOpen(false)
                  logout()
                  navigate('/')
                }}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 font-medium border border-red-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsSidebarOpen(false)
                navigate('/login')
                scrollToTop('smooth')
              }}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 shadow-lg font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              Login / Sign Up
            </button>
          )}
        </div>
      </div>
    </div>

    {/* Mobile Bottom Navigation */}
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg mobile-bottom-nav">
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
