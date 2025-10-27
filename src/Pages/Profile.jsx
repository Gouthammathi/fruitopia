import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const Profile = () => {
  const navigate = useNavigate()
  const { user, logout, setUser } = useApp()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })

  // Redirect to login if not authenticated
  if (!user) {
    navigate('/login')
    return null
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = () => {
    setUser({ ...user, ...formData })
    setIsEditing(false)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account settings</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-4xl shadow-lg">
                  👤
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  <p className="text-emerald-100">{user.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors"
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-6 py-6">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                    {user.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                ) : (
                  <div className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
                    {user.email}
                  </div>
                )}
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="flex justify-end gap-3 pt-4 border-t">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Account Actions</h3>
          </div>
          <div className="px-6 py-4 space-y-3">
            <button
              onClick={() => navigate('/wishlist')}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">❤️</span>
                <div>
                  <p className="font-medium text-gray-900">View Wishlist</p>
                  <p className="text-sm text-gray-500">See your saved items</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => navigate('/cart')}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🛒</span>
                <div>
                  <p className="font-medium text-gray-900">View Cart</p>
                  <p className="text-sm text-gray-500">View your shopping cart</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-50 transition-colors border border-red-200 text-red-600"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚪</span>
                <div>
                  <p className="font-medium">Logout</p>
                  <p className="text-sm">Sign out of your account</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
