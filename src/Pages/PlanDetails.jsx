import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const PlanDetails = () => {
  const { planId } = useParams()
  const navigate = useNavigate()
  const { addPlanToCart } = useApp()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [otherPlans, setOtherPlans] = useState([])

  // Plan data with detailed information
  const planData = {
    trial: {
      id: 'trial',
      name: 'Trial Plan',
      price: 1599,
      originalPrice: 1999,
      duration: '2 weeks',
      schedule: 'Monday to Saturday',
      weight: '600-700g',
      fruits: '5 varieties',
      images: ['🍉', '🍎', '🍇', '🥝', '🍓'],
      type: 'Regular',
      description: 'Perfect for first-time customers who want to experience our premium fruit bowls. This trial plan gives you a taste of our quality and service.',
      benefits: [
        'Fresh fruits delivered daily',
        '5 different fruit varieties',
        'No commitment required',
        'Free delivery included',
        'Quality guaranteed'
      ],
      nutritionalInfo: {
        calories: '280-320',
        protein: '3-4g',
        fiber: '8-10g',
        vitaminC: '150-200mg',
        potassium: '600-800mg'
      },
      ingredients: [
        'Seasonal fresh fruits',
        'Mixed berries',
        'Citrus fruits',
        'Tropical fruits',
        'Fresh vegetables',
        'Mixed nuts'
      ],
      deliveryInfo: {
        time: '30 minutes',
        areas: 'Hyderabad, Secunderabad',
        packaging: 'Eco-friendly containers',
        temperature: 'Refrigerated delivery'
      }
    },
    standard: {
      id: 'standard',
      name: 'Standard Plan',
      price: 2799,
      originalPrice: 3299,
      duration: '1 month',
      schedule: 'Monday to Saturday',
      weight: '600-700g',
      fruits: '5 varieties',
      images: ['🍎', '🍊', '🍌', '🥭', '🍍'],
      type: 'Regular',
      popular: true,
      description: 'Our most popular plan offering the perfect balance of variety, quality, and value. Ideal for individuals and families who want consistent, healthy fruit consumption.',
      benefits: [
        'Premium fruit selection',
        'Daily fresh delivery',
        '5 fruit varieties daily',
        'Free delivery included',
        'Priority customer support',
        'Flexible scheduling'
      ],
      nutritionalInfo: {
        calories: '280-320',
        protein: '3-4g',
        fiber: '8-10g',
        vitaminC: '150-200mg',
        potassium: '600-800mg'
      },
      ingredients: [
        'Premium seasonal fruits',
        'Organic berries',
        'Fresh citrus varieties',
        'Tropical fruits',
        'Leafy vegetables',
        'Premium nuts'
      ],
      deliveryInfo: {
        time: '30 minutes',
        areas: 'Hyderabad, Secunderabad, Cyberabad',
        packaging: 'Eco-friendly containers',
        temperature: 'Refrigerated delivery'
      }
    },
    corporate: {
      id: 'corporate',
      name: 'Corporate Plan',
      price: 2299,
      originalPrice: 2799,
      duration: '1 month',
      schedule: 'Monday to Friday',
      weight: '600-700g',
      fruits: '5 varieties',
      images: ['🍇', '🥝', '🍓', '🍑', '🍒'],
      type: 'Regular',
      description: 'Designed for working professionals and office environments. Delivered on weekdays to keep you energized throughout your work week.',
      benefits: [
        'Weekday delivery only',
        'Office-friendly packaging',
        'Bulk ordering available',
        'Corporate discounts',
        'Flexible payment terms',
        'Priority delivery'
      ],
      nutritionalInfo: {
        calories: '280-320',
        protein: '3-4g',
        fiber: '8-10g',
        vitaminC: '150-200mg',
        potassium: '600-800mg'
      },
      ingredients: [
        'Fresh seasonal fruits',
        'Energy-boosting berries',
        'Citrus varieties',
        'Office-friendly fruits',
        'Mixed vegetables',
        'Premium nuts'
      ],
      deliveryInfo: {
        time: '30 minutes',
        areas: 'Hyderabad, Secunderabad, Cyberabad',
        packaging: 'Office-friendly containers',
        temperature: 'Refrigerated delivery'
      }
    },
    'mini-standard': {
      id: 'mini-standard',
      name: 'Mini Bowl Standard',
      price: 1799,
      originalPrice: 2199,
      duration: '1 month',
      schedule: 'Monday to Saturday',
      weight: '250-350g',
      fruits: '3 varieties',
      images: ['🥣', '🍓', '🥝', '🍇', '🍎'],
      type: 'Mini',
      description: 'Perfect for kids, light eaters, or as a healthy snack. Smaller portions with the same quality and freshness guarantee.',
      benefits: [
        'Kid-friendly portions',
        'Perfect for snacks',
        '3 fruit varieties',
        'Easy to carry',
        'Same quality guarantee',
        'Affordable pricing'
      ],
      nutritionalInfo: {
        calories: '120-150',
        protein: '2-3g',
        fiber: '4-5g',
        vitaminC: '80-100mg',
        potassium: '300-400mg'
      },
      ingredients: [
        'Kid-friendly fruits',
        'Sweet berries',
        'Soft citrus',
        'Easy-to-eat fruits',
        'Mixed vegetables',
        'Crunchy nuts'
      ],
      deliveryInfo: {
        time: '30 minutes',
        areas: 'Hyderabad, Secunderabad',
        packaging: 'Kid-friendly containers',
        temperature: 'Refrigerated delivery'
      }
    },
    'mini-corporate': {
      id: 'mini-corporate',
      name: 'Mini Bowl Corporate',
      price: 1599,
      originalPrice: 1999,
      duration: '1 month',
      schedule: 'Monday to Friday',
      weight: '250-350g',
      fruits: '3 varieties',
      images: ['🥣', '🍊', '🍌', '🍇', '🥝'],
      type: 'Mini',
      description: 'Compact weekday plan for busy professionals who want healthy snacks during work hours. Perfect portion size for office consumption.',
      benefits: [
        'Weekday delivery',
        'Compact portions',
        'Office-friendly',
        '3 fruit varieties',
        'Quick consumption',
        'Professional packaging'
      ],
      nutritionalInfo: {
        calories: '120-150',
        protein: '2-3g',
        fiber: '4-5g',
        vitaminC: '80-100mg',
        potassium: '300-400mg'
      },
      ingredients: [
        'Portable fruits',
        'Energy berries',
        'Easy citrus',
        'Quick-eat fruits',
        'Light vegetables',
        'Mixed nuts'
      ],
      deliveryInfo: {
        time: '30 minutes',
        areas: 'Hyderabad, Secunderabad, Cyberabad',
        packaging: 'Professional containers',
        temperature: 'Refrigerated delivery'
      }
    }
  }

  useEffect(() => {
    // Find the selected plan
    const plan = planData[planId]
    if (plan) {
      setSelectedPlan(plan)
      
      // Get other plans (excluding current plan)
      const otherPlansList = Object.values(planData).filter(p => p.id !== plan.id)
      setOtherPlans(otherPlansList)
    } else {
      navigate('/plans')
    }
  }, [planId, navigate])

  const handlePlanSelect = (planData) => {
    const plan = {
      value: planData.id,
      name: planData.name,
      label: planData.name,
      price: planData.price,
      duration: planData.duration
    }
    addPlanToCart(plan, 1, 1)
    navigate('/cart')
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍏</div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Loading Plan Details...</h2>
          <p className="text-slate-600">Please wait while we fetch your plan information.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-emerald-600 hover:text-emerald-700">Home</Link>
            <span className="text-slate-400">/</span>
            <Link to="/plans" className="text-emerald-600 hover:text-emerald-700">Plans</Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600">{selectedPlan.name}</span>
          </div>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Gallery */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="aspect-[4/5] bg-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-8xl">
                {selectedPlan.images[selectedImage]}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {selectedPlan.images.slice(0, 3).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square w-20 bg-gray-100 rounded-xl border-2 transition-all duration-200 flex items-center justify-center ${
                    selectedImage === index
                      ? 'border-emerald-500'
                      : 'border-gray-200'
                  }`}
                >
                  <span className="text-2xl">{image}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2 font-['Poppins']">
                  {selectedPlan.name}
                </h1>
                <div className="flex items-center gap-2 text-slate-600 mb-4">
                  <span>🍎</span>
                  <span>🥭</span>
                  <span className="ml-2">Fresh & Nutritious, Every Day</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-900">
                  ₹{selectedPlan.price.toLocaleString()}.00
                </div>
                <div className="text-slate-500 text-sm">
                  / {selectedPlan.duration}
                </div>
              </div>
            </div>

            {/* Duration and Type */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-sm text-slate-500 mb-1">Duration</div>
                <div className="font-semibold text-slate-900">{selectedPlan.schedule}</div>
              </div>
              <div>
                <div className="text-sm text-slate-500 mb-1">Type</div>
                <div className="font-semibold text-slate-900">{selectedPlan.type} Bowls</div>
              </div>
            </div>

            {/* What's included and Fruits you may get */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">What's included</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                        <path d="M6.564.75a.75.75 0 0 1 1.06 0L3.53 4.844a.75.75 0 0 1-1.06 0L.44 2.814a.75.75 0 1 1 1.06-1.06L3 3.283 6.564-.25a.75.75 0 0 1 1.06 0z"/>
                      </svg>
                    </div>
                    <span className="text-slate-700">{selectedPlan.fruits}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                        <path d="M6.564.75a.75.75 0 0 1 1.06 0L3.53 4.844a.75.75 0 0 1-1.06 0L.44 2.814a.75.75 0 1 1 1.06-1.06L3 3.283 6.564-.25a.75.75 0 0 1 1.06 0z"/>
                      </svg>
                    </div>
                    <span className="text-slate-700">1 Vegetable</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                        <path d="M6.564.75a.75.75 0 0 1 1.06 0L3.53 4.844a.75.75 0 0 1-1.06 0L.44 2.814a.75.75 0 1 1 1.06-1.06L3 3.283 6.564-.25a.75.75 0 0 1 1.06 0z"/>
                      </svg>
                    </div>
                    <span className="text-slate-700">1 Nut / Sprouts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 8 8">
                        <path d="M6.564.75a.75.75 0 0 1 1.06 0L3.53 4.844a.75.75 0 0 1-1.06 0L.44 2.814a.75.75 0 1 1 1.06-1.06L3 3.283 6.564-.25a.75.75 0 0 1 1.06 0z"/>
                      </svg>
                    </div>
                    <span className="text-slate-700">{selectedPlan.weight}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Fruits you may get</h3>
                <ul className="space-y-1 text-slate-700">
                  <li>• Apple</li>
                  <li>• Orange</li>
                  <li>• Banana</li>
                  <li>• Papaya</li>
                  <li>• Grapes</li>
                </ul>
                <p className="text-sm text-slate-500 mt-3">
                  Rotates seasonally and may vary by day.
                </p>
              </div>
            </div>

            {/* Nutritional Information */}
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Approx. nutrition per bowl</h3>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <div className="text-lg font-semibold text-slate-900">250</div>
                  <div className="text-sm text-slate-600">Calories</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <div className="text-lg font-semibold text-slate-900">10g</div>
                  <div className="text-sm text-slate-600">Fiber</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <div className="text-lg font-semibold text-slate-900">120%</div>
                  <div className="text-sm text-slate-600">Vitamin C</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <div className="text-lg font-semibold text-slate-900">20%</div>
                  <div className="text-sm text-slate-600">Potassium</div>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 text-center">
                  <div className="text-lg font-semibold text-slate-900">7g</div>
                  <div className="text-sm text-slate-600">Protein</div>
                </div>
              </div>
              <p className="text-sm text-slate-500 mt-3">
                Values are indicative and can vary with seasonal selection.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={() => handlePlanSelect(selectedPlan)}
                className="flex-1 px-6 py-3 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Add to cart
              </button>
              <button
                onClick={() => navigate('/cart')}
                className="px-6 py-3 border border-gray-300 text-slate-900 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Go to cart
              </button>
              <button
                onClick={() => navigate('/plans')}
                className="px-6 py-3 text-slate-900 font-medium hover:text-slate-600 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Other Plans Section */}
        {otherPlans.length > 0 && (
          <section className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4 font-['Poppins']">
                Other Plans
              </h2>
              <p className="text-lg text-slate-600">
                Explore our other fruit bowl plans
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {otherPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(`/plan/${plan.id}`)}
                >
                  {/* Plan Image */}
                  <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
                    {plan.images[0]}
                  </div>

                  {/* Plan Info */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-slate-900 text-lg">{plan.name}</h3>
                      {plan.popular && (
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-slate-500">
                      {plan.schedule}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-slate-900">
                        ₹{plan.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-slate-400 line-through">
                        ₹{plan.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="text-sm text-slate-600">
                      {plan.fruits} • {plan.weight}
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          navigate(`/plan/${plan.id}`)
                        }}
                        className="flex-1 px-3 py-2 text-sm border border-emerald-500 text-emerald-600 rounded-lg hover:bg-emerald-50 transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePlanSelect(plan)
                        }}
                        className="flex-1 px-3 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Plans Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => navigate('/plans')}
                className="px-8 py-3 border border-gray-300 text-slate-900 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                View All Plans
              </button>
            </div>
          </section>
        )}

      </div>
    </div>
  )
}

export default PlanDetails
