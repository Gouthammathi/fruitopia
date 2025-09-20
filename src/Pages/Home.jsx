import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { products, productCategories } from '../data/products'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const [isVisible, setIsVisible] = useState({})
  const [activeTab, setActiveTab] = useState('regular')
  const navigate = useNavigate()
  const { cartItemCount, wishlistCount } = useApp()

  // Get featured products
  const featuredProducts = products.filter(product => product.featured).slice(0, 4)
  const featuredCategories = productCategories.filter(cat => cat.featured)

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.dataset.animate]: true
          }))
        }
      })
    }, observerOptions)

    const animateElements = document.querySelectorAll('[data-animate]')
    animateElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-yellow-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%2316a34a\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"7\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        {/* Floating Fruit Illustrations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>🍎</div>
          <div className="absolute top-40 right-20 text-5xl animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>🍊</div>
          <div className="absolute bottom-40 left-20 text-4xl animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}>🍓</div>
          <div className="absolute bottom-20 right-10 text-5xl animate-bounce" style={{animationDelay: '0.5s', animationDuration: '4.5s'}}>🥭</div>
          <div className="absolute top-1/2 left-5 text-3xl animate-bounce" style={{animationDelay: '1.5s', animationDuration: '3.8s'}}>🍇</div>
          <div className="absolute top-1/3 right-5 text-4xl animate-bounce" style={{animationDelay: '2.5s', animationDuration: '4.2s'}}>🥝</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 font-['Poppins']">
              <span className="block">Freshly Cut Fruits,</span>
              <span className="block bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
                Delivered to You
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-['Inter']">
              Healthy, delicious, and ready-to-eat fruit platters delivered fresh to your doorstep in under 30 minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button 
                onClick={() => navigate('/products')}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none"
              >
                Shop Now 🚀
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-white border-2 border-green-500 text-green-600 text-lg font-semibold rounded-full hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-12 pt-12 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>Fresh Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <span>30min Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <span>100% Natural</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
                <span>Cart ({cartItemCount}) | Wishlist ({wishlistCount})</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-green-50" data-animate="plans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 transform ${
            isVisible.plans ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-700 text-sm font-semibold rounded-full mb-6">
                <span>🎯</span>
                <span>Choose Your Perfect Plan</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-['Poppins']">
                Subscription Plans
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Inter']">
                Fresh fruit bowls delivered to your doorstep. Pick the plan that fits your lifestyle and dietary needs.
              </p>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
                <button
                  onClick={() => setActiveTab('regular')}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'regular'
                      ? 'bg-green-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  Regular Bowls
                </button>
                <button
                  onClick={() => setActiveTab('mini')}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === 'mini'
                      ? 'bg-green-500 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  Mini Bowls
                </button>
              </div>
            </div>
            
            {/* Content based on active tab */}
            <div className="relative">
              {/* Regular Bowls Plans */}
              <div className={`transition-all duration-700 ease-in-out transform ${
                activeTab === 'regular' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none absolute'
              }`}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Trial Plan */}
              <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 group ${
                isVisible.plans ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`} style={{transitionDelay: '0ms'}}>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-['Poppins']">Trial</h3>
                  <p className="text-sm text-gray-500 mb-4">(Monday-Saturday)</p>
                  <div className="text-3xl font-bold text-green-600 mb-2">₹1,599 <span className="text-base font-normal text-gray-500">/ 2 weeks</span></div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-['Inter']">
                  Try Before You Commit 🍉🥝 Not ready for a full-month plan? The Trail Plan is perfect for a 2-week taste of fresh, handpicked fruit bowls, Ideal for testing a healthy habit or enjoying a flexible option—nourish your body with nature's best, hassle-free 🌿✨
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">5 Variety of fruits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">1 Vegetable</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">1 Nut / Sprouts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-semibold">600-700 grams</span>
                  </div>
                </div>
                
                <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-green-700 transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Choose Trial Plan
                </button>
              </div>

              {/* Standard Plan - Most Popular */}
              <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-2 border-green-500 group relative ${
                isVisible.plans ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`} style={{transitionDelay: '150ms'}}>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-['Poppins']">Standard</h3>
                  <p className="text-sm text-gray-500 mb-4">(Monday-Saturday)</p>
                  <div className="text-3xl font-bold text-green-600 mb-2">₹2,799 <span className="text-base font-normal text-gray-500">/ 1 month</span></div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-['Inter']">
                  Fresh & Nutritious, Every Day 🍎🥭 New to fruit bowls? Our Standard Plan delivers a curated mix of fresh, flavorful fruits from Monday to Saturday—perfect for building or maintaining a healthy habit. A simple, delicious way to enjoy nature's best. 🌿✨
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">5 Variety of fruits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">1 Vegetable</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">1 Nut / Sprouts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-semibold">600-700 grams</span>
                  </div>
                </div>
                
                <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-green-700 transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Choose Standard Plan
                </button>
              </div>

              {/* Corporate Plan */}
              <div className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 group ${
                isVisible.plans ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`} style={{transitionDelay: '300ms'}}>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 font-['Poppins']">Corporate</h3>
                  <p className="text-sm text-gray-500 mb-4">(Monday-Friday)</p>
                  <div className="text-3xl font-bold text-green-600 mb-2">₹2,299 <span className="text-base font-normal text-gray-500">/ 1 month</span></div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-['Inter']">
                  Fuel Your Workday 🍇🍊 Our Corporate Plan keeps professionals energized & productive with fresh, curated fruit bowls—a hassle-free way to enjoy healthy breaks at work. Perfect for individuals & teams, delivered right to your office. 🚀✨
                </p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">5 Variety of fruits</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">1 Vegetable</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">1 Nut / Sprouts</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700 font-semibold">600-700 grams</span>
                  </div>
                </div>
                
                <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full hover:from-green-600 hover:to-green-700 transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Choose Corporate Plan
                </button>
              </div>
                </div>
              </div>

              {/* Mini Bowls Content */}
              <div className={`transition-all duration-700 ease-in-out transform ${
                activeTab === 'mini' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none absolute'
              }`}>
                {/* Mini Bowls Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full mb-6">
                    <span>🥣</span>
                    <span>Perfect Size, Perfect Taste</span>
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 font-['Poppins']">
                    Mini Bowls Collection
                  </h3>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto font-['Inter']">
                    Perfect for kids, light eaters, or anyone looking for a quick healthy snack. 
                    Smaller portions, same great taste and nutrition!
                  </p>
                </div>
                
                {/* Mini Bowl Plans Grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  {/* Mini Bowl Standard */}
                  <div className={`bg-gradient-to-br from-white to-purple-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-purple-100 group relative overflow-hidden ${
                    isVisible.plans ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`} style={{transitionDelay: '200ms'}}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
                    
                    <div className="relative z-10">
                      <div className="text-center mb-6">
                        <div className="text-4xl mb-3">🥣</div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-2 font-['Poppins']">Mini Bowl - Standard</h4>
                        <p className="text-sm text-purple-600 mb-4 font-medium">(Monday-Saturday)</p>
                        <div className="text-3xl font-bold text-purple-600 mb-2">₹1,799 
                          <span className="text-base font-normal text-gray-500">/ 1 month</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 font-['Inter']">
                        🥣 Fresh & Light, Every Day! Perfect for kids, light eaters, or anyone craving a quick, healthy snack. 
                        A fresh and fun way to add fruits to your day — light, tasty, and just enough! 🍓💚
                      </p>
                      
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">3 Variety of fruits</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">1 Vegetable</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">1 Nut / Sprouts</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-gray-700 font-semibold">250-350 grams</span>
                        </div>
                      </div>
                      
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-full hover:from-purple-600 hover:to-purple-700 transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                        Choose Mini Bowl Standard
                      </button>
                    </div>
                  </div>

                  {/* Mini Bowl Corporate */}
                  <div className={`bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-2 border-blue-100 group relative overflow-hidden ${
                    isVisible.plans ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`} style={{transitionDelay: '400ms'}}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full -translate-y-16 translate-x-16 opacity-20"></div>
                    
                    <div className="relative z-10">
                      <div className="text-center mb-6">
                        <div className="text-4xl mb-3">🥣</div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-2 font-['Poppins']">Mini Bowl - Corporate</h4>
                        <p className="text-sm text-blue-600 mb-4 font-medium">(Monday-Friday)</p>
                        <div className="text-3xl font-bold text-blue-600 mb-2">₹1,599 
                          <span className="text-base font-normal text-gray-500">/ 1 month</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm leading-relaxed mb-6 font-['Inter']">
                        🥣 Fresh & Light, Weekdays Only! Perfect for busy professionals who want a quick, 
                        healthy boost during weekdays. Stay energized — light, tasty, and just enough! 🍓💼
                      </p>
                      
                      <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">3 Variety of fruits</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">1 Vegetable</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">1 Nut / Sprouts</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-700 font-semibold">250-350 grams</span>
                        </div>
                      </div>
                      
                      <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 transform group-hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                        Choose Mini Bowl Corporate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white" data-animate="features" >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 transform ${
            isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-['Poppins']">
                Why Choose Fruitopia?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Inter']">
                We're committed to delivering the freshest, highest-quality fruits with exceptional service.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🍓",
                  title: "Fresh Fruits",
                  description: "Handpicked daily for maximum freshness and quality assurance"
                },
                {
                  icon: "🚚",
                  title: "Fast Delivery",
                  description: "Delivered in under 30 minutes to your doorstep with care"
                },
                {
                  icon: "❤️",
                  title: "Healthy Choice",
                  description: "Nutritious & naturally sweet, perfect for a healthy lifestyle"
                }
              ].map((feature, index) => (
                <div key={index} className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 group ${
                  isVisible.features ? `opacity-100 translate-y-0` : 'opacity-0 translate-y-20'
                }`} style={{transitionDelay: `${index * 200}ms`}}>
                  <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-['Poppins']">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-['Inter']">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Navigation Section */}
      <section className="py-20 bg-white" data-animate="categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 transform ${
            isVisible.categories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-['Poppins']">
                Shop by Category
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Inter']">
                Browse our carefully curated selection of fresh fruits organized by category.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {featuredCategories.map((category, index) => (
                <div
                  key={category.id}
                  className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer group ${
                    isVisible.categories ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                  }`}
                  style={{transitionDelay: `${index * 200}ms`}}
                  onClick={() => navigate(`/products?category=${category.id}`)}
                >
                  <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300 text-center">
                    {category.image}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center font-['Poppins'] group-hover:text-green-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed font-['Inter'] mb-6">
                    {category.description}
                  </p>
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all duration-300">
                      Explore Category
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/products')}
                className="px-10 py-4 bg-white border-2 border-green-500 text-green-600 font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View All Categories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-50" data-animate="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 transform ${
            isVisible.products ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <div className="text-center mb-16">
              <span className="inline-block px-6 py-3 bg-green-100 text-green-700 text-sm font-semibold rounded-full mb-6">
                🏆 Our Best Sellers
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-['Poppins']">
                Premium Seasonal Fruits
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Inter']">
                Discover our handpicked selection of the finest seasonal fruits, available now.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className={`group ${
                  isVisible.products ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`} style={{transitionDelay: `${index * 150}ms`}}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <button className="px-10 py-4 bg-white border-2 border-green-500 text-green-600 font-semibold rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg">
                View All Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-green-600 relative overflow-hidden" data-animate="cta">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z\"/%3E%3C/g%3E%3C/svg%3E')",
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 transform text-white ${
            isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-['Poppins']">
              Ready to Get Fresh Fruits?
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-10 font-['Inter']">
              Order now and get fresh, quality fruits delivered to your doorstep. Fast delivery guaranteed!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button className="px-10 py-4 bg-white text-green-600 text-lg font-bold rounded-full hover:bg-yellow-400 hover:text-green-700 transition-all duration-300 transform hover:scale-105 shadow-2xl">
                Order Now 🛒
              </button>
              <button className="px-10 py-4 bg-transparent border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white hover:text-green-600 transition-all duration-300 transform hover:scale-105">
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50" data-animate="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-1000 transform ${
            isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-['Poppins']">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-['Inter']">
                Have questions? We're here to help you get the freshest fruits delivered to your door.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Poppins']">Call Us</h3>
                <p className="text-gray-600 font-['Inter']">+91 98765 43210</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Poppins']">Email Us</h3>
                <p className="text-gray-600 font-['Inter']">hello@fruitopia.com</p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Poppins']">Delivery Areas</h3>
                <p className="text-gray-600 font-['Inter']">Mumbai, Thane & Navi Mumbai</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hover\\:animate-none:hover {
          animation: none !important;
        }
      `}</style>
    </div>
  )
}

export default Home