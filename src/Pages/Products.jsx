import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { products, productCategories, filterProducts, sortProducts } from '../data/products'
import ProductCard from '../components/ProductCard'
import SearchFilters from '../components/SearchFilters'

const Products = () => {
  const [searchParams] = useSearchParams()
  const [showFilters, setShowFilters] = useState(false)
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
    setAvailabilityFilter
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
      count: products.filter(p => p.category === cat.id).length
    }))
  ]

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Fresh Fruits Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our premium selection of fresh, seasonal, and imported fruits. 
            Quality guaranteed, delivered fresh to your doorstep.
          </p>
          <div className="mt-6 text-sm text-gray-500">
            Showing {sortedProducts.length} of {products.length} products
            {searchQuery && ` for "${searchQuery}"`}
          </div>
        </div>
      </section>

      {/* Filters and Categories */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setCategoryFilter(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      categoryFilter === category.id
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* Filter Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Search Input */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                {/* Advanced Filters Button */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  Advanced Filters
                </button>

                {/* Availability Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-medium">Show:</span>
                  <select 
                    value={availabilityFilter} 
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="all">All Products</option>
                    <option value="in-stock">In Stock Only</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
                
                {/* Sort Options */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                  <select 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="name">Name</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Advanced Filters Sidebar */}
            <div className="hidden lg:block">
              <SearchFilters isOpen={true} onClose={() => {}} />
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
              {sortedProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-600 mb-6">
                    {searchQuery 
                      ? `No products match your search for "${searchQuery}"`
                      : 'No products match your current filters'
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setCategoryFilter('all')
                      setAvailabilityFilter('all')
                    }}
                    className="px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Load More Button (if needed) */}
              {sortedProducts.length > 0 && sortedProducts.length < products.length && (
                <div className="text-center pt-12">
                  <button className="px-8 py-4 bg-white border-2 border-green-500 text-green-600 font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl">
                    Load More Products
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Mobile Filters Modal */}
        <SearchFilters isOpen={showFilters} onClose={() => setShowFilters(false)} />
      </section>
    </div>
  )
}

export default Products