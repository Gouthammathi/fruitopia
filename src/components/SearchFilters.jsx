import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { productCategories, products } from '../data/products'

const SearchFilters = ({ isOpen, onClose }) => {
  const {
    categoryFilter,
    priceFilter,
    sortBy,
    availabilityFilter,
    setCategoryFilter,
    setPriceFilter,
    setSortBy,
    setAvailabilityFilter,
    clearFilters
  } = useApp()

  const [tempPriceFilter, setTempPriceFilter] = useState(priceFilter)

  const handleApplyPriceFilter = () => {
    setPriceFilter(tempPriceFilter)
  }

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    ...productCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      count: products.filter(p => p.category === cat.id).length
    }))
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:relative lg:inset-auto lg:z-auto">
      {/* Backdrop for mobile */}
      <div className="absolute inset-0 bg-black/50 lg:hidden" onClick={onClose}></div>
      
      {/* Filter Panel */}
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl lg:relative lg:max-w-none lg:w-80 lg:shadow-lg lg:rounded-2xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:rounded-t-2xl">
            <h2 className="text-lg font-semibold text-gray-900">Filters & Sort</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors lg:hidden"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Filters Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <label key={category.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={categoryFilter === category.id}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="flex-1 text-gray-700">{category.name}</span>
                    <span className="text-sm text-gray-500">({category.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                    <input
                      type="number"
                      value={tempPriceFilter.min}
                      onChange={(e) => setTempPriceFilter(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="₹0"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                    <input
                      type="number"
                      value={tempPriceFilter.max}
                      onChange={(e) => setTempPriceFilter(prev => ({ ...prev, max: parseInt(e.target.value) || 1000 }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="₹1000"
                    />
                  </div>
                </div>
                <button
                  onClick={handleApplyPriceFilter}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Apply Price Filter
                </button>
                <div className="text-sm text-gray-600">
                  Current: ₹{priceFilter.min} - ₹{priceFilter.max}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Availability</h3>
              <div className="space-y-2">
                {[
                  { id: 'all', name: 'All Products' },
                  { id: 'in-stock', name: 'In Stock Only' },
                  { id: 'out-of-stock', name: 'Out of Stock' }
                ].map(option => (
                  <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="availability"
                      value={option.id}
                      checked={availabilityFilter === option.id}
                      onChange={(e) => setAvailabilityFilter(e.target.value)}
                      className="text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-700">{option.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>

            {/* Quick Filters */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quick Filters</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Premium', action: () => setCategoryFilter('imported') },
                  { label: 'Organic', action: () => setCategoryFilter('organic') },
                  { label: 'Seasonal', action: () => setCategoryFilter('seasonal') },
                  { label: 'Under ₹200', action: () => setPriceFilter({ min: 0, max: 200 }) },
                  { label: 'High Rated', action: () => setSortBy('rating') }
                ].map((filter, index) => (
                  <button
                    key={index}
                    onClick={filter.action}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-green-100 hover:text-green-700 transition-colors"
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 p-4 space-y-2">
            <button
              onClick={clearFilters}
              className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear All Filters
            </button>
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors lg:hidden"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchFilters