import React from 'react'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%2310b981\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"7\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')", backgroundRepeat: 'repeat'}}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 lg:pt-12 lg:pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-6 lg:pr-8">
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                  🌱 Premium Fresh Fruits
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
                  Fresh & Healthy
                  <span className="block text-green-600">Fruits Delivered</span>
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  Experience the finest selection of fresh, organic fruits delivered straight to your doorstep. Quality guaranteed, satisfaction assured.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Shop Now
                </button>
                <button className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:border-green-500 hover:text-green-600 transition-all duration-200">
                  Learn More
                </button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">24h</div>
                  <div className="text-sm text-gray-600">Fast Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Fresh Guarantee</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">5★</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
              </div>
            </div>
            
            <div className="relative lg:pl-8">
              <div className="relative">
                <div className="aspect-square w-full max-w-lg mx-auto rounded-3xl bg-gradient-to-br from-green-100 to-green-200 p-8 shadow-2xl">
                  <div className="w-full h-full rounded-2xl bg-white shadow-lg flex items-center justify-center text-gray-400 text-lg font-medium">
                    [Hero Fruit Image]
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  FRESH
                </div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                  🍎
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Fruitopia?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to delivering the freshest, highest-quality fruits with exceptional service.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚚",
                title: "Fast Delivery",
                description: "Same-day delivery within 24 hours to Mumbai, Thane, and Navi Mumbai"
              },
              {
                icon: "🌱",
                title: "Premium Quality",
                description: "Hand-picked seasonal fruits sourced directly from trusted farms"
              },
              {
                icon: "💎",
                title: "Fresh Guarantee",
                description: "100% satisfaction guarantee or your money back, no questions asked"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full mb-4">
              🏆 Seasonal Favorites
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Premium Seasonal Fruits
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our handpicked selection of the finest seasonal fruits, available now.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Alphonso Mango", price: "₹450/kg", originalPrice: "₹499", image: "🥭", badge: "Premium" },
              { name: "Imported Apples", price: "₹320/kg", originalPrice: "₹380", image: "🍎", badge: "Fresh" },
              { name: "Sweet Oranges", price: "₹180/kg", originalPrice: "₹220", image: "🍊", badge: "Juicy" },
              { name: "Red Cherries", price: "₹699/pack", originalPrice: "₹749", image: "🍒", badge: "Limited" }
            ].map((product, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative mb-4">
                  <div className="w-full h-40 bg-gradient-to-br from-green-50 to-green-100 rounded-xl flex items-center justify-center text-6xl mb-4">
                    {product.image}
                  </div>
                  <span className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                    {product.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl font-bold text-green-600">{product.price}</span>
                  <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                </div>
                <button className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-green-700 transform group-hover:scale-105 transition-all duration-200">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-white border-2 border-green-500 text-green-600 font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-200">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl p-12 lg:p-16 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" style={{backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z\"/%3E%3C/g%3E%3C/svg%3E')", backgroundRepeat: 'repeat'}}></div>
            </div>
            <div className="relative">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Trusted by Thousands of Happy Customers
                </h2>
                <p className="text-xl text-green-100 max-w-3xl mx-auto">
                  Join our growing community of satisfied customers who choose quality and freshness.
                </p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { number: "50K+", label: "Happy Customers" },
                  { number: "25+", label: "Fruit Varieties" },
                  { number: "99.8%", label: "Satisfaction Rate" },
                  { number: "24/7", label: "Customer Support" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                    <div className="text-green-100 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-xl">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Stay Fresh with Our Newsletter
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Get exclusive offers, seasonal fruit updates, and healthy recipes delivered to your inbox.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="flex-1">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full px-6 py-4 rounded-full border-2 border-gray-200 focus:border-green-500 focus:outline-none text-lg"
                />
              </div>
              <button 
                type="submit" 
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-sm text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home