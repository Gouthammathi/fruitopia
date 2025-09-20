import React, { createContext, useContext, useReducer, useEffect } from 'react'

// Action types
const ACTION_TYPES = {
  // Cart actions
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_QUANTITY: 'UPDATE_CART_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  APPLY_COUPON: 'APPLY_COUPON',
  REMOVE_COUPON: 'REMOVE_COUPON',
  
  // Wishlist actions
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',
  CLEAR_WISHLIST: 'CLEAR_WISHLIST',
  MOVE_TO_CART_FROM_WISHLIST: 'MOVE_TO_CART_FROM_WISHLIST',
  
  // Filter and search actions
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_CATEGORY_FILTER: 'SET_CATEGORY_FILTER',
  SET_PRICE_FILTER: 'SET_PRICE_FILTER',
  SET_SORT_BY: 'SET_SORT_BY',
  SET_AVAILABILITY_FILTER: 'SET_AVAILABILITY_FILTER',
  CLEAR_FILTERS: 'CLEAR_FILTERS',
  
  // User preferences
  SET_USER_PREFERENCES: 'SET_USER_PREFERENCES',
  SET_DELIVERY_ADDRESS: 'SET_DELIVERY_ADDRESS',
  
  // UI state
  SET_MOBILE_MENU_OPEN: 'SET_MOBILE_MENU_OPEN',
  SET_CART_SIDEBAR_OPEN: 'SET_CART_SIDEBAR_OPEN',
  SET_SEARCH_SIDEBAR_OPEN: 'SET_SEARCH_SIDEBAR_OPEN'
}

// Initial state
const initialState = {
  // Cart state
  cart: [],
  cartTotal: 0,
  cartItemCount: 0,
  appliedCoupon: null,
  
  // Wishlist state
  wishlist: [],
  wishlistCount: 0,
  
  // Filter and search state
  searchQuery: '',
  categoryFilter: 'all',
  priceFilter: { min: 0, max: 1000 },
  sortBy: 'name',
  availabilityFilter: 'all', // 'all', 'in-stock', 'out-of-stock'
  
  // User preferences
  userPreferences: {
    currency: 'INR',
    language: 'en',
    deliveryPreference: 'standard'
  },
  deliveryAddress: null,
  
  // UI state
  isMobileMenuOpen: false,
  isCartSidebarOpen: false,
  isSearchSidebarOpen: false
}

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    // Cart actions
    case ACTION_TYPES.ADD_TO_CART: {
      const { product, quantity = 1 } = action.payload
      const existingItem = state.cart.find(item => item.id === product.id)
      
      let newCart
      if (existingItem) {
        newCart = state.cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        newCart = [...state.cart, { ...product, quantity }]
      }
      
      const cartTotal = calculateCartTotal(newCart, state.appliedCoupon)
      const cartItemCount = newCart.reduce((total, item) => total + item.quantity, 0)
      
      return {
        ...state,
        cart: newCart,
        cartTotal,
        cartItemCount
      }
    }
    
    case ACTION_TYPES.REMOVE_FROM_CART: {
      const newCart = state.cart.filter(item => item.id !== action.payload.productId)
      const cartTotal = calculateCartTotal(newCart, state.appliedCoupon)
      const cartItemCount = newCart.reduce((total, item) => total + item.quantity, 0)
      
      return {
        ...state,
        cart: newCart,
        cartTotal,
        cartItemCount
      }
    }
    
    case ACTION_TYPES.UPDATE_CART_QUANTITY: {
      const { productId, quantity } = action.payload
      const newCart = state.cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
      
      const cartTotal = calculateCartTotal(newCart, state.appliedCoupon)
      const cartItemCount = newCart.reduce((total, item) => total + item.quantity, 0)
      
      return {
        ...state,
        cart: newCart,
        cartTotal,
        cartItemCount
      }
    }
    
    case ACTION_TYPES.CLEAR_CART:
      return {
        ...state,
        cart: [],
        cartTotal: 0,
        cartItemCount: 0,
        appliedCoupon: null
      }
    
    case ACTION_TYPES.APPLY_COUPON: {
      const cartTotal = calculateCartTotal(state.cart, action.payload.coupon)
      return {
        ...state,
        appliedCoupon: action.payload.coupon,
        cartTotal
      }
    }
    
    case ACTION_TYPES.REMOVE_COUPON: {
      const cartTotal = calculateCartTotal(state.cart, null)
      return {
        ...state,
        appliedCoupon: null,
        cartTotal
      }
    }
    
    // Wishlist actions
    case ACTION_TYPES.ADD_TO_WISHLIST: {
      const product = action.payload.product
      const isAlreadyInWishlist = state.wishlist.some(item => item.id === product.id)
      
      if (isAlreadyInWishlist) {
        return state
      }
      
      const newWishlist = [...state.wishlist, product]
      return {
        ...state,
        wishlist: newWishlist,
        wishlistCount: newWishlist.length
      }
    }
    
    case ACTION_TYPES.REMOVE_FROM_WISHLIST: {
      const newWishlist = state.wishlist.filter(item => item.id !== action.payload.productId)
      return {
        ...state,
        wishlist: newWishlist,
        wishlistCount: newWishlist.length
      }
    }
    
    case ACTION_TYPES.CLEAR_WISHLIST:
      return {
        ...state,
        wishlist: [],
        wishlistCount: 0
      }
    
    case ACTION_TYPES.MOVE_TO_CART_FROM_WISHLIST: {
      const { productId, quantity = 1 } = action.payload
      const product = state.wishlist.find(item => item.id === productId)
      
      if (!product) return state
      
      // Remove from wishlist
      const newWishlist = state.wishlist.filter(item => item.id !== productId)
      
      // Add to cart
      const existingCartItem = state.cart.find(item => item.id === productId)
      let newCart
      if (existingCartItem) {
        newCart = state.cart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      } else {
        newCart = [...state.cart, { ...product, quantity }]
      }
      
      const cartTotal = calculateCartTotal(newCart, state.appliedCoupon)
      const cartItemCount = newCart.reduce((total, item) => total + item.quantity, 0)
      
      return {
        ...state,
        wishlist: newWishlist,
        wishlistCount: newWishlist.length,
        cart: newCart,
        cartTotal,
        cartItemCount
      }
    }
    
    // Filter and search actions
    case ACTION_TYPES.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload.query
      }
    
    case ACTION_TYPES.SET_CATEGORY_FILTER:
      return {
        ...state,
        categoryFilter: action.payload.category
      }
    
    case ACTION_TYPES.SET_PRICE_FILTER:
      return {
        ...state,
        priceFilter: action.payload.priceRange
      }
    
    case ACTION_TYPES.SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload.sortBy
      }
    
    case ACTION_TYPES.SET_AVAILABILITY_FILTER:
      return {
        ...state,
        availabilityFilter: action.payload.availability
      }
    
    case ACTION_TYPES.CLEAR_FILTERS:
      return {
        ...state,
        searchQuery: '',
        categoryFilter: 'all',
        priceFilter: { min: 0, max: 1000 },
        sortBy: 'name',
        availabilityFilter: 'all'
      }
    
    // User preferences
    case ACTION_TYPES.SET_USER_PREFERENCES:
      return {
        ...state,
        userPreferences: { ...state.userPreferences, ...action.payload.preferences }
      }
    
    case ACTION_TYPES.SET_DELIVERY_ADDRESS:
      return {
        ...state,
        deliveryAddress: action.payload.address
      }
    
    // UI state
    case ACTION_TYPES.SET_MOBILE_MENU_OPEN:
      return {
        ...state,
        isMobileMenuOpen: action.payload.isOpen
      }
    
    case ACTION_TYPES.SET_CART_SIDEBAR_OPEN:
      return {
        ...state,
        isCartSidebarOpen: action.payload.isOpen
      }
    
    case ACTION_TYPES.SET_SEARCH_SIDEBAR_OPEN:
      return {
        ...state,
        isSearchSidebarOpen: action.payload.isOpen
      }
    
    default:
      return state
  }
}

// Helper functions
const calculateCartTotal = (cart, coupon) => {
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  let discount = 0
  
  if (coupon) {
    if (coupon.type === 'percentage') {
      discount = (subtotal * coupon.value) / 100
    } else if (coupon.type === 'fixed') {
      discount = coupon.value
    }
  }
  
  return Math.max(0, subtotal - discount)
}

// Local storage keys
const STORAGE_KEYS = {
  CART: 'fruitopia_cart',
  WISHLIST: 'fruitopia_wishlist',
  USER_PREFERENCES: 'fruitopia_user_preferences',
  DELIVERY_ADDRESS: 'fruitopia_delivery_address'
}

// Context creation
const AppContext = createContext()

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)
  
  // Load data from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEYS.CART)
      const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST)
      const savedPreferences = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES)
      const savedAddress = localStorage.getItem(STORAGE_KEYS.DELIVERY_ADDRESS)
      
      if (savedCart) {
        const cart = JSON.parse(savedCart)
        cart.forEach(item => {
          dispatch({
            type: ACTION_TYPES.ADD_TO_CART,
            payload: { product: item, quantity: item.quantity }
          })
        })
      }
      
      if (savedWishlist) {
        const wishlist = JSON.parse(savedWishlist)
        wishlist.forEach(product => {
          dispatch({
            type: ACTION_TYPES.ADD_TO_WISHLIST,
            payload: { product }
          })
        })
      }
      
      if (savedPreferences) {
        dispatch({
          type: ACTION_TYPES.SET_USER_PREFERENCES,
          payload: { preferences: JSON.parse(savedPreferences) }
        })
      }
      
      if (savedAddress) {
        dispatch({
          type: ACTION_TYPES.SET_DELIVERY_ADDRESS,
          payload: { address: JSON.parse(savedAddress) }
        })
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error)
    }
  }, [])
  
  // Save to localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart))
    } catch (error) {
      console.error('Error saving cart to localStorage:', error)
    }
  }, [state.cart])
  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(state.wishlist))
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error)
    }
  }, [state.wishlist])
  
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(state.userPreferences))
    } catch (error) {
      console.error('Error saving preferences to localStorage:', error)
    }
  }, [state.userPreferences])
  
  useEffect(() => {
    try {
      if (state.deliveryAddress) {
        localStorage.setItem(STORAGE_KEYS.DELIVERY_ADDRESS, JSON.stringify(state.deliveryAddress))
      }
    } catch (error) {
      console.error('Error saving address to localStorage:', error)
    }
  }, [state.deliveryAddress])
  
  // Action creators
  const actions = {
    // Cart actions
    addToCart: (product, quantity = 1) => dispatch({
      type: ACTION_TYPES.ADD_TO_CART,
      payload: { product, quantity }
    }),
    
    removeFromCart: (productId) => dispatch({
      type: ACTION_TYPES.REMOVE_FROM_CART,
      payload: { productId }
    }),
    
    updateCartQuantity: (productId, quantity) => dispatch({
      type: ACTION_TYPES.UPDATE_CART_QUANTITY,
      payload: { productId, quantity }
    }),
    
    clearCart: () => dispatch({ type: ACTION_TYPES.CLEAR_CART }),
    
    applyCoupon: (coupon) => dispatch({
      type: ACTION_TYPES.APPLY_COUPON,
      payload: { coupon }
    }),
    
    removeCoupon: () => dispatch({ type: ACTION_TYPES.REMOVE_COUPON }),
    
    // Wishlist actions
    addToWishlist: (product) => dispatch({
      type: ACTION_TYPES.ADD_TO_WISHLIST,
      payload: { product }
    }),
    
    removeFromWishlist: (productId) => dispatch({
      type: ACTION_TYPES.REMOVE_FROM_WISHLIST,
      payload: { productId }
    }),
    
    clearWishlist: () => dispatch({ type: ACTION_TYPES.CLEAR_WISHLIST }),
    
    moveToCartFromWishlist: (productId, quantity = 1) => dispatch({
      type: ACTION_TYPES.MOVE_TO_CART_FROM_WISHLIST,
      payload: { productId, quantity }
    }),
    
    // Filter and search actions
    setSearchQuery: (query) => dispatch({
      type: ACTION_TYPES.SET_SEARCH_QUERY,
      payload: { query }
    }),
    
    setCategoryFilter: (category) => dispatch({
      type: ACTION_TYPES.SET_CATEGORY_FILTER,
      payload: { category }
    }),
    
    setPriceFilter: (priceRange) => dispatch({
      type: ACTION_TYPES.SET_PRICE_FILTER,
      payload: { priceRange }
    }),
    
    setSortBy: (sortBy) => dispatch({
      type: ACTION_TYPES.SET_SORT_BY,
      payload: { sortBy }
    }),
    
    setAvailabilityFilter: (availability) => dispatch({
      type: ACTION_TYPES.SET_AVAILABILITY_FILTER,
      payload: { availability }
    }),
    
    clearFilters: () => dispatch({ type: ACTION_TYPES.CLEAR_FILTERS }),
    
    // User preferences
    setUserPreferences: (preferences) => dispatch({
      type: ACTION_TYPES.SET_USER_PREFERENCES,
      payload: { preferences }
    }),
    
    setDeliveryAddress: (address) => dispatch({
      type: ACTION_TYPES.SET_DELIVERY_ADDRESS,
      payload: { address }
    }),
    
    // UI actions
    setMobileMenuOpen: (isOpen) => dispatch({
      type: ACTION_TYPES.SET_MOBILE_MENU_OPEN,
      payload: { isOpen }
    }),
    
    setCartSidebarOpen: (isOpen) => dispatch({
      type: ACTION_TYPES.SET_CART_SIDEBAR_OPEN,
      payload: { isOpen }
    }),
    
    setSearchSidebarOpen: (isOpen) => dispatch({
      type: ACTION_TYPES.SET_SEARCH_SIDEBAR_OPEN,
      payload: { isOpen }
    })
  }
  
  const value = {
    ...state,
    ...actions
  }
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

export default AppContext