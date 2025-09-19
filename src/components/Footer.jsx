import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center justify-center font-bold text-xl shadow-lg">
                  F
                </div>
                <span className="font-bold text-2xl text-white">Fruitopia</span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Your trusted partner for fresh, organic fruits delivered straight to your doorstep. 
                Quality guaranteed, satisfaction assured.
              </p>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">50K+</div>
                  <div className="text-sm text-gray-400">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">99.8%</div>
                  <div className="text-sm text-gray-400">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">24/7</div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/products', label: 'Products' },
                  { to: '/about', label: 'About Us' },
                  { to: '/contact', label: 'Contact' },
                ].map((link) => (
                  <li key={link.label}>
                    <NavLink 
                      to={link.to} 
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-6">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div className="text-gray-300">
                    <div className="font-medium">Visit Our Store</div>
                    <div className="text-sm text-gray-400">
                      123 Fresh Market Street<br />
                      Mumbai, Maharashtra 400001
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div className="text-gray-300">
                    <div className="font-medium">Call Us</div>
                    <div className="text-sm text-gray-400">+91 98765 43210</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div className="text-gray-300">
                    <div className="font-medium">Email Us</div>
                    <div className="text-sm text-gray-400">hello@fruitopia.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-800 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Fresh with Our Newsletter</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get exclusive offers, seasonal fruit updates, and healthy recipes delivered to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="flex-1">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full px-6 py-4 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200"
                />
              </div>
              <button 
                type="submit" 
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Fruitopia. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6">
              <NavLink to="/privacy" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Privacy Policy
              </NavLink>
              <NavLink to="/terms" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Terms of Service
              </NavLink>
              <NavLink to="/refund" className="text-gray-400 hover:text-green-400 text-sm transition-colors">
                Refund Policy
              </NavLink>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Follow Us:</span>
              <div className="flex items-center gap-3">
                {[
                  { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                  { name: 'Instagram', icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-2.493 0-4.514-2.021-4.514-4.514s2.021-4.514 4.514-4.514 4.514 2.021 4.514 4.514-2.021 4.514-4.514 4.514zm7.065 0c-2.493 0-4.514-2.021-4.514-4.514s2.021-4.514 4.514-4.514 4.514 2.021 4.514 4.514-2.021 4.514-4.514 4.514z' },
                  { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' }
                ].map((social) => (
                  <button key={social.name} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-gray-700 transition-all duration-200">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
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