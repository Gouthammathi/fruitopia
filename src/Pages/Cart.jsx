import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const Cart = () => {
  const navigate = useNavigate()
  const { 
    cart, 
    cartTotal, 
    cartItemCount, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart 
  } = useApp()

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-16 text-center">
            <div className="text-8xl lg:text-9xl mb-8">🛒</div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-['Poppins']">Your cart is empty</h1>
            <p className="text-lg lg:text-xl text-gray-600 mb-8 max-w-md mx-auto font-['Inter']">Looks like you haven't added anything to your cart yet. Discover our fresh fruits!</p>
            <button
              onClick={() => navigate('/products')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Shopping 🍎
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
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2 font-['Poppins']">Shopping Cart</h1>
          <p className="text-lg text-gray-600 font-['Inter']">{cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-4 lg:p-6">
                <div className="space-y-4 lg:space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 lg:p-6 border-2 rounded-xl hover:shadow-md transition-all duration-300 ${
                      item.type === 'plan' 
                        ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50' 
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}>
                      {/* Product/Plan Icon */}
                      <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-xl flex items-center justify-center text-3xl lg:text-4xl flex-shrink-0 ${
                        item.type === 'plan'
                          ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-200'
                          : 'bg-gradient-to-br from-gray-50 to-gray-100'
                      }`}>
                        {item.type === 'plan' ? '🎯' : item.image}
                      </div>
                      
                      {/* Product/Plan Info */}
                      <div className="flex-1 w-full sm:w-auto">
                        {item.type === 'plan' ? (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wide">
                                Subscription Plan
                              </span>
                            </div>
                            <h3 className="font-bold text-lg lg:text-xl text-green-800 mb-2 font-['Poppins']">{item.name}</h3>
                            <div className="space-y-1 text-sm lg:text-base text-gray-700 font-['Inter']">
                              <p>• {item.planData.subscriptionMonths} month(s) subscription</p>
                              <p>• {item.planData.numberOfSubscriptions} subscription(s)</p>
                              <p>• ₹{item.planData.pricePerMonth}/month base price</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-semibold uppercase tracking-wide">
                                Individual Product
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg lg:text-xl text-gray-900 mb-1 font-['Poppins']">{item.name}</h3>
                            <p className="text-sm lg:text-base text-gray-600 mb-2 font-['Inter'] line-clamp-2">{item.description}</p>
                            <div className="flex items-center gap-2">
                              <span className="text-lg lg:text-xl font-bold text-green-600">₹{item.price}</span>
                              <span className="text-sm text-gray-500">/{item.unit}</span>
                            </div>
                          </>
                        )}
                      </div>
                      
                      {/* Quantity Controls - Only for products */}
                      {item.type !== 'plan' && (
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-2">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-white hover:shadow-sm transition-all font-bold text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-semibold text-lg">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-white hover:shadow-sm transition-all font-bold text-gray-600"
                          >
                            +
                          </button>
                        </div>
                      )}
                      
                      {/* Price & Remove */}
                      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto gap-2">
                        <div className="text-right">
                          <div className={`font-bold text-lg lg:text-xl ${
                            item.type === 'plan' ? 'text-green-700' : 'text-gray-900'
                          }`}>
                            ₹{item.type === 'plan' ? item.price.toFixed(2) : (item.price * item.quantity).toFixed(2)}
                          </div>
                          {item.type === 'plan' && (
                            <div className="text-xs text-green-600 font-medium">
                              Total Plan Cost
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className={`flex items-center gap-1 text-sm hover:bg-red-50 px-3 py-1 rounded-lg transition-all ${
                            item.type === 'plan' 
                              ? 'text-red-600 hover:text-red-800 border border-red-200' 
                              : 'text-red-500 hover:text-red-700'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Cart Actions */}
                <div className="border-t border-gray-200 pt-6 mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <button
                    onClick={() => navigate('/products')}
                    className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all font-semibold"
                  >
                    ← Continue Shopping
                  </button>
                  <button
                    onClick={clearCart}
                    className="px-6 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all font-semibold border-2 border-red-200 hover:border-red-300"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 lg:sticky lg:top-24">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 font-['Poppins']">Order Summary</h2>
              
              <div className="space-y-4">
                {/* Items List */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className={`flex items-center justify-between text-sm p-2 rounded-lg ${
                      item.type === 'plan' ? 'bg-green-50' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-semibold uppercase ${
                          item.type === 'plan' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-blue-500 text-white'
                        }`}>
                          {item.type === 'plan' ? 'Plan' : 'Product'}
                        </span>
                        <span className="text-gray-700">
                          {item.name} {item.type !== 'plan' && `x${item.quantity}`}
                        </span>
                      </div>
                      <span className="font-semibold">
                        ₹{item.type === 'plan' ? item.price.toFixed(2) : (item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Delivery</span>
                    <span className="font-semibold text-green-600">Free 🚚</span>
                  </div>
                  
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold text-gray-600">Included</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg lg:text-xl font-bold">
                      <span>Total</span>
                      <span className="text-green-600">₹{cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/checkout')}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Proceed to Checkout →
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Checkout
              </div>
              
              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-2xl">🚚</div>
                    <div className="text-xs text-gray-600">Free Delivery</div>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-2xl">✨</div>
                    <div className="text-xs text-gray-600">Fresh Quality</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart