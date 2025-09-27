import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { products, productCategories } from '../data/products'
import ProductCard from '../components/ProductCard'

// Image carousel component for plan cards
const PlanImageCarousel = ({ images, planType }) => {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative h-48 overflow-hidden rounded-t-2xl bg-gradient-to-br from-green-50 to-green-100">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%2316a34a\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"5\" cy=\"5\" r=\"5\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
          backgroundRepeat: 'repeat'
        }}></div>
      </div>

      {/* Image slides */}
      <div className="relative h-full flex items-center justify-center">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute transition-all duration-500 transform ${index === currentImage
                ? 'opacity-100 scale-100 translate-x-0'
                : index < currentImage
                  ? 'opacity-0 scale-95 -translate-x-8'
                  : 'opacity-0 scale-95 translate-x-8'
              }`}
          >
            <div className="text-8xl filter drop-shadow-lg">{image}</div>
          </div>
        ))}
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImage ? 'bg-green-500 scale-125' : 'bg-white/60 hover:bg-white/80'
              }`}
          />
        ))}
      </div>

      {/* Plan type badge */}
      <div className="absolute top-3 right-3">
        <span className="bg-white/90 backdrop-blur-sm text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
          {planType}
        </span>
      </div>
    </div>
  )
}

const Home = () => {
  const [activeTab, setActiveTab] = useState('regular')
  const [visibleCheckpoints, setVisibleCheckpoints] = useState(new Set())
  const navigate = useNavigate()
  const { cartItemCount, wishlistCount, addPlanToCart } = useApp()
  const checkpointRefs = useRef([])

  // Get featured products and categories
  const featuredProducts = products.filter(product => product.featured).slice(0, 4)
  const featuredCategories = productCategories.filter(cat => cat.featured)

  // Handle plan selection
  const handlePlanSelect = (planType, planName, price, duration) => {
    const planData = {
      value: planType,
      name: planName,
      label: planName,
      price: price,
      duration: duration
    }

    // Add plan to cart first
    addPlanToCart(planData, 1, 1)
    
    // Navigate to cart to show the plan
    navigate('/cart')
  }

  // Scroll animation effect for journey checkpoints
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index)
            setVisibleCheckpoints(prev => new Set([...prev, index]))
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    checkpointRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      checkpointRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%2316a34a\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"7\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            backgroundRepeat: 'repeat'
          }}></div>
        </div>

        {/* Floating Fruit Illustrations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>🍎</div>
          <div className="absolute top-40 right-20 text-5xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>🍊</div>
          <div className="absolute bottom-40 left-20 text-4xl animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>🍓</div>
          <div className="absolute bottom-20 right-10 text-5xl animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>🥭</div>
          <div className="absolute top-1/2 left-5 text-3xl animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.8s' }}>🍇</div>
          <div className="absolute top-1/3 right-5 text-4xl animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4.2s' }}>🥝</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-slate-900 font-['Poppins']">
              <span className="block">Freshly Cut Fruits,</span>
              <span className="block bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                Delivered to You
              </span>
            </h1>

            <div className="flex justify-center">
              <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl text-center leading-relaxed font-['Inter']">
                Healthy, delicious, and ready-to-eat fruit platters delivered fresh to your doorstep in under 30 minutes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <button
                onClick={() => navigate('/plans')}
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-lg font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                View Plans 🚀
              </button>
              <button
                onClick={() => navigate('/products')}
                className="px-8 py-4 bg-white border-2 border-emerald-500 text-emerald-600 text-lg font-medium rounded-xl hover:bg-emerald-50 transition-all duration-300"
              >
                Browse Products
              </button>
            </div>

            <div className="flex items-center justify-center gap-12 pt-12 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>Fresh Daily</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span>30min Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span>100% Natural</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <span>Cart ({cartItemCount}) | Wishlist ({wishlistCount})</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-12 bg-gradient-to-br from-slate-50 via-white to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-4">
                <span>🎯</span>
                <span>Choose Your Perfect Plan</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-['Poppins']">
                Subscription Plans
              </h2>
              <div className="flex justify-center">
                <p className="text-lg text-slate-600 max-w-3xl text-center font-['Inter']">
                  Fresh fruit bowls delivered to your doorstep. Pick the plan that fits your lifestyle and dietary needs.
                </p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-200">
                <button
                  onClick={() => setActiveTab('regular')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === 'regular'
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                >
                  Regular Bowls
                </button>
                <button
                  onClick={() => setActiveTab('mini')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === 'mini'
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                >
                  Mini Bowls
                </button>
              </div>
            </div>

            {/* Content based on active tab */}
            <div className="relative">
              {/* Regular Bowls Plans */}
              <div className={activeTab === 'regular' ? 'block' : 'hidden'}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                  {[
                    {
                      id: 'trial',
                      name: 'Trial Plan',
                      description: 'Try Before You Commit 🍉🥝 Not ready for a full-month plan? The Trail Plan is perfect for a 2-week taste of fresh, handpicked fruit bowls, Ideal for testing a healthy habit or enjoying a flexible option—nourish your body with nature\'s best, hassle-free 🌿✨',
                      price: 1599,
                      duration: '2 weeks',
                      schedule: 'Monday-Saturday',
                      features: [
                        '5 Variety of fruits',
                        '1 Vegetable',
                        '1 Nut / Sprouts',
                        '600-700 grams'
                      ],
                      images: ['🍉', '🥝', '🍇', '🍓', '🥭'],
                      popular: false
                    },
                    {
                      id: 'standard',
                      name: 'Standard Plan',
                      description: 'Fresh & Nutritious, Every Day 🍎🥭 New to fruit bowls? Our Standard Plan delivers a curated mix of fresh, flavorful fruits from Monday to Saturday—perfect for building or maintaining a healthy habit. A simple, delicious way to enjoy nature\'s best. 🌿✨',
                      price: 2799,
                      duration: '1 month',
                      schedule: 'Monday-Saturday',
                      features: [
                        '5 Variety of fruits',
                        '1 Vegetable',
                        '1 Nut / Sprouts',
                        '600-700 grams'
                      ],
                      images: ['🍎', '🥭', '🍊', '🍇', '🥥'],
                      popular: true
                    },
                    {
                      id: 'corporate',
                      name: 'Corporate Plan',
                      description: 'Fuel Your Workday 🍇🍊 Our Corporate Plan keeps professionals energized & productive with fresh, curated fruit bowls—a hassle-free way to enjoy healthy breaks at work. Perfect for individuals & teams, delivered right to your office. 🚀✨',
                      price: 2299,
                      duration: '1 month',
                      schedule: 'Monday-Friday',
                      features: [
                        '5 Variety of fruits',
                        '1 Vegetable',
                        '1 Nut / Sprouts',
                        '600-700 grams'
                      ],
                      images: ['🍇', '🍊', '🥥', '🍎', '🍒'],
                      popular: false
                    }
                  ].map((plan) => (
                    <div
                      key={plan.id}
                      className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden ${
                        plan.popular ? 'ring-2 ring-emerald-500 relative' : 'border border-slate-200'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                          <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-1 rounded-full text-xs font-medium shadow-sm">
                            ⭐ Most Popular
                          </span>
                        </div>
                      )}

                      <PlanImageCarousel images={plan.images} planType={plan.name} />
                      
                      <div className="p-5">
                        <div className="text-center mb-4">
                          <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                          <p className="text-xs text-slate-500 mb-2">({plan.schedule})</p>
                          <div className="text-2xl font-bold text-emerald-600 mb-2">
                            ₹{plan.price.toLocaleString()}
                            <span className="text-sm font-normal text-slate-500"> / {plan.duration}</span>
                          </div>
                        </div>

                        <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3">
                          {plan.description}
                        </p>

                        <div className="space-y-2 mb-5">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></div>
                              <span className="text-xs text-slate-700">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <button
                            onClick={() => navigate(`/plan/${plan.id}`)}
                            className="w-full px-4 py-2 border-2 border-emerald-500 text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-300 text-sm"
                          >
                            View More Details
                          </button>
                          <button
                            onClick={() => handlePlanSelect(plan.id, plan.name, plan.price, plan.duration)}
                            className="w-full px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md text-sm"
                          >
                            Choose {plan.name}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini Bowls Content */}
              <div className={activeTab === 'mini' ? 'block' : 'hidden'}>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-4">
                  {[
                    {
                      id: 'mini-standard',
                      name: 'Mini Bowl - Standard Plan',
                      description: '🥣 Mini Bowl – Fresh & Light, Every Day 🍇🍌 New to fruit bowls or prefer smaller portions? Our Mini Bowl is perfect for a quick, healthy boost—fresh fruits, just the right size, delivered Monday to Saturday. 🥗💚 💡 Perfect For: Kids, light eaters, or anyone craving a quick, healthy snack. A fresh and fun way to add fruits to your day — light, tasty, and just enough! 🍓💚',
                      price: 1799,
                      duration: '1 month',
                      schedule: 'Monday-Saturday',
                      features: [
                        '3 Variety of fruits',
                        '1 Vegetable',
                        '1 Nut / Sprouts',
                        '250 - 350 grams'
                      ],
                      images: ['🥣', '🍇', '🍌', '🍓', '🥝'],
                      popular: true
                    },
                    {
                      id: 'mini-corporate',
                      name: 'Mini Bowl - Corporate Plan',
                      description: '🥣 Mini Bowl – Fresh & Light, Weekdays Only 🍇🍌 New to fruit bowls or prefer smaller portions? Our Mini Bowl (Corporate Plan) is perfect for a quick, healthy boost — fresh fruits, just the right size, delivered Monday to Friday. 🥗💼 💡 Perfect For: Kids, light eaters, or anyone craving a quick, healthy snack during busy weekdays. A fresh and fun way to stay energized — light, tasty, and just enough! 🍓💚',
                      price: 1599,
                      duration: '1 month',
                      schedule: 'Monday-Friday',
                      features: [
                        '3 Variety of fruits',
                        '1 Vegetable',
                        '1 Nut / Sprouts',
                        '250 - 350 grams'
                      ],
                      images: ['🥣', '🍊', '💼', '🍇', '🍓'],
                      popular: false
                    }
                  ].map((plan) => (
                    <div
                      key={plan.id}
                      className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden ${
                        plan.popular ? 'ring-2 ring-emerald-500 relative' : 'border border-slate-200'
                      }`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-20">
                          <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-1 rounded-full text-xs font-medium shadow-sm">
                            ⭐ Most Popular Mini
                          </span>
                        </div>
                      )}

                      <PlanImageCarousel images={plan.images} planType={plan.name} />
                      
                      <div className="p-5">
                        <div className="text-center mb-4">
                          <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                          <p className="text-xs text-slate-500 mb-2">({plan.schedule})</p>
                          <div className="text-2xl font-bold text-emerald-600 mb-2">
                            ₹{plan.price.toLocaleString()}
                            <span className="text-sm font-normal text-slate-500"> / {plan.duration}</span>
                          </div>
                        </div>

                        <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-3">
                          {plan.description}
                        </p>

                        <div className="space-y-2 mb-5">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></div>
                              <span className="text-xs text-slate-700">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <button
                            onClick={() => navigate(`/plan/${plan.id}`)}
                            className="w-full px-4 py-2 border-2 border-emerald-500 text-emerald-600 font-medium rounded-lg hover:bg-emerald-50 transition-all duration-300 text-sm"
                          >
                            View More Details
                          </button>
                          <button
                            onClick={() => handlePlanSelect(plan.id, plan.name, plan.price, plan.duration)}
                            className="w-full px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md text-sm"
                          >
                            Choose {plan.name}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* View All Plans Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => navigate('/plans')}
                className="px-6 py-2.5 bg-white border-2 border-emerald-500 text-emerald-600 font-medium rounded-lg hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md text-sm"
              >
                View All Plans & Compare
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-['Poppins']">
              Our Fruit Journey
            </h2>
            <div className="flex justify-center">
              <p className="text-xl text-slate-600 max-w-3xl text-center font-['Inter']">
                From farm to your doorstep, discover how we ensure every fruit reaches you at its absolute best.
              </p>
            </div>
          </div>

          {/* Interactive Timeline */}
          <div className="relative">
            {/* Curved Path */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
                <path
                  id="journey-path"
                  d="M 50 200 Q 300 100 600 200 T 1150 200"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="10,5"
                  className={`transition-opacity duration-1000 ${
                    visibleCheckpoints.size > 0 ? 'opacity-30' : 'opacity-0'
                  }`}
                  style={{
                    strokeDasharray: visibleCheckpoints.size > 0 ? '10,5' : '1000',
                    strokeDashoffset: visibleCheckpoints.size > 0 ? '0' : '1000',
                    transition: 'stroke-dashoffset 2s ease-in-out, opacity 1s ease-in-out'
                  }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Journey Steps */}
            <div className="grid lg:grid-cols-6 gap-8 lg:gap-4 relative z-10">
              {[
                {
                  step: 1,
                  icon: "🌱",
                  title: "Sourcing",
                  description: "We partner with trusted local farms and importers to source the finest seasonal fruits",
                  color: "from-green-50 to-emerald-50",
                  borderColor: "border-green-200",
                  iconBg: "bg-green-100",
                  iconText: "text-green-700"
                },
                {
                  step: 2,
                  icon: "🔍",
                  title: "Quality Inspection",
                  description: "Every fruit undergoes rigorous quality checks for ripeness, freshness, and appearance",
                  color: "from-blue-50 to-sky-50",
                  borderColor: "border-blue-200",
                  iconBg: "bg-blue-100",
                  iconText: "text-blue-700"
                },
                {
                  step: 3,
                  icon: "🔪",
                  title: "Fresh Cutting",
                  description: "Our expert team cuts fruits only when your order is confirmed, ensuring maximum freshness",
                  color: "from-orange-50 to-amber-50",
                  borderColor: "border-orange-200",
                  iconBg: "bg-orange-100",
                  iconText: "text-orange-700"
                },
                {
                  step: 4,
                  icon: "📦",
                  title: "Smart Packing",
                  description: "Fruits are carefully packed in eco-friendly containers to maintain freshness and prevent bruising",
                  color: "from-purple-50 to-violet-50",
                  borderColor: "border-purple-200",
                  iconBg: "bg-purple-100",
                  iconText: "text-purple-700"
                },
                {
                  step: 5,
                  icon: "🚚",
                  title: "Fast Delivery",
                  description: "Delivered within 30 minutes using temperature-controlled vehicles to your doorstep",
                  color: "from-red-50 to-rose-50",
                  borderColor: "border-red-200",
                  iconBg: "bg-red-100",
                  iconText: "text-red-700"
                },
                {
                  step: 6,
                  icon: "💚",
                  title: "Healthy Living",
                  description: "Enjoy fresh, nutritious fruits that contribute to your healthy lifestyle and well-being",
                  color: "from-emerald-50 to-green-50",
                  borderColor: "border-emerald-200",
                  iconBg: "bg-emerald-100",
                  iconText: "text-emerald-700"
                }
              ].map((journey, index) => (
                <div
                  key={index}
                  ref={(el) => (checkpointRefs.current[index] = el)}
                  data-index={index}
                  className={`group relative checkpoint-reveal ${
                    visibleCheckpoints.has(index) ? 'revealed' : ''
                  } ${index === 0 ? 'lg:col-start-1' : index === 1 ? 'lg:col-start-2' : index === 2 ? 'lg:col-start-3' : index === 3 ? 'lg:col-start-4' : index === 4 ? 'lg:col-start-5' : 'lg:col-start-6'}`}
                  style={{
                    transitionDelay: visibleCheckpoints.has(index) ? `${index * 150}ms` : '0ms'
                  }}
                >
                  {/* Connection Line (Mobile) */}
                  <div className="lg:hidden flex justify-center mb-6">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-400 to-emerald-600"></div>
                  </div>

                  {/* Journey Card */}
                  <div className={`relative bg-gradient-to-br ${journey.color} rounded-2xl p-6 border-2 ${journey.borderColor} shadow-sm hover:shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2 ${
                    visibleCheckpoints.has(index) ? 'float-animation' : ''
                  }`}>
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className={`w-8 h-8 ${journey.iconBg} ${journey.borderColor} border-2 rounded-full flex items-center justify-center font-bold text-sm ${journey.iconText}`}>
                        {journey.step}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="text-center mb-4 mt-4">
                      <div className={`w-16 h-16 ${journey.iconBg} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-2xl">{journey.icon}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-slate-900 mb-3 font-['Poppins'] group-hover:text-emerald-600 transition-colors">
                        {journey.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-['Inter']">
                        {journey.description}
                      </p>
                    </div>

                    {/* Animated Progress Dot */}
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <div className={`w-4 h-4 ${journey.iconBg} rounded-full border-2 ${journey.borderColor} ${
                        visibleCheckpoints.has(index) ? 'progress-dot' : ''
                      }`}></div>
                    </div>
                  </div>

                  {/* Desktop Connection Line */}
                  {index < 5 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-20">
                      <div className="w-4 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Journey Progress Indicator */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full border border-emerald-200 transition-all duration-500">
                <div className={`w-3 h-3 bg-emerald-500 rounded-full transition-all duration-500 ${
                  visibleCheckpoints.size > 0 ? 'animate-pulse' : ''
                }`}></div>
                <span className="text-sm font-medium text-emerald-700">
                  {visibleCheckpoints.size === 0 ? 'Scroll to start your journey' : 
                   visibleCheckpoints.size < 6 ? `Journey Progress: ${visibleCheckpoints.size}/6` : 
                   'Complete Fresh Fruit Journey'}
                </span>
                <div className={`w-3 h-3 bg-emerald-500 rounded-full transition-all duration-500 ${
                  visibleCheckpoints.size > 0 ? 'animate-pulse' : ''
                }`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-100 rounded-full opacity-20"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-100 rounded-full opacity-20"></div>
        </div>
      </section>

      {/* Category Navigation Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-['Poppins']">
                Shop by Category
              </h2>
              <div className="flex justify-center">
                <p className="text-xl text-slate-600 max-w-3xl text-center font-['Inter']">
                  Browse our carefully curated selection of fresh fruits organized by category.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {featuredCategories.map((category, index) => (
                <div
                  key={category.id}
                  className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md cursor-pointer group transition-all duration-300"
                  onClick={() => navigate(`/products?category=${category.id}`)}
                >
                  <div className="text-6xl mb-6 text-center">
                    {category.image}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 text-center font-['Poppins'] group-hover:text-emerald-600">
                    {category.name}
                  </h3>
                  <p className="text-slate-600 text-center leading-relaxed font-['Inter'] mb-6">
                    {category.description}
                  </p>
                  <div className="text-center">
                    <span className="inline-flex items-center gap-2 text-emerald-600 font-medium">
                      Explore Category
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="px-10 py-4 bg-white border-2 border-emerald-500 text-emerald-600 font-medium rounded-xl hover:bg-emerald-500 hover:text-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                View All Categories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="text-center mb-16">
              <span className="inline-block px-6 py-3 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-6">
                🏆 Our Best Sellers
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-['Poppins']">
                Premium Seasonal Fruits
              </h2>
              <div className="flex justify-center">
                <p className="text-xl text-slate-600 max-w-3xl text-center font-['Inter']">
                  Discover our handpicked selection of the finest seasonal fruits, available now.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="group">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button 
                onClick={() => navigate('/products')}
                className="px-10 py-4 bg-white border-2 border-emerald-500 text-emerald-600 font-medium rounded-xl hover:bg-emerald-500 hover:text-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                View All Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M20 20c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20z\"/%3E%3C/g%3E%3C/svg%3E')",
            backgroundRepeat: 'repeat'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-['Poppins']">
              Ready to Get Fresh Fruits?
            </h2>
            <div className="flex justify-center mb-10">
              <p className="text-xl text-emerald-100 max-w-3xl text-center font-['Inter']">
                Order now and get fresh, quality fruits delivered to your doorstep. Fast delivery guaranteed!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => navigate('/plans')}
                className="px-10 py-4 bg-white text-emerald-600 text-lg font-medium rounded-xl hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                View Plans 🛒
              </button>
              <button 
                onClick={() => navigate('/products')}
                className="px-10 py-4 bg-transparent border-2 border-white text-white text-lg font-medium rounded-xl hover:bg-white hover:text-emerald-600 transition-all duration-300"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Comparison Section */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 font-['Poppins']">
              All Available Plans
            </h2>
            <div className="flex justify-center">
              <p className="text-lg text-slate-600 max-w-3xl text-center font-['Inter']">
                Compare all our subscription plans and choose the one that best fits your needs.
              </p>
            </div>
          </div>

          {/* Plans Comparison Table */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Plan</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900">Price</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900">Duration</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900">Schedule</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900">Weight</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900">Fruits</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    {
                      id: 'trial',
                      name: 'Trial Plan',
                      price: '₹1,599',
                      duration: '2 weeks',
                      schedule: 'Mon-Sat',
                      weight: '600-700g',
                      fruits: '5 varieties',
                      images: '🍉',
                      type: 'Regular'
                    },
                    {
                      id: 'standard',
                      name: 'Standard Plan',
                      price: '₹2,799',
                      duration: '1 month',
                      schedule: 'Mon-Sat',
                      weight: '600-700g',
                      fruits: '5 varieties',
                      images: '🍎',
                      type: 'Regular',
                      popular: true
                    },
                    {
                      id: 'corporate',
                      name: 'Corporate Plan',
                      price: '₹2,299',
                      duration: '1 month',
                      schedule: 'Mon-Fri',
                      weight: '600-700g',
                      fruits: '5 varieties',
                      images: '🍇',
                      type: 'Regular'
                    },
                    {
                      id: 'mini-standard',
                      name: 'Mini Bowl Standard',
                      price: '₹1,799',
                      duration: '1 month',
                      schedule: 'Mon-Sat',
                      weight: '250-350g',
                      fruits: '3 varieties',
                      images: '🥣',
                      type: 'Mini'
                    },
                    {
                      id: 'mini-corporate',
                      name: 'Mini Bowl Corporate',
                      price: '₹1,599',
                      duration: '1 month',
                      schedule: 'Mon-Fri',
                      weight: '250-350g',
                      fruits: '3 varieties',
                      images: '🥣',
                      type: 'Mini'
                    }
                  ].map((plan) => (
                  <tr key={plan.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="text-lg">{plan.images}</div>
                        <div>
                          <div className="text-sm font-medium text-slate-900 flex items-center gap-2">
                            {plan.name}
                            {plan.popular && <span className="bg-emerald-100 text-emerald-700 text-xs px-1.5 py-0.5 rounded-full font-medium">Popular</span>}
                          </div>
                          <div className="text-xs text-slate-500">{plan.type} Bowl</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-bold text-emerald-600">{plan.price}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-slate-600">{plan.duration}</td>
                    <td className="px-4 py-3 text-center text-sm text-slate-600">{plan.schedule}</td>
                    <td className="px-4 py-3 text-center text-sm text-slate-600">{plan.weight}</td>
                    <td className="px-4 py-3 text-center text-sm text-slate-600">{plan.fruits}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          const price = parseInt(plan.price.replace('₹', '').replace(',', ''))
                          handlePlanSelect(plan.id, plan.name, price, plan.duration)
                        }}
                        className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-medium rounded-md hover:bg-emerald-600 transition-colors"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Plan Highlights */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200 text-center">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Regular Bowls</h3>
              <p className="text-sm text-slate-600 mb-4">
                Perfect for adults and those who want a substantial fruit bowl. Contains 5 varieties of fruits with vegetables and nuts.
              </p>
              <ul className="space-y-1">
                <li className="flex items-center justify-center gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  600-700 grams per bowl
                </li>
                <li className="flex items-center justify-center gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  5 fruit varieties
                </li>
                <li className="flex items-center justify-center gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                  Ideal for main meals
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 text-center">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Mini Bowls</h3>
              <p className="text-sm text-slate-600 mb-4">
                Perfect for kids, light eaters, or as a healthy snack. Contains 3 varieties of fruits with vegetables and nuts.
              </p>
              <ul className="space-y-1">
                <li className="flex items-center justify-center gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  250-350 grams per bowl
                </li>
                <li className="flex items-center justify-center gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  3 fruit varieties
                </li>
                <li className="flex items-center justify-center gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Perfect for snacks
                </li>
              </ul>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/plans')}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              View Detailed Plans
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-['Poppins']">
                Get in Touch
              </h2>
              <div className="flex justify-center">
                <p className="text-xl text-slate-600 max-w-3xl text-center font-['Inter']">
                  Have questions? We're here to help you get the freshest fruits delivered to your door.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-slate-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-['Poppins']">Call Us</h3>
                <p className="text-slate-600 font-['Inter']">+91 98765 43210</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-['Poppins']">Email Us</h3>
                <p className="text-slate-600 font-['Inter']">hello@fruitopia.com</p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 font-['Poppins']">Delivery Areas</h3>
                <p className="text-slate-600 font-['Inter']">Hyderabad, Secunderabad & Cyberabad</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
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

        /* Journey Timeline Animations */
        .journey-card-visible {
          animation: slideInUp 0.8s ease-out forwards;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Floating Animation - only when visible */
        .float-animation {
          animation: float 4s ease-in-out infinite;
        }

        .float-animation:nth-child(even) {
          animation-delay: 2s;
        }

        .float-animation:nth-child(odd) {
          animation-delay: 0s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        /* Progress Dot Animation */
        .progress-dot {
          animation: pulseGlow 3s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
            transform: scale(1.1);
          }
        }

        /* Scroll-triggered reveal animation */
        .checkpoint-reveal {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .checkpoint-reveal.revealed {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .checkpoint-reveal:not(.revealed) {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
        }
      `}</style>
    </div>
  )
}

export default Home