import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()
  
  const { 
    cart, 
    wishlist, 
    addToCart, 
    addToWishlist, 
    removeFromWishlist 
  } = useApp()

  // Check if product is in cart
  const cartItem = cart.find(item => item.id === product.id)
  const isInCart = Boolean(cartItem)
  
  // Check if product is in wishlist
  const isInWishlist = wishlist.some(item => item.id === product.id)

  // Calculate discount percentage
  const discountPercentage = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (product.inStock) {
      addToCart(product, 1)
    }
  }

  const handleToggleWishlist = (e) => {
    e.stopPropagation()
    if (isInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const getBadgeColor = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-800',
      blue: 'bg-blue-100 text-blue-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      red: 'bg-red-100 text-red-800',
      purple: 'bg-purple-100 text-purple-800',
      orange: 'bg-orange-100 text-orange-800'
    }
    return colors[color] || 'bg-gray-100 text-gray-800'
  }

  // List view layout
  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-100 p-6"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="flex gap-6">
          {/* Image */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-4xl">
              <span>{product.image}</span>
            </div>
            {/* Badges */}
            <div className="absolute -top-2 -right-2 flex flex-col gap-1">
              {product.badge && (
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getBadgeColor(product.badgeColor)}`}>
                  {product.badge}
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 flex justify-between">
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
              
              {/* Rating & Origin */}
              <div className="flex items-center gap-4 text-sm">
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium text-gray-700">{product.rating}</span>
                    {product.reviewCount && <span className="text-gray-500">({product.reviewCount})</span>}
                  </div>
                )}
                {product.origin && (
                  <span className="text-gray-500">{product.origin}</span>
                )}
              </div>
              
              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
                {product.inStock && product.stockQuantity && (
                  <span className="text-sm text-gray-500">({product.stockQuantity} available)</span>
                )}
              </div>
            </div>
            
            {/* Price & Actions */}
            <div className="flex flex-col items-end justify-between ml-6">
              <button
                onClick={handleToggleWishlist}
                className={`w-10 h-10 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'}`}
              >
                <svg className="w-5 h-5" fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              
              <div className="text-right space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-green-600">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
                <div className="text-sm text-gray-500">per {product.unit}</div>
                <div className="text-xs text-green-600 font-medium">{product.deliveryTime}</div>
              </div>
              
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 flex items-center gap-2 ${product.inStock ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
              >
                {isInCart ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    In Cart ({cartItem?.quantity})
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
                    </svg>
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view layout (default)
  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden group border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-2xl">
        <div className="w-full h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-6xl transition-transform duration-300 group-hover:scale-105">
          <span className={`transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
            {product.image}
          </span>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badge && (
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getBadgeColor(product.badgeColor)}`}>
              {product.badge}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
              {discountPercentage}% OFF
            </span>
          )}
          {!product.inStock && (
            <span className="px-2 py-1 bg-gray-500 text-white text-xs font-semibold rounded-full">
              Sold Out
            </span>
          )}
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
            isInWishlist 
              ? 'bg-red-500 text-white scale-110' 
              : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
          }`}
        >
          <svg className="w-5 h-5" fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        
        {/* Rating */}
        {product.rating && (
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-medium text-gray-700">{product.rating}</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>
        
        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-600">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
            <span className="text-sm text-gray-500">/{product.unit}</span>
          </div>
          <div className="text-xs text-green-600 font-medium">
            {product.deliveryTime}
          </div>
        </div>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
            product.inStock
              ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transform group-hover:scale-105 shadow-lg hover:shadow-xl'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isInCart ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              In Cart ({cartItem?.quantity})
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
              </svg>
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </>
          )}
        </button>
      </div>
    </div>
  )
}

export default ProductCard