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
                  🍏
                </div>
                <span className="font-bold text-2xl text-white">Fruitopia</span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md">
                Your trusted partner for fresh, organic fruits delivered straight to your doorstep. 
                Quality guaranteed, satisfaction assured.
              </p>
              <div className="flex items-center gap-8">
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
              <h3 className="text-lg font-bold mb-6">Fruitopia</h3>
              <ul className="space-y-3">
                {[
                  { to: '/', label: 'About' },
                  { to: '/', label: 'Careers' },
                  { to: '/', label: 'Blog' },
                ].map((link) => (
                  <li key={link.label}>
                    <NavLink 
                      to={link.to} 
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold mb-6">Support</h3>
              <ul className="space-y-3">
                {[
                  { to: '/contact', label: 'Help Center' },
                  { to: '/contact', label: 'FAQs' },
                  { to: '/contact', label: 'Contact Us' },
                ].map((link) => (
                  <li key={link.label}>
                    <NavLink 
                      to={link.to} 
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200"
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
        <div className="border-t border-gray-800 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-3">
              <div className="text-3xl">📍</div>
              <div className="text-gray-300">
                <div className="font-medium">Visit Our Store</div>
                <div className="text-sm text-gray-400">
                  123 Fresh Market Street<br />
                  Mumbai, Maharashtra 400001
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="text-3xl">📞</div>
              <div className="text-gray-300">
                <div className="font-medium">Call Us</div>
                <div className="text-sm text-gray-400">+91 98765 43210</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="text-3xl">✉️</div>
              <div className="text-gray-300">
                <div className="font-medium">Email Us</div>
                <div className="text-sm text-gray-400">hello@fruitopia.com</div>
              </div>
            </div>
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
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">Follow Us:</span>
              <div className="flex items-center gap-3">
                {[
                  { name: 'Instagram', emoji: '📷' },
                  { name: 'Facebook', emoji: '📘' },
                  { name: 'Twitter', emoji: '🐦' }
                ].map((social) => (
                  <button key={social.name} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-lg hover:bg-gray-700 transition-all duration-200 hover:scale-110">
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