import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const CartSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const {
    cart,
    cartItemCount,
    cartTotal,
    removeFromCart,
    updateCartQuantity,
    clearCart
  } = useApp()

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  const handleViewCart = () => {
    onClose()
    navigate('/cart')
  }

  if (!isOpen) return null

  return (
    <div className=\"fixed inset-0 z-50 overflow-hidden\">
      {/* Backdrop */}
      <div className=\"absolute inset-0 bg-black/50\" onClick={onClose}></div>
      
      {/* Sidebar */}
      <div className=\"absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl\">
        <div className=\"flex flex-col h-full\">
          {/* Header */}
          <div className=\"flex items-center justify-between p-4 border-b border-gray-200\">
            <h2 className=\"text-lg font-semibold text-gray-900\">
              Shopping Cart ({cartItemCount})
            </h2>
            <button
              onClick={onClose}
              className=\"p-2 rounded-full hover:bg-gray-100 transition-colors\"
            >
              <svg className=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M6 18L18 6M6 6l12 12\" />
              </svg>
            </button>
          </div>
          
          {/* Cart Items */}
          <div className=\"flex-1 overflow-y-auto p-4\">
            {cart.length === 0 ? (
              <div className=\"text-center py-12\">
                <svg className=\"w-16 h-16 mx-auto text-gray-300 mb-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                  <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01\" />
                </svg>
                <p className=\"text-gray-500 mb-4\">Your cart is empty</p>
                <button
                  onClick={() => {
                    onClose()
                    navigate('/products')
                  }}
                  className=\"px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors\"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className=\"space-y-4\">
                {cart.map((item) => (
                  <div key={item.id} className=\"flex items-center gap-3 p-3 border border-gray-200 rounded-lg\">
                    <span className=\"text-2xl\">{item.image}</span>
                    <div className=\"flex-1\">
                      <h3 className=\"font-medium text-gray-900\">{item.name}</h3>
                      <p className=\"text-sm text-gray-500\">₹{item.price}/{item.unit}</p>
                    </div>
                    <div className=\"flex items-center gap-2\">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className=\"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50\"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className=\"w-8 text-center\">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className=\"w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50\"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className=\"p-1 text-red-500 hover:bg-red-50 rounded transition-colors\"
                    >
                      <svg className=\"w-4 h-4\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                        <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16\" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {cart.length > 0 && (
            <div className=\"border-t border-gray-200 p-4 space-y-4\">
              {/* Total */}
              <div className=\"flex items-center justify-between text-lg font-semibold\">
                <span>Total:</span>
                <span className=\"text-green-600\">₹{cartTotal.toFixed(2)}</span>
              </div>
              
              {/* Actions */}
              <div className=\"space-y-2\">
                <button
                  onClick={handleCheckout}
                  className=\"w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200\"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={handleViewCart}
                  className=\"w-full px-6 py-2 border border-green-500 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors\"
                >
                  View Cart Details
                </button>
              </div>
              
              {/* Clear Cart */}
              <button
                onClick={clearCart}
                className=\"w-full text-sm text-gray-500 hover:text-red-500 transition-colors\"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartSidebar