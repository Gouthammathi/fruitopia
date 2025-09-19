import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 text-center text-xs sm:text-sm text-gray-600">
        © {new Date().getFullYear()} Fruitopia. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer