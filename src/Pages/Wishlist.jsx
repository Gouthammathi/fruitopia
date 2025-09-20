import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const Wishlist = () => {
  const navigate = useNavigate()
  const { 
    wishlist, 
    wishlistCount, 
    clearWishlist, 
    moveToCartFromWishlist 
  } = useApp()

  // Empty state
  if (wishlist.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-8xl mb-8">❤️</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
            <p className="text-lg text-gray-600 mb-8">Save items you love for later by adding them to your wishlist.</p>
            <button
              onClick={() => navigate('/products')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Explore Products
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">{wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} saved for later</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                wishlist.forEach(product => {
                  moveToCartFromWishlist(product.id, 1)
                })
              }}
              className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
            >
              Add All to Cart
            </button>
            <button
              onClick={clearWishlist}
              className="px-6 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              Clear Wishlist
            </button>
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {/* Continue Shopping */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/products')}
            className="px-8 py-4 border-2 border-green-500 text-green-600 font-semibold rounded-xl hover:bg-green-500 hover:text-white transition-all duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default Wishlist