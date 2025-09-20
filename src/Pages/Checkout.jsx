import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const Checkout = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { cart, cartTotal, clearCart } = useApp()
  
  // Get subscription plan from navigation state or cart
  const subscriptionPlan = location.state?.plan || null
  
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    state: '',
    city: '',
    area: '',
    pinCode: '',
    fullAddress: '',
    plan: subscriptionPlan?.name || '',
    subscriptionMonths: '1',
    slot: '',
    subscriptionStartDate: '',
    numberOfSubscriptions: '1',
    couponCode: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptionEndDate, setSubscriptionEndDate] = useState('')
  const [totalAmount, setTotalAmount] = useState(0)
  const [finalPrice, setFinalPrice] = useState(0)
  
  // Plan options
  const planOptions = [
    { value: 'trial', label: 'Trial Plan - ₹1,599 (2 weeks)', price: 1599, duration: 0.5 },
    { value: 'standard', label: 'Standard Plan - ₹2,799 (1 month)', price: 2799, duration: 1 },
    { value: 'corporate', label: 'Corporate Plan - ₹2,299 (1 month)', price: 2299, duration: 1 },
    { value: 'mini-standard', label: 'Mini Bowl Standard - ₹1,799 (1 month)', price: 1799, duration: 1 },
    { value: 'mini-corporate', label: 'Mini Bowl Corporate - ₹1,599 (1 month)', price: 1599, duration: 1 }
  ]
  
  const slotOptions = [
    '7:00 AM - 9:00 AM',
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '1:00 PM - 3:00 PM',
    '3:00 PM - 5:00 PM',
    '5:00 PM - 7:00 PM'
  ]
  
  const stateOptions = [
    'Maharashtra',
    'Gujarat',
    'Karnataka',
    'Tamil Nadu',
    'Delhi',
    'Uttar Pradesh',
    'West Bengal',
    'Rajasthan'
  ]
  
  const cityOptions = {
    Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    Karnataka: ['Bangalore', 'Mysore', 'Mangalore', 'Hubli'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
    Delhi: ['New Delhi', 'Central Delhi', 'South Delhi', 'North Delhi'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri'],
    Rajasthan: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota']
  }
  
  useEffect(() => {
    if (subscriptionPlan) {
      setFormData(prev => ({ ...prev, plan: subscriptionPlan.value || subscriptionPlan.name }))
    }
  }, [subscriptionPlan])
  
  // Calculate subscription end date and pricing
  useEffect(() => {
    if (formData.subscriptionStartDate && formData.plan && formData.subscriptionMonths) {
      const startDate = new Date(formData.subscriptionStartDate)
      const selectedPlan = planOptions.find(p => p.value === formData.plan)
      
      if (selectedPlan) {
        const monthsToAdd = parseFloat(formData.subscriptionMonths) * selectedPlan.duration
        const endDate = new Date(startDate)
        endDate.setMonth(endDate.getMonth() + monthsToAdd)
        setSubscriptionEndDate(endDate.toDateString())
        
        // Calculate pricing
        const subscriptions = parseInt(formData.numberOfSubscriptions) || 1
        const baseTotal = selectedPlan.price * parseFloat(formData.subscriptionMonths) * subscriptions
        setTotalAmount(baseTotal)
        setFinalPrice(baseTotal) // TODO: Apply coupon discount here
      }
    }
  }, [formData.subscriptionStartDate, formData.plan, formData.subscriptionMonths, formData.numberOfSubscriptions])
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
    
    // Reset city when state changes
    if (name === 'state') {
      setFormData(prev => ({ ...prev, city: '' }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required'
    else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\s+/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number'
    }
    
    if (!formData.state) newErrors.state = 'State is required'
    if (!formData.city) newErrors.city = 'City is required'
    if (!formData.area.trim()) newErrors.area = 'Area is required'
    if (!formData.pinCode.trim()) newErrors.pinCode = 'Pin code is required'
    else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'Please enter a valid 6-digit pin code'
    }
    
    if (!formData.fullAddress.trim()) newErrors.fullAddress = 'Full address is required'
    if (!formData.plan) newErrors.plan = 'Please select a plan'
    if (!formData.slot) newErrors.slot = 'Please select a delivery slot'
    if (!formData.subscriptionStartDate) newErrors.subscriptionStartDate = 'Start date is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear cart if there were items
      if (cart.length > 0) {
        clearCart()
      }
      
      // Navigate to success page or show success message
      alert('Order placed successfully! You will receive a confirmation email shortly.')
      navigate('/', { replace: true })
      
    } catch (error) {
      console.error('Error submitting order:', error)
      alert('There was an error placing your order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const applyCoupon = () => {
    // TODO: Implement coupon logic
    alert('Coupon functionality will be implemented')
  }
  
  // If no plan is selected and cart is empty, redirect to home
  if (!subscriptionPlan && cart.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="text-8xl mb-8">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No items to checkout</h1>
            <p className="text-lg text-gray-600 mb-8">Please select a plan or add items to your cart first.</p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Go to Home
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your subscription order</p>
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Customer Information Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="1234 567 890"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.state ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select State</option>
                    {stateOptions.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    disabled={!formData.state}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    } ${!formData.state ? 'bg-gray-100' : ''}`}
                  >
                    <option value="">Select City</option>
                    {formData.state && cityOptions[formData.state]?.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                {/* Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Area <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="Downtown"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.area ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area}</p>}
                </div>

                {/* Pin Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pin Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    placeholder="123456"
                    maxLength="6"
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.pinCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.pinCode && <p className="text-red-500 text-sm mt-1">{errors.pinCode}</p>}
                </div>
              </div>

              {/* Full Address */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleInputChange}
                  placeholder="123, Example Street"
                  rows="3"
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors resize-none ${
                    errors.fullAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.fullAddress && <p className="text-red-500 text-sm mt-1">{errors.fullAddress}</p>}
              </div>
            </div>

            {/* Subscription Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Subscription Details</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Plan */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="plan"
                    value={formData.plan}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.plan ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Plan</option>
                    {planOptions.map(plan => (
                      <option key={plan.value} value={plan.value}>{plan.label}</option>
                    ))}
                  </select>
                  {errors.plan && <p className="text-red-500 text-sm mt-1">{errors.plan}</p>}
                </div>

                {/* Subscription Months */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subscription Months <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subscriptionMonths"
                    value={formData.subscriptionMonths}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  >
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                  </select>
                </div>

                {/* Delivery Slot */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Slot <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="slot"
                    value={formData.slot}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.slot ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Slot</option>
                    {slotOptions.map(slot => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.slot && <p className="text-red-500 text-sm mt-1">{errors.slot}</p>}
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subscription Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="subscriptionStartDate"
                    value={formData.subscriptionStartDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
                      errors.subscriptionStartDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.subscriptionStartDate && <p className="text-red-500 text-sm mt-1">{errors.subscriptionStartDate}</p>}
                </div>

                {/* Number of Subscriptions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    No of Subscriptions <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="numberOfSubscriptions"
                    value={formData.numberOfSubscriptions}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    placeholder="Enter number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                </div>
              </div>

              {/* Subscription End Date Display */}
              {subscriptionEndDate && (
                <div className="mt-6 p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-green-700">
                      Subscription End Date: {subscriptionEndDate}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              {/* Selected Plan Display */}
              {formData.plan && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">Selected Plan</h3>
                  <p className="text-sm text-gray-600">
                    {planOptions.find(p => p.value === formData.plan)?.label}
                  </p>
                  {formData.subscriptionMonths && formData.numberOfSubscriptions && (
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.subscriptionMonths} month(s) × {formData.numberOfSubscriptions} subscription(s)
                    </p>
                  )}
                </div>
              )}
              
              {/* Coupon Section */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Apply Coupon</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="couponCode"
                    value={formData.couponCode}
                    onChange={handleInputChange}
                    placeholder="Enter coupon code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>
              
              {/* Pricing Breakdown */}
              <div className="space-y-3 border-t border-gray-200 pt-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold">₹{totalAmount}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Final Price</span>
                    <span className="text-green-600">₹{finalPrice}</span>
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout