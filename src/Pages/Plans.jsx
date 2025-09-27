import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

// Plan Image Carousel Component
const PlanImageCarousel = ({ images, planType }) => {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative h-32 overflow-hidden rounded-t-2xl bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
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
                  ? 'opacity-0 scale-95 -translate-x-4'
                  : 'opacity-0 scale-95 translate-x-4'
              }`}
          >
            <div className="text-4xl filter drop-shadow-lg">{image}</div>
          </div>
        ))}
      </div>

      {/* Carousel indicators */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentImage ? 'bg-emerald-500 scale-125' : 'bg-white/60 hover:bg-white/80'
              }`}
          />
        ))}
      </div>

      {/* Plan type badge */}
      <div className="absolute top-2 right-2">
        <span className="bg-white/90 backdrop-blur-sm text-slate-700 px-2 py-0.5 rounded-full text-xs font-medium">
          {planType}
        </span>
      </div>
    </div>
  )
}

const Plans = () => {
  const [activeTab, setActiveTab] = useState('regular')
  const navigate = useNavigate()
  const { addPlanToCart } = useApp()

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

  const regularPlans = [
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
  ]

  const miniPlans = [
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
  ]

  const currentPlans = activeTab === 'regular' ? regularPlans : miniPlans

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 pt-20">
      {/* Header Section */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full mb-4">
              <span>🎯</span>
              <span>Choose Your Perfect Plan</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Subscription Plans
            </h1>
            <div className="flex justify-center">
              <p className="text-lg text-slate-600 max-w-3xl text-center">
                Fresh fruit bowls delivered to your doorstep. Pick the plan that fits your lifestyle and dietary needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-xl p-1 shadow-sm border border-slate-200">
              <button
                onClick={() => setActiveTab('regular')}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'regular'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                Regular Bowls
              </button>
              <button
                onClick={() => setActiveTab('mini')}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === 'mini'
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                Mini Bowls
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPlans.map((plan) => (
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
      </section>

      {/* Features Section */}
      <section className="py-8 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
              Why Choose Our Plans?
            </h2>
            <div className="flex justify-center">
              <p className="text-base text-slate-600 max-w-3xl text-center">
                We're committed to delivering the freshest, highest-quality fruits with exceptional service.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🍓",
                title: "Fresh Daily",
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
              <div key={index} className="bg-slate-50 rounded-xl p-6 text-center group hover:bg-white hover:shadow-md transition-all duration-300">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="flex justify-center">
              <p className="text-base text-slate-600 text-center">
                Everything you need to know about our subscription plans
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "How does the subscription work?",
                answer: "Once you choose a plan, we'll deliver fresh fruit bowls according to your selected schedule. You can pause, modify, or cancel your subscription anytime."
              },
              {
                question: "What if I don't like a fruit?",
                answer: "We provide a variety of fruits in each bowl. If you have specific preferences or allergies, please mention them in your order notes."
              },
              {
                question: "Can I change my delivery schedule?",
                answer: "Yes, you can modify your delivery schedule, skip deliveries, or change your plan anytime through your account dashboard."
              },
              {
                question: "Is there a minimum subscription period?",
                answer: "No, there's no minimum commitment. You can cancel your subscription anytime without any penalties."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-center">
                <h3 className="text-base font-semibold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Plans Display Section */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
              Explore Other Plans
            </h2>
            <div className="flex justify-center">
              <p className="text-base text-slate-600 max-w-3xl text-center">
                Not sure which plan is right for you? Compare all our available options below.
              </p>
            </div>
          </div>

          {/* All Plans Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm border border-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-900">Plan</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900">Price</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900">Duration</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900">Schedule</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900">Weight</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {[...regularPlans, ...miniPlans].map((plan) => (
                  <tr key={plan.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="text-lg">{plan.images[0]}</div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{plan.name}</div>
                          <div className="text-xs text-slate-500">
                            {plan.features[0].includes('3') ? 'Mini Bowl' : 'Regular Bowl'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-bold text-emerald-600">₹{plan.price.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-slate-600">{plan.duration}</td>
                    <td className="px-4 py-3 text-center text-sm text-slate-600">{plan.schedule}</td>
                    <td className="px-4 py-3 text-center text-sm text-slate-600">{plan.features[3]}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handlePlanSelect(plan.id, plan.name, plan.price, plan.duration)}
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
        </div>
      </section>
    </div>
  )
}

export default Plans
