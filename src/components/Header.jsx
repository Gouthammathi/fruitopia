import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { scrollToTop } from '../utils/scrollToTop'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const navigate = useNavigate()


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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              navigate('/')
              scrollToTop()
            }}
          >
            <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg lg:text-xl shadow-sm transform group-hover:scale-105 transition-transform">
              🍏
            </div>
            <span className="font-bold text-xl lg:text-2xl text-slate-900 font-['Poppins']">Fruitopia</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {[
              { to: '/', label: 'Home', end: true },
              { to: '/products', label: 'Products' },
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
          <div className="hidden lg:flex items-center">
            <button 
              onClick={() => {
                // Placeholder for login functionality
                console.log('Login clicked')
              }}
              className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-sm font-semibold hover:from-emerald-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Login
            </button>
          </div>

          {/* Mobile Menu Button - Only visible on small/medium screens */}
          <div className="block lg:hidden">
            <button 
              className="mobile-menu-container p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-50 transition-all duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
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
          ? 'max-h-96 bg-white/98 backdrop-blur-md border-b border-slate-200/60 shadow-lg' 
          : 'max-h-0'
      }`}>
        <nav className="px-4 py-4 space-y-2">
          {[
            { to: '/', label: 'Home', end: true },
            { to: '/products', label: 'Products' },
            { to: '/plans', label: 'Plans' },
            { to: '/contact', label: 'Contact' },
          ].map((item) => (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => 
                    `block px-4 py-3 rounded-md transition-all duration-200 font-medium ${
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
            className="block w-full text-left px-4 py-3 rounded-md transition-all duration-200 font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
          >
            <span className="flex items-center gap-2">
              <span>🎮</span>
              <span>Games</span>
              <span className="text-xs text-gray-500">(Fruitopia Games)</span>
            </span>
          </button>
          
          <div className="pt-4 border-t border-slate-200">
                <button 
                  onClick={() => {
                    setIsMenuOpen(false)
                    // Placeholder for login functionality
                    console.log('Login clicked')
                  }}
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold hover:from-emerald-600 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Login
                </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
