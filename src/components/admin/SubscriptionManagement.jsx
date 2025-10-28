import React, { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'

const SubscriptionManagement = () => {
  const { subscriptions, updateSubscription, cancelSubscription } = useAdmin()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedSubscription, setSelectedSubscription] = useState(null)

  const filteredSubscriptions = subscriptions.filter(subscription => {
    const matchesSearch = subscription.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.planName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCancelSubscription = (subscriptionId) => {
    if (window.confirm('Are you sure you want to cancel this subscription?')) {
      cancelSubscription(subscriptionId)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'paused': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'expired': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getPlanColor = (planType) => {
    switch (planType) {
      case 'premium': return 'bg-purple-100 text-purple-800'
      case 'basic': return 'bg-blue-100 text-blue-800'
      case 'standard': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Subscription Management</h2>
          <p className="text-slate-600">Manage customer subscription plans</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">{subscriptions.length}</p>
            <p className="text-xs text-slate-500">Total Subscriptions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {subscriptions.filter(s => s.status === 'active').length}
            </p>
            <p className="text-xs text-slate-500">Active</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search subscriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="paused">Paused</option>
            <option value="cancelled">Cancelled</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Subscriptions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubscriptions.map((subscription) => (
          <div key={subscription.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">{subscription.userName}</h3>
                <p className="text-sm text-slate-500">ID: {subscription.id}</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(subscription.status)}`}>
                  {subscription.status}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPlanColor(subscription.planType)}`}>
                  {subscription.planType}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Plan</span>
                <span className="text-sm font-medium text-slate-900">{subscription.planName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Price</span>
                <span className="text-sm font-medium text-slate-900">₹{subscription.price}/month</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Start Date</span>
                <span className="text-sm font-medium text-slate-900">{formatDate(subscription.startDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Next Delivery</span>
                <span className="text-sm font-medium text-slate-900">{formatDate(subscription.nextDelivery)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Deliveries Left</span>
                <span className="text-sm font-medium text-slate-900">
                  {subscription.deliveriesRemaining}/{subscription.totalDeliveries}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedSubscription(subscription)}
                className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm"
              >
                View Details
              </button>
              {subscription.status === 'active' && (
                <button
                  onClick={() => handleCancelSubscription(subscription.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Subscription Details Modal */}
      {selectedSubscription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900">Subscription Details</h3>
              <button
                onClick={() => setSelectedSubscription(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Subscription Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Subscription Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-slate-500">ID:</span> {selectedSubscription.id}</p>
                    <p><span className="text-slate-500">Plan:</span> {selectedSubscription.planName}</p>
                    <p><span className="text-slate-500">Type:</span> 
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPlanColor(selectedSubscription.planType)}`}>
                        {selectedSubscription.planType}
                      </span>
                    </p>
                    <p><span className="text-slate-500">Status:</span> 
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedSubscription.status)}`}>
                        {selectedSubscription.status}
                      </span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-slate-500">Name:</span> {selectedSubscription.userName}</p>
                    <p><span className="text-slate-500">User ID:</span> {selectedSubscription.userId}</p>
                  </div>
                </div>
              </div>

              {/* Subscription Timeline */}
              <div>
                <h4 className="font-medium text-slate-900 mb-3">Subscription Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Start Date</p>
                      <p className="text-sm text-slate-500">Subscription began</p>
                    </div>
                    <span className="text-sm font-medium text-slate-900">{formatDate(selectedSubscription.startDate)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-900">Next Delivery</p>
                      <p className="text-sm text-slate-500">Scheduled delivery</p>
                    </div>
                    <span className="text-sm font-medium text-slate-900">{formatDate(selectedSubscription.nextDelivery)}</span>
                  </div>
                  {selectedSubscription.cancelledAt && (
                    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium text-red-900">Cancelled</p>
                        <p className="text-sm text-red-500">Subscription cancelled</p>
                      </div>
                      <span className="text-sm font-medium text-red-900">{formatDate(selectedSubscription.cancelledAt)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Subscription Stats */}
              <div>
                <h4 className="font-medium text-slate-900 mb-3">Subscription Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-emerald-600">{selectedSubscription.deliveriesRemaining}</p>
                    <p className="text-sm text-slate-500">Deliveries Remaining</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">{selectedSubscription.totalDeliveries}</p>
                    <p className="text-sm text-slate-500">Total Deliveries</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-slate-900 mb-3">Actions</h4>
                <div className="flex items-center gap-3">
                  {selectedSubscription.status === 'active' && (
                    <button
                      onClick={() => {
                        handleCancelSubscription(selectedSubscription.id)
                        setSelectedSubscription(null)
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Cancel Subscription
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedSubscription(null)}
                    className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-300 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubscriptionManagement
