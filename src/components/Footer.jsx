import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white flex items-center justify-center font-bold text-lg sm:text-xl shadow-sm">
                  🍏
                </div>
                <span className="font-bold text-xl sm:text-2xl text-white">Fruitopia</span>
              </div>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 max-w-md">
                Your trusted partner for fresh, organic fruits delivered straight to your doorstep. 
                Quality guaranteed, satisfaction assured.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                <div className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400">50K+</div>
                  <div className="text-xs sm:text-sm text-slate-400">Happy Customers</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400">99.8%</div>
                  <div className="text-xs sm:text-sm text-slate-400">Satisfaction</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-xl sm:text-2xl font-bold text-emerald-400">24/7</div>
                  <div className="text-xs sm:text-sm text-slate-400">Support</div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Fruitopia</h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { to: '/', label: 'About' },
                  { to: '/', label: 'Careers' },
                  { to: '/', label: 'Blog' },
                ].map((link) => (
                  <li key={link.label}>
                    <NavLink 
                      to={link.to} 
                      className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm sm:text-base"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6">Support</h3>
              <ul className="space-y-2 sm:space-y-3">
                {[
                  { to: '/contact', label: 'Help Center' },
                  { to: '/contact', label: 'FAQs' },
                  { to: '/contact', label: 'Contact Us' },
                ].map((link) => (
                  <li key={link.label}>
                    <NavLink 
                      to={link.to} 
                      className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 text-sm sm:text-base"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-800 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="text-2xl sm:text-3xl">📍</div>
              <div className="text-slate-300">
                <div className="font-medium text-sm sm:text-base">Visit Our Store</div>
                <div className="text-xs sm:text-sm text-slate-400">
                  123 Fresh Market Street<br />
                  Hyderabad, Telangana 500001
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:gap-3">
              <div className="text-2xl sm:text-3xl">📞</div>
              <div className="text-slate-300">
                <div className="font-medium text-sm sm:text-base">Call Us</div>
                <div className="text-xs sm:text-sm text-slate-400">+91 98765 43210</div>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:gap-3 sm:col-span-2 md:col-span-1">
              <div className="text-2xl sm:text-3xl">✉️</div>
              <div className="text-slate-300">
                <div className="font-medium text-sm sm:text-base">Email Us</div>
                <div className="text-xs sm:text-sm text-slate-400">hello@fruitopia.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-800 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-slate-400 text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} Fruitopia. All rights reserved.
            </div>
            
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              <NavLink to="/privacy" className="text-slate-400 hover:text-emerald-400 text-xs sm:text-sm transition-colors">
                Privacy Policy
              </NavLink>
              <NavLink to="/terms" className="text-slate-400 hover:text-emerald-400 text-xs sm:text-sm transition-colors">
                Terms of Service
              </NavLink>
            </div>
            
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <span className="text-slate-400 text-xs sm:text-sm">Follow Us:</span>
              <div className="flex items-center gap-2 sm:gap-3">
                {[
                  { name: 'Instagram', emoji: '📷' },
                  { name: 'Facebook', emoji: '📘' },
                  { name: 'Twitter', emoji: '🐦' }
                ].map((social) => (
                  <button key={social.name} className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-800 rounded-lg flex items-center justify-center text-sm sm:text-lg hover:bg-slate-700 transition-all duration-200">
                    {social.emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer