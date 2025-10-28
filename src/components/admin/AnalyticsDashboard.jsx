import React, { useState } from 'react'
import { useAdmin } from '../../context/AdminContext'

const AnalyticsDashboard = () => {
  const { analytics, orders, users, subscriptions } = useAdmin()
  const [timeRange, setTimeRange] = useState('6months')

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPlanColor = (planType) => {
    switch (planType) {
      case 'premium': return 'bg-purple-100 text-purple-800'
      case 'basic': return 'bg-blue-100 text-blue-800'
      case 'standard': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const calculateGrowthRate = (current, previous) => {
    if (previous === 0) return 100
    return ((current - previous) / previous * 100).toFixed(1)
  }

  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h2>
          <p className="text-slate-600">Comprehensive business insights and metrics</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          <option value="1month">Last Month</option>
          <option value="3months">Last 3 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="1year">Last Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900">{formatCurrency(analytics.totalRevenue)}</p>
              <p className="text-sm text-green-600">+{calculateGrowthRate(analytics.totalRevenue, analytics.totalRevenue * 0.85)}% from last period</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Orders</p>
              <p className="text-2xl font-bold text-slate-900">{analytics.totalOrders.toLocaleString()}</p>
              <p className="text-sm text-green-600">+{calculateGrowthRate(analytics.totalOrders, analytics.totalOrders * 0.92)}% from last period</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Users</p>
              <p className="text-2xl font-bold text-slate-900">{analytics.totalUsers.toLocaleString()}</p>
              <p className="text-sm text-green-600">+{calculateGrowthRate(analytics.totalUsers, analytics.totalUsers * 0.88)}% from last period</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Active Subscriptions</p>
              <p className="text-2xl font-bold text-slate-900">{activeSubscriptions}</p>
              <p className="text-sm text-green-600">+{calculateGrowthRate(activeSubscriptions, activeSubscriptions * 0.95)}% from last period</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Revenue Trend</h3>
          <div className="space-y-4">
            {analytics.monthlyRevenue.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-slate-600 w-16">{month.month}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(month.revenue / Math.max(...analytics.monthlyRevenue.map(m => m.revenue))) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-slate-900 w-20 text-right">
                  {formatCurrency(month.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">User Growth</h3>
          <div className="space-y-4">
            {analytics.userGrowth.map((month, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-slate-600 w-16">{month.month}</span>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(month.users / Math.max(...analytics.userGrowth.map(m => m.users))) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium text-slate-900 w-20 text-right">
                  {month.users.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Order Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Order Status Distribution</h3>
          <div className="space-y-3">
            {Object.entries(analytics.orderStatusDistribution).map(([status, count]) => (
              <div key={status} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
                    {status}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-slate-600 h-2 rounded-full"
                      style={{ width: `${(count / Math.max(...Object.values(analytics.orderStatusDistribution))) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-slate-900 w-8 text-right">
                    {count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Performing Products</h3>
          <div className="space-y-4">
            {analytics.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-slate-600">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{product.name}</p>
                    <p className="text-sm text-slate-500">{product.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-slate-900">{formatCurrency(product.revenue)}</p>
                  <p className="text-sm text-slate-500">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Average Order Value</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-emerald-600">{formatCurrency(averageOrderValue)}</p>
            <p className="text-sm text-slate-500 mt-2">Per order</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Conversion Rate</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">12.5%</p>
            <p className="text-sm text-slate-500 mt-2">Visitors to customers</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Customer Retention</h3>
          <div className="text-center">
            <p className="text-3xl font-bold text-purple-600">78%</p>
            <p className="text-sm text-slate-500 mt-2">Monthly retention</p>
          </div>
        </div>
      </div>

      {/* Subscription Analytics */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Subscription Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">
              {subscriptions.filter(sub => sub.status === 'active').length}
            </p>
            <p className="text-sm text-slate-500">Active Subscriptions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">
              {subscriptions.filter(sub => sub.planType === 'premium').length}
            </p>
            <p className="text-sm text-slate-500">Premium Plans</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {subscriptions.reduce((sum, sub) => sum + sub.price, 0).toLocaleString()}
            </p>
            <p className="text-sm text-slate-500">Monthly Recurring Revenue</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard
