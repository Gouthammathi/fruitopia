import React, { useState } from 'react'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const categories = [
    { id: 'all', name: 'All Products', count: 24 },
    { id: 'seasonal', name: 'Seasonal', count: 8 },
    { id: 'imported', name: 'Imported', count: 6 },
    { id: 'organic', name: 'Organic', count: 10 }
  ]

  const products = [
    {
      id: 1,
      name: "Alphonso Mango",
      category: "seasonal",
      price: 450,
      originalPrice: 499,
      image: "🥭",
      badge: "Premium",
      inStock: true,
      description: "Sweet and juicy Alphonso mangoes from Ratnagiri"
    },
    {
      id: 2,
      name: "Imported Apples",
      category: "imported",
      price: 320,
      originalPrice: 380,
      image: "🍎",
      badge: "Fresh",
      inStock: true,
      description: "Crisp and sweet imported apples"
    },
    {
      id: 3,
      name: "Sweet Oranges",
      category: "seasonal",
      price: 180,
      originalPrice: 220,
      image: "🍊",
      badge: "Juicy",
      inStock: true,
      description: "Fresh and juicy oranges packed with vitamin C"
    },
    {
      id: 4,
      name: "Red Cherries",
      category: "imported",
      price: 699,
      originalPrice: 749,
      image: "🍒",
      badge: "Limited",
      inStock: false,
      description: "Premium imported cherries"
    },
    {
      id: 5,
      name: "Organic Bananas",
      category: "organic",
      price: 60,
      originalPrice: 80,
      image: "🍌",
      badge: "Organic",
      inStock: true,
      description: "Naturally grown organic bananas"
    },
    {
      id: 6,
      name: "Fresh Strawberries",
      category: "seasonal",
      price: 280,
      originalPrice: 320,
      image: "🍓",
      badge: "Fresh",
      inStock: true,
      description: "Sweet and fresh strawberries"
    },
    {
      id: 7,
      name: "Kiwi Fruit",
      category: "imported",
      price: 180,
      originalPrice: 200,
      image: "🥝",
      badge: "Vitamin C",
      inStock: true,
      description: "Rich in vitamin C and antioxidants"
    },
    {
      id: 8,
      name: "Dragon Fruit",
      category: "imported",
      price: 250,
      originalPrice: 300,
      image: "🐉",
      badge: "Exotic",
      inStock: true,
      description: "Exotic dragon fruit with unique taste"
    },
    {
      id: 9,
      name: "Organic Grapes",
      category: "organic",
      price: 120,
      originalPrice: 150,
      image: "🍇",
      badge: "Organic",
      inStock: true,
      description: "Sweet organic grapes"
    }
  ]

  const filteredProducts = products.filter(product => 
    selectedCategory === 'all' || product.category === selectedCategory
  )

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return 0
  })

  return (
    <div>
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
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <div key={product.id} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100">
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center text-6xl mb-4 group-hover:scale-105 transition-transform duration-300">
                    {product.image}
                  </div>
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      product.badge === 'Premium' ? 'bg-yellow-500 text-white' :
                      product.badge === 'Fresh' ? 'bg-green-500 text-white' :
                      product.badge === 'Limited' ? 'bg-red-500 text-white' :
                      product.badge === 'Organic' ? 'bg-blue-500 text-white' :
                      'bg-gray-500 text-white'
                    }`}>
                      {product.badge}
                    </span>
                    {!product.inStock && (
                      <span className="px-2 py-1 bg-gray-500 text-white text-xs font-semibold rounded-full">
                        Sold Out
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    {product.originalPrice > product.price && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      className={`flex-1 px-4 py-3 rounded-full font-semibold transition-all duration-200 ${
                        product.inStock
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transform group-hover:scale-105'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!product.inStock}
                    >
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button className="p-3 rounded-full border border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-500 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center pt-12">
            <button className="px-8 py-4 bg-white border-2 border-green-500 text-green-600 font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl">
              Load More Products
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Products