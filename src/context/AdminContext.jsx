import React, { createContext, useContext, useReducer, useEffect } from 'react'

// Action types for admin
const ADMIN_ACTION_TYPES = {
  // Admin authentication
  SET_ADMIN_USER: 'SET_ADMIN_USER',
  ADMIN_LOGOUT: 'ADMIN_LOGOUT',
  
  // User management
  SET_USERS: 'SET_USERS',
  ADD_USER: 'ADD_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  
  // Product management
  SET_PRODUCTS: 'SET_PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  
  // Order management
  SET_ORDERS: 'SET_ORDERS',
  UPDATE_ORDER_STATUS: 'UPDATE_ORDER_STATUS',
  DELETE_ORDER: 'DELETE_ORDER',
  
  // Subscription management
  SET_SUBSCRIPTIONS: 'SET_SUBSCRIPTIONS',
  UPDATE_SUBSCRIPTION: 'UPDATE_SUBSCRIPTION',
  CANCEL_SUBSCRIPTION: 'CANCEL_SUBSCRIPTION',
  
  // Analytics
  SET_ANALYTICS: 'SET_ANALYTICS',
  SET_DASHBOARD_STATS: 'SET_DASHBOARD_STATS',
  
  // Inventory management
  SET_INVENTORY: 'SET_INVENTORY',
  UPDATE_INVENTORY: 'UPDATE_INVENTORY',
  
  // UI state
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR'
}

// Initial admin state
const initialAdminState = {
  // Admin authentication
  adminUser: null,
  isAdminAuthenticated: false,
  
  // Data management
  users: [],
  products: [],
  orders: [],
  subscriptions: [],
  inventory: [],
  
  // Analytics
  analytics: {
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    monthlyRevenue: [],
    topProducts: [],
    userGrowth: [],
    orderStatusDistribution: {}
  },
  
  dashboardStats: {
    todayOrders: 0,
    todayRevenue: 0,
    pendingOrders: 0,
    lowStockItems: 0,
    activeSubscriptions: 0,
    newUsersToday: 0
  },
  
  // UI state
  activeTab: 'dashboard',
  loading: false,
  error: null
}

// Admin reducer
const adminReducer = (state, action) => {
  switch (action.type) {
    // Admin authentication
    case ADMIN_ACTION_TYPES.SET_ADMIN_USER:
      return {
        ...state,
        adminUser: action.payload.user,
        isAdminAuthenticated: true
      }
    
    case ADMIN_ACTION_TYPES.ADMIN_LOGOUT:
      return {
        ...state,
        adminUser: null,
        isAdminAuthenticated: false
      }
    
    // User management
    case ADMIN_ACTION_TYPES.SET_USERS:
      return {
        ...state,
        users: action.payload.users
      }
    
    case ADMIN_ACTION_TYPES.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload.user]
      }
    
    case ADMIN_ACTION_TYPES.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload.userId
            ? { ...user, ...action.payload.updates }
            : user
        )
      }
    
    case ADMIN_ACTION_TYPES.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload.userId)
      }
    
    // Product management
    case ADMIN_ACTION_TYPES.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload.products
      }
    
    case ADMIN_ACTION_TYPES.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload.product]
      }
    
    case ADMIN_ACTION_TYPES.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.productId
            ? { ...product, ...action.payload.updates }
            : product
        )
      }
    
    case ADMIN_ACTION_TYPES.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload.productId)
      }
    
    // Order management
    case ADMIN_ACTION_TYPES.SET_ORDERS:
      return {
        ...state,
        orders: action.payload.orders
      }
    
    case ADMIN_ACTION_TYPES.UPDATE_ORDER_STATUS:
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status, updatedAt: new Date().toISOString() }
            : order
        )
      }
    
    case ADMIN_ACTION_TYPES.DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(order => order.id !== action.payload.orderId)
      }
    
    // Subscription management
    case ADMIN_ACTION_TYPES.SET_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload.subscriptions
      }
    
    case ADMIN_ACTION_TYPES.UPDATE_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: state.subscriptions.map(subscription =>
          subscription.id === action.payload.subscriptionId
            ? { ...subscription, ...action.payload.updates }
            : subscription
        )
      }
    
    case ADMIN_ACTION_TYPES.CANCEL_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: state.subscriptions.map(subscription =>
          subscription.id === action.payload.subscriptionId
            ? { ...subscription, status: 'cancelled', cancelledAt: new Date().toISOString() }
            : subscription
        )
      }
    
    // Analytics
    case ADMIN_ACTION_TYPES.SET_ANALYTICS:
      return {
        ...state,
        analytics: action.payload.analytics
      }
    
    case ADMIN_ACTION_TYPES.SET_DASHBOARD_STATS:
      return {
        ...state,
        dashboardStats: action.payload.stats
      }
    
    // Inventory management
    case ADMIN_ACTION_TYPES.SET_INVENTORY:
      return {
        ...state,
        inventory: action.payload.inventory
      }
    
    case ADMIN_ACTION_TYPES.UPDATE_INVENTORY:
      return {
        ...state,
        inventory: state.inventory.map(item =>
          item.productId === action.payload.productId
            ? { ...item, ...action.payload.updates }
            : item
        )
      }
    
    // UI state
    case ADMIN_ACTION_TYPES.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.payload.tab
      }
    
    case ADMIN_ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    
    case ADMIN_ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload.error
      }
    
    default:
      return state
  }
}

// Mock data generators
const generateMockUsers = () => [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 98765 43210',
    address: '123 Main St, Mumbai, Maharashtra',
    joinDate: '2024-01-15',
    totalOrders: 12,
    totalSpent: 4500,
    status: 'active',
    subscription: 'premium'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+91 98765 43211',
    address: '456 Park Ave, Delhi, Delhi',
    joinDate: '2024-02-20',
    totalOrders: 8,
    totalSpent: 3200,
    status: 'active',
    subscription: 'basic'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    phone: '+91 98765 43212',
    address: '789 Oak St, Bangalore, Karnataka',
    joinDate: '2024-03-10',
    totalOrders: 5,
    totalSpent: 1800,
    status: 'inactive',
    subscription: null
  }
]

const generateMockOrders = () => [
  {
    id: 1,
    orderNumber: 'ORD-001',
    userId: 1,
    userName: 'John Doe',
    items: [
      { productId: 1, name: 'Alphonso Mango', quantity: 2, price: 450 },
      { productId: 2, name: 'Fresh Strawberries', quantity: 1, price: 280 }
    ],
    total: 1180,
    status: 'pending',
    paymentMethod: 'UPI',
    deliveryAddress: '123 Main St, Mumbai, Maharashtra',
    orderDate: '2024-12-20T10:30:00Z',
    deliveryDate: '2024-12-21T14:00:00Z'
  },
  {
    id: 2,
    orderNumber: 'ORD-002',
    userId: 2,
    userName: 'Jane Smith',
    items: [
      { productId: 4, name: 'Imported Red Apples', quantity: 1, price: 320 }
    ],
    total: 320,
    status: 'delivered',
    paymentMethod: 'Credit Card',
    deliveryAddress: '456 Park Ave, Delhi, Delhi',
    orderDate: '2024-12-19T15:45:00Z',
    deliveryDate: '2024-12-20T11:30:00Z'
  },
  {
    id: 3,
    orderNumber: 'ORD-003',
    userId: 1,
    userName: 'John Doe',
    items: [
      { productId: 7, name: 'Organic Bananas', quantity: 3, price: 60 }
    ],
    total: 180,
    status: 'shipped',
    paymentMethod: 'UPI',
    deliveryAddress: '123 Main St, Mumbai, Maharashtra',
    orderDate: '2024-12-18T09:15:00Z',
    deliveryDate: '2024-12-19T16:00:00Z'
  }
]

const generateMockSubscriptions = () => [
  {
    id: 1,
    userId: 1,
    userName: 'John Doe',
    planType: 'premium',
    planName: 'Premium Plan',
    price: 999,
    status: 'active',
    startDate: '2024-11-01',
    nextDelivery: '2024-12-25',
    deliveriesRemaining: 8,
    totalDeliveries: 12
  },
  {
    id: 2,
    userId: 2,
    userName: 'Jane Smith',
    planType: 'basic',
    planName: 'Basic Plan',
    price: 499,
    status: 'active',
    startDate: '2024-12-01',
    nextDelivery: '2024-12-28',
    deliveriesRemaining: 11,
    totalDeliveries: 12
  }
]

const generateMockAnalytics = () => ({
  totalUsers: 1250,
  totalOrders: 3420,
  totalRevenue: 1250000,
  monthlyRevenue: [
    { month: 'Jan', revenue: 85000 },
    { month: 'Feb', revenue: 92000 },
    { month: 'Mar', revenue: 105000 },
    { month: 'Apr', revenue: 98000 },
    { month: 'May', revenue: 112000 },
    { month: 'Jun', revenue: 125000 }
  ],
  topProducts: [
    { id: 1, name: 'Alphonso Mango', orders: 245, revenue: 110250 },
    { id: 2, name: 'Fresh Strawberries', orders: 189, revenue: 52920 },
    { id: 4, name: 'Imported Red Apples', orders: 156, revenue: 49920 }
  ],
  userGrowth: [
    { month: 'Jan', users: 850 },
    { month: 'Feb', users: 920 },
    { month: 'Mar', users: 1050 },
    { month: 'Apr', users: 980 },
    { month: 'May', users: 1120 },
    { month: 'Jun', users: 1250 }
  ],
  orderStatusDistribution: {
    pending: 15,
    confirmed: 25,
    shipped: 30,
    delivered: 180,
    cancelled: 5
  }
})

// Context creation
const AdminContext = createContext()

// Admin context provider
export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialAdminState)
  
  // Load mock data on mount
  useEffect(() => {
    dispatch({
      type: ADMIN_ACTION_TYPES.SET_USERS,
      payload: { users: generateMockUsers() }
    })
    
    dispatch({
      type: ADMIN_ACTION_TYPES.SET_ORDERS,
      payload: { orders: generateMockOrders() }
    })
    
    dispatch({
      type: ADMIN_ACTION_TYPES.SET_SUBSCRIPTIONS,
      payload: { subscriptions: generateMockSubscriptions() }
    })
    
    dispatch({
      type: ADMIN_ACTION_TYPES.SET_ANALYTICS,
      payload: { analytics: generateMockAnalytics() }
    })
    
    dispatch({
      type: ADMIN_ACTION_TYPES.SET_DASHBOARD_STATS,
      payload: {
        stats: {
          todayOrders: 12,
          todayRevenue: 4500,
          pendingOrders: 8,
          lowStockItems: 3,
          activeSubscriptions: 45,
          newUsersToday: 5
        }
      }
    })
  }, [])
  
  // Action creators
  const actions = {
    // Admin authentication
    setAdminUser: (user) => dispatch({
      type: ADMIN_ACTION_TYPES.SET_ADMIN_USER,
      payload: { user }
    }),
    
    adminLogout: () => dispatch({ type: ADMIN_ACTION_TYPES.ADMIN_LOGOUT }),
    
    // User management
    setUsers: (users) => dispatch({
      type: ADMIN_ACTION_TYPES.SET_USERS,
      payload: { users }
    }),
    
    addUser: (user) => dispatch({
      type: ADMIN_ACTION_TYPES.ADD_USER,
      payload: { user }
    }),
    
    updateUser: (userId, updates) => dispatch({
      type: ADMIN_ACTION_TYPES.UPDATE_USER,
      payload: { userId, updates }
    }),
    
    deleteUser: (userId) => dispatch({
      type: ADMIN_ACTION_TYPES.DELETE_USER,
      payload: { userId }
    }),
    
    // Product management
    setProducts: (products) => dispatch({
      type: ADMIN_ACTION_TYPES.SET_PRODUCTS,
      payload: { products }
    }),
    
    addProduct: (product) => dispatch({
      type: ADMIN_ACTION_TYPES.ADD_PRODUCT,
      payload: { product }
    }),
    
    updateProduct: (productId, updates) => dispatch({
      type: ADMIN_ACTION_TYPES.UPDATE_PRODUCT,
      payload: { productId, updates }
    }),
    
    deleteProduct: (productId) => dispatch({
      type: ADMIN_ACTION_TYPES.DELETE_PRODUCT,
      payload: { productId }
    }),
    
    // Order management
    setOrders: (orders) => dispatch({
      type: ADMIN_ACTION_TYPES.SET_ORDERS,
      payload: { orders }
    }),
    
    updateOrderStatus: (orderId, status) => dispatch({
      type: ADMIN_ACTION_TYPES.UPDATE_ORDER_STATUS,
      payload: { orderId, status }
    }),
    
    deleteOrder: (orderId) => dispatch({
      type: ADMIN_ACTION_TYPES.DELETE_ORDER,
      payload: { orderId }
    }),
    
    // Subscription management
    setSubscriptions: (subscriptions) => dispatch({
      type: ADMIN_ACTION_TYPES.SET_SUBSCRIPTIONS,
      payload: { subscriptions }
    }),
    
    updateSubscription: (subscriptionId, updates) => dispatch({
      type: ADMIN_ACTION_TYPES.UPDATE_SUBSCRIPTION,
      payload: { subscriptionId, updates }
    }),
    
    cancelSubscription: (subscriptionId) => dispatch({
      type: ADMIN_ACTION_TYPES.CANCEL_SUBSCRIPTION,
      payload: { subscriptionId }
    }),
    
    // Analytics
    setAnalytics: (analytics) => dispatch({
      type: ADMIN_ACTION_TYPES.SET_ANALYTICS,
      payload: { analytics }
    }),
    
    setDashboardStats: (stats) => dispatch({
      type: ADMIN_ACTION_TYPES.SET_DASHBOARD_STATS,
      payload: { stats }
    }),
    
    // Inventory management
    setInventory: (inventory) => dispatch({
      type: ADMIN_ACTION_TYPES.SET_INVENTORY,
      payload: { inventory }
    }),
    
    updateInventory: (productId, updates) => dispatch({
      type: ADMIN_ACTION_TYPES.UPDATE_INVENTORY,
      payload: { productId, updates }
    }),
    
    // UI actions
    setActiveTab: (tab) => dispatch({
      type: ADMIN_ACTION_TYPES.SET_ACTIVE_TAB,
      payload: { tab }
    }),
    
    setLoading: (loading) => dispatch({
      type: ADMIN_ACTION_TYPES.SET_LOADING,
      payload: { loading }
    }),
    
    setError: (error) => dispatch({
      type: ADMIN_ACTION_TYPES.SET_ERROR,
      payload: { error }
    })
  }
  
  const value = {
    ...state,
    ...actions
  }
  
  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  )
}

// Custom hook to use admin context
export const useAdmin = () => {
  const context = useContext(AdminContext)
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider')
  }
  return context
}

export default AdminContext
