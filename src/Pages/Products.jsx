import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { products, productCategories, filterProducts, sortProducts } from '../data/products'
import ProductCard from '../components/ProductCard'

const Products = () => {
  const [searchParams] = useSearchParams()
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // grid or list
  const {
    searchQuery,
    categoryFilter,
    priceFilter,
    sortBy,
    availabilityFilter,
    setSearchQuery,
    setCategoryFilter,
    setPriceFilter,
    setSortBy,
    setAvailabilityFilter,
    clearFilters
  } = useApp()

  // Initialize filters from URL params
  useEffect(() => {
    const searchParam = searchParams.get('search')
    const categoryParam = searchParams.get('category')
    
    if (searchParam) {
      setSearchQuery(searchParam)
    }
    if (categoryParam) {
      setCategoryFilter(categoryParam)
    }
  }, [searchParams, setSearchQuery, setCategoryFilter])

  // Filter and sort products
  const filteredProducts = filterProducts(products, {
    category: categoryFilter,
    priceRange: priceFilter,
    availability: availabilityFilter,
    searchQuery: searchQuery
  })
  
  const sortedProducts = sortProducts(filteredProducts, sortBy)

  const categories = [
    { id: 'all', name: 'All Products', count: products.length },
    ...productCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      count: products.filter(p => p.category === cat.id).length,
      icon: cat.image
    }))
  ]

  // Price range options
  const priceRanges = [
    { id: 'all', label: 'All Prices', min: 0, max: 1000 },
    { id: 'under-100', label: 'Under ₹100', min: 0, max: 100 },
    { id: '100-200', label: '₹100 - ₹200', min: 100, max: 200 },
    { id: '200-300', label: '₹200 - ₹300', min: 200, max: 300 },
    { id: '300-500', label: '₹300 - ₹500', min: 300, max: 500 },
    { id: 'above-500', label: 'Above ₹500', min: 500, max: 1000 }
  ]

  // Get unique subcategories for current category
  const getSubcategories = (categoryId) => {
    if (categoryId === 'all') return []
    const categoryProducts = products.filter(p => p.category === categoryId)
    const subcategories = [...new Set(categoryProducts.map(p => p.subcategory).filter(Boolean))]
    return subcategories.map(sub => ({
      id: sub,
      name: sub.charAt(0).toUpperCase() + sub.slice(1),
      count: categoryProducts.filter(p => p.subcategory === sub).length
    }))
  }

  const subcategories = getSubcategories(categoryFilter)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-yellow-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-['Poppins']">
              Premium Fruit Collection
            </h1>
            <div className="flex justify-center">
              <p className="text-xl text-gray-600 text-center max-w-5xl px-6 lg:px-12 xl:px-16 pr-8 lg:pr-16 xl:pr-24 font-['Inter']">
                Discover our carefully curated selection of fresh, seasonal, and imported fruits. 
                Quality guaranteed, delivered fresh to your doorstep.
              </p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for fresh fruits, categories, or brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-16 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white shadow-lg"
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Results Summary */}
          <div className="text-center mt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
              <span className="text-sm font-medium text-gray-600">
                Showing {sortedProducts.length} of {products.length} products
                {searchQuery && ` for "${searchQuery}"`}
              </span>
              {(categoryFilter !== 'all' || searchQuery || availabilityFilter !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="ml-2 text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-gray-900 font-['Poppins']">Filters</h2>
                {(categoryFilter !== 'all' || availabilityFilter !== 'all' || priceFilter.min > 0 || priceFilter.max < 1000) && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-green-600 hover:text-green-700 font-medium"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={categoryFilter === category.id}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          className="text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <div className="ml-3 flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            {category.icon && <span className="text-lg">{category.icon}</span>}
                            <span className={`text-sm font-medium ${categoryFilter === category.id ? 'text-green-700' : 'text-gray-700 group-hover:text-gray-900'}`}>
                              {category.name}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1">
                            {category.count}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Subcategories */}
                {subcategories.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Types</h3>
                    <div className="space-y-2">
                      {subcategories.map(subcategory => (
                        <div key={subcategory.id} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{subcategory.name}</span>
                          <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1">
                            {subcategory.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Price Range</h3>
                  <div className="space-y-3">
                    {priceRanges.map(range => (
                      <label key={range.id} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={priceFilter.min === range.min && priceFilter.max === range.max}
                          onChange={() => setPriceFilter({ min: range.min, max: range.max })}
                          className="text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <span className={`ml-3 text-sm font-medium ${
                          priceFilter.min === range.min && priceFilter.max === range.max 
                            ? 'text-green-700' 
                            : 'text-gray-700 group-hover:text-gray-900'
                        }`}>
                          {range.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  
                  {/* Custom Price Range */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Custom Range</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex-1">
                        <input
                          type="number"
                          placeholder="Min"
                          value={priceFilter.min || ''}
                          onChange={(e) => setPriceFilter(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <span className="text-gray-400">-</span>
                      <div className="flex-1">
                        <input
                          type="number"
                          placeholder="Max"
                          value={priceFilter.max === 1000 ? '' : priceFilter.max}
                          onChange={(e) => setPriceFilter(prev => ({ ...prev, max: parseInt(e.target.value) || 1000 }))}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Availability</h3>
                  <div className="space-y-3">
                    {[
                      { id: 'all', name: 'All Products', count: products.length },
                      { id: 'in-stock', name: 'In Stock', count: products.filter(p => p.inStock).length },
                      { id: 'out-of-stock', name: 'Out of Stock', count: products.filter(p => !p.inStock).length }
                    ].map(option => (
                      <label key={option.id} className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          name="availability"
                          value={option.id}
                          checked={availabilityFilter === option.id}
                          onChange={(e) => setAvailabilityFilter(e.target.value)}
                          className="text-green-600 focus:ring-green-500 border-gray-300"
                        />
                        <div className="ml-3 flex items-center justify-between w-full">
                          <span className={`text-sm font-medium ${
                            availabilityFilter === option.id 
                              ? 'text-green-700' 
                              : 'text-gray-700 group-hover:text-gray-900'
                          }`}>
                            {option.name}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1">
                            {option.count}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Quick Filters</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: 'Premium', action: () => setCategoryFilter('imported') },
                      { label: 'Organic', action: () => setCategoryFilter('organic') },
                      { label: 'Seasonal', action: () => setCategoryFilter('seasonal') },
                      { label: 'Under ₹200', action: () => setPriceFilter({ min: 0, max: 200 }) }
                    ].map((filter, index) => (
                      <button
                        key={index}
                        onClick={filter.action}
                        className="px-3 py-2 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-green-100 hover:text-green-700 transition-colors"
                      >
                        {filter.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Main Products Area */}
          <div className="lg:col-span-9">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Mobile Filter Button */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowMobileFilters(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                    Filters
                  </button>
                  
                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-white text-green-600 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-white text-green-600 shadow-sm' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Sort and Actions */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Sort by:</label>
                    <select 
                      value={sortBy} 
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="price-low-high">Price: Low to High</option>
                      <option value="price-high-low">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium text-gray-700">Show:</label>
                    <select 
                      value={availabilityFilter} 
                      onChange={(e) => setAvailabilityFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    >
                      <option value="all">All</option>
                      <option value="in-stock">In Stock</option>
                      <option value="out-of-stock">Out of Stock</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 font-['Poppins']">No products found</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  {searchQuery 
                    ? `No products match your search for "${searchQuery}"`
                    : 'No products match your current filters'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={clearFilters}
                    className="px-8 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors font-semibold"
                  >
                    Clear All Filters
                  </button>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="px-8 py-3 border-2 border-green-500 text-green-600 rounded-full hover:bg-green-50 transition-colors font-semibold"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            ) : (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-4'
              }`}>
                {sortedProducts.map(product => (
                  <div key={product.id} className={viewMode === 'list' ? 'bg-white rounded-2xl shadow-lg border border-gray-100 p-6' : ''}>
                    <ProductCard product={product} viewMode={viewMode} />
                  </div>
                ))}
              </div>
            )}

            {/* Load More / Pagination */}
            {sortedProducts.length > 0 && (
              <div className="text-center pt-12">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                  <p className="text-gray-600 mb-6">
                    Showing {sortedProducts.length} of {products.length} products
                  </p>
                  {sortedProducts.length < products.length && (
                    <button className="px-8 py-4 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                      Load More Products
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900 font-['Poppins']">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Mobile Filter Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Categories</h3>
                  <div className="space-y-3">
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          value={category.id}
                          checked={categoryFilter === category.id}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                          className="text-green-600 focus:ring-green-500"
                        />
                        <div className="ml-3 flex items-center justify-between w-full">
                          <div className="flex items-center gap-2">
                            {category.icon && <span>{category.icon}</span>}
                            <span className="text-sm font-medium text-gray-700">{category.name}</span>
                          </div>
                          <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-1">
                            {category.count}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Price Range</h3>
                  <div className="space-y-3">
                    {priceRanges.map(range => (
                      <label key={range.id} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={priceFilter.min === range.min && priceFilter.max === range.max}
                          onChange={() => setPriceFilter({ min: range.min, max: range.max })}
                          className="text-green-600 focus:ring-green-500"
                        />
                        <span className="ml-3 text-sm font-medium text-gray-700">{range.label}</span>
                      </label>
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
                  onClick={() => setShowMobileFilters(false)}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Products