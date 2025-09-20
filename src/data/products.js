// Comprehensive product data for Fruitopia e-commerce platform

export const productCategories = [
  {
    id: 'seasonal',
    name: 'Seasonal Fruits',
    description: 'Fresh seasonal fruits at their peak ripeness',
    image: '🍓',
    featured: true
  },
  {
    id: 'imported',
    name: 'Imported Varieties',
    description: 'Premium imported fruits from around the world',
    image: '🥝',
    featured: true
  },
  {
    id: 'organic',
    name: 'Organic Selection',
    description: 'Certified organic fruits grown naturally',
    image: '🍎',
    featured: true
  },
  {
    id: 'tropical',
    name: 'Tropical Fruits',
    description: 'Exotic tropical fruits with unique flavors',
    image: '🥭',
    featured: false
  },
  {
    id: 'citrus',
    name: 'Citrus Fruits',
    description: 'Vitamin C rich citrus fruits',
    image: '🍊',
    featured: false
  },
  {
    id: 'berries',
    name: 'Fresh Berries',
    description: 'Antioxidant-rich fresh berries',
    image: '🫐',
    featured: false
  }
]

export const products = [
  // Seasonal Fruits
  {
    id: 1,
    name: "Alphonso Mango",
    category: "seasonal",
    subcategory: "tropical",
    price: 450,
    originalPrice: 499,
    unit: "kg",
    image: "🥭",
    images: ["🥭", "🥭", "🥭"],
    badge: "Premium",
    badgeColor: "yellow",
    inStock: true,
    stockQuantity: 25,
    description: "Sweet and juicy Alphonso mangoes from Ratnagiri, known as the king of mangoes",
    longDescription: "Alphonso mangoes, also known as Hapus, are considered the finest variety of mangoes in the world. Grown in the Konkan region of Maharashtra, these mangoes are known for their rich, creamy texture and sweet, aromatic flavor. Each mango is hand-picked at the perfect ripeness to ensure maximum sweetness and quality.",
    origin: "Ratnagiri, Maharashtra",
    nutritionalInfo: {
      calories: 60,
      carbs: "15g",
      fiber: "1.6g",
      sugar: "13.7g",
      protein: "0.8g",
      vitaminC: "36.4mg",
      vitaminA: "54μg"
    },
    benefits: ["Rich in Vitamin C", "Good source of Vitamin A", "Boosts immunity", "Improves digestion"],
    storageInstructions: "Store at room temperature until ripe, then refrigerate for up to 5 days",
    shelfLife: "3-5 days when ripe",
    deliveryTime: "Same day delivery available",
    tags: ["premium", "seasonal", "sweet", "aromatic"],
    rating: 4.8,
    reviewCount: 156,
    featured: true
  },
  {
    id: 2,
    name: "Fresh Strawberries",
    category: "seasonal",
    subcategory: "berries",
    price: 280,
    originalPrice: 320,
    unit: "pack (250g)",
    image: "🍓",
    images: ["🍓", "🍓", "🍓"],
    badge: "Fresh",
    badgeColor: "green",
    inStock: true,
    stockQuantity: 40,
    description: "Sweet and fresh strawberries packed with antioxidants",
    longDescription: "Our fresh strawberries are carefully selected for their perfect balance of sweetness and tartness. Rich in vitamin C and antioxidants, these berries are perfect for snacking, smoothies, or desserts. Each pack contains hand-picked strawberries that are firm, juicy, and bursting with flavor.",
    origin: "Mahabaleshwar, Maharashtra",
    nutritionalInfo: {
      calories: 32,
      carbs: "7.7g",
      fiber: "2g",
      sugar: "4.9g",
      protein: "0.7g",
      vitaminC: "58.8mg",
      folate: "24μg"
    },
    benefits: ["High in antioxidants", "Boosts immune system", "Heart healthy", "Anti-inflammatory"],
    storageInstructions: "Refrigerate immediately and consume within 2-3 days",
    shelfLife: "2-3 days when refrigerated",
    deliveryTime: "Same day delivery available",
    tags: ["antioxidants", "vitamin-c", "fresh", "seasonal"],
    rating: 4.6,
    reviewCount: 89,
    featured: true
  },
  {
    id: 3,
    name: "Sweet Oranges",
    category: "seasonal",
    subcategory: "citrus",
    price: 180,
    originalPrice: 220,
    unit: "kg",
    image: "🍊",
    images: ["🍊", "🍊", "🍊"],
    badge: "Juicy",
    badgeColor: "orange",
    inStock: true,
    stockQuantity: 60,
    description: "Fresh and juicy oranges packed with vitamin C",
    longDescription: "Our sweet oranges are sourced from the finest orchards, offering the perfect balance of sweetness and citrus freshness. These oranges are excellent for fresh juice, snacking, or adding to salads. Each orange is carefully selected for its juiciness and vitamin C content.",
    origin: "Nagpur, Maharashtra",
    nutritionalInfo: {
      calories: 47,
      carbs: "11.8g",
      fiber: "2.4g",
      sugar: "9.4g",
      protein: "0.9g",
      vitaminC: "53.2mg",
      calcium: "40mg"
    },
    benefits: ["Excellent source of Vitamin C", "Supports immune system", "Good for heart health", "Aids digestion"],
    storageInstructions: "Store at room temperature for up to 1 week or refrigerate for 2-3 weeks",
    shelfLife: "1-3 weeks depending on storage",
    deliveryTime: "Next day delivery",
    tags: ["vitamin-c", "citrus", "fresh", "juicy"],
    rating: 4.4,
    reviewCount: 124,
    featured: false
  },

  // Imported Varieties
  {
    id: 4,
    name: "Imported Red Apples",
    category: "imported",
    subcategory: "temperate",
    price: 320,
    originalPrice: 380,
    unit: "kg",
    image: "🍎",
    images: ["🍎", "🍎", "🍎"],
    badge: "Imported",
    badgeColor: "blue",
    inStock: true,
    stockQuantity: 35,
    description: "Crisp and sweet imported apples with excellent crunch",
    longDescription: "Premium red apples imported from the best orchards in Washington State. These apples are known for their exceptional crispness, sweet flavor, and beautiful red color. Perfect for snacking, baking, or adding to salads. Each apple is carefully inspected to ensure premium quality.",
    origin: "Washington State, USA",
    nutritionalInfo: {
      calories: 52,
      carbs: "13.8g",
      fiber: "2.4g",
      sugar: "10.4g",
      protein: "0.3g",
      vitaminC: "4.6mg",
      potassium: "107mg"
    },
    benefits: ["High in fiber", "Good for heart health", "Supports digestive health", "Natural antioxidants"],
    storageInstructions: "Store in refrigerator for best quality, can last up to 4-6 weeks",
    shelfLife: "4-6 weeks when refrigerated",
    deliveryTime: "Next day delivery",
    tags: ["imported", "crisp", "sweet", "premium"],
    rating: 4.7,
    reviewCount: 203,
    featured: true
  },
  {
    id: 5,
    name: "Premium Kiwi Fruit",
    category: "imported",
    subcategory: "exotic",
    price: 180,
    originalPrice: 200,
    unit: "piece",
    image: "🥝",
    images: ["🥝", "🥝", "🥝"],
    badge: "Vitamin C",
    badgeColor: "green",
    inStock: true,
    stockQuantity: 50,
    description: "Rich in vitamin C and antioxidants with unique tangy-sweet flavor",
    longDescription: "Premium kiwi fruits imported from New Zealand, known for their exceptional quality and taste. These kiwis are rich in vitamin C, fiber, and antioxidants. The unique tangy-sweet flavor makes them perfect for fruit salads, smoothies, or eating fresh. Each kiwi is carefully selected for optimal ripeness.",
    origin: "New Zealand",
    nutritionalInfo: {
      calories: 61,
      carbs: "14.7g",
      fiber: "3g",
      sugar: "9g",
      protein: "1.1g",
      vitaminC: "92.7mg",
      vitaminK: "40.3μg"
    },
    benefits: ["Extremely high in Vitamin C", "Boosts immune system", "Good for digestion", "Anti-inflammatory"],
    storageInstructions: "Store at room temperature until ripe, then refrigerate for up to 1 week",
    shelfLife: "1 week when ripe and refrigerated",
    deliveryTime: "Next day delivery",
    tags: ["imported", "vitamin-c", "antioxidants", "exotic"],
    rating: 4.5,
    reviewCount: 76,
    featured: false
  },
  {
    id: 6,
    name: "Red Cherries",
    category: "imported",
    subcategory: "stone-fruit",
    price: 699,
    originalPrice: 749,
    unit: "pack (200g)",
    image: "🍒",
    images: ["🍒", "🍒", "🍒"],
    badge: "Limited",
    badgeColor: "red",
    inStock: false,
    stockQuantity: 0,
    description: "Premium imported cherries - sweet, juicy, and perfectly ripe",
    longDescription: "Premium red cherries imported from Chile, available for a limited time. These cherries are known for their deep red color, sweet flavor, and juicy texture. Rich in antioxidants and perfect for snacking or adding to desserts. Each pack contains carefully selected cherries at peak ripeness.",
    origin: "Central Valley, Chile",
    nutritionalInfo: {
      calories: 63,
      carbs: "16g",
      fiber: "2.1g",
      sugar: "12.8g",
      protein: "1g",
      vitaminC: "7mg",
      potassium: "222mg"
    },
    benefits: ["Rich in antioxidants", "Anti-inflammatory properties", "Supports heart health", "Natural melatonin"],
    storageInstructions: "Refrigerate immediately and consume within 3-5 days",
    shelfLife: "3-5 days when refrigerated",
    deliveryTime: "Currently out of stock",
    tags: ["imported", "premium", "limited", "antioxidants"],
    rating: 4.9,
    reviewCount: 45,
    featured: true
  },

  // Organic Selection
  {
    id: 7,
    name: "Organic Bananas",
    category: "organic",
    subcategory: "tropical",
    price: 60,
    originalPrice: 80,
    unit: "dozen",
    image: "🍌",
    images: ["🍌", "🍌", "🍌"],
    badge: "Organic",
    badgeColor: "green",
    inStock: true,
    stockQuantity: 80,
    description: "Naturally grown organic bananas without any pesticides",
    longDescription: "Our organic bananas are grown without synthetic pesticides, herbicides, or fertilizers. These bananas are naturally sweet, rich in potassium, and perfect for snacking, smoothies, or baking. Each bunch is carefully selected for quality and ripeness.",
    origin: "Kerala, India",
    nutritionalInfo: {
      calories: 89,
      carbs: "22.8g",
      fiber: "2.6g",
      sugar: "12.2g",
      protein: "1.1g",
      potassium: "358mg",
      vitaminB6: "0.4mg"
    },
    benefits: ["High in potassium", "Good source of Vitamin B6", "Natural energy boost", "Supports heart health"],
    storageInstructions: "Store at room temperature, refrigerate when ripe to slow ripening",
    shelfLife: "5-7 days at room temperature",
    deliveryTime: "Same day delivery available",
    tags: ["organic", "natural", "potassium", "energy"],
    rating: 4.3,
    reviewCount: 167,
    featured: false
  },
  {
    id: 8,
    name: "Organic Green Grapes",
    category: "organic",
    subcategory: "vine-fruit",
    price: 120,
    originalPrice: 150,
    unit: "pack (500g)",
    image: "🍇",
    images: ["🍇", "🍇", "🍇"],
    badge: "Organic",
    badgeColor: "green",
    inStock: true,
    stockQuantity: 30,
    description: "Sweet organic grapes grown without chemicals",
    longDescription: "Our organic green grapes are grown using sustainable farming practices without any synthetic chemicals. These grapes are sweet, juicy, and perfect for snacking or adding to fruit salads. Rich in antioxidants and natural sugars for a healthy energy boost.",
    origin: "Nashik, Maharashtra",
    nutritionalInfo: {
      calories: 62,
      carbs: "16.3g",
      fiber: "0.9g",
      sugar: "15.5g",
      protein: "0.6g",
      vitaminC: "3.2mg",
      vitaminK: "14.6μg"
    },
    benefits: ["Rich in antioxidants", "Heart healthy", "Good for brain health", "Natural energy source"],
    storageInstructions: "Refrigerate and consume within 5-7 days",
    shelfLife: "5-7 days when refrigerated",
    deliveryTime: "Next day delivery",
    tags: ["organic", "antioxidants", "sweet", "natural"],
    rating: 4.4,
    reviewCount: 92,
    featured: false
  },

  // Additional Products
  {
    id: 9,
    name: "Dragon Fruit",
    category: "imported",
    subcategory: "exotic",
    price: 250,
    originalPrice: 300,
    unit: "piece",
    image: "🐉",
    images: ["🐉", "🐉", "🐉"],
    badge: "Exotic",
    badgeColor: "purple",
    inStock: true,
    stockQuantity: 15,
    description: "Exotic dragon fruit with unique taste and appearance",
    longDescription: "Dragon fruit, also known as pitaya, is an exotic fruit with a unique appearance and mild, sweet flavor. Rich in vitamin C, iron, and antioxidants. The flesh is white with tiny black seeds and has a texture similar to kiwi. Perfect for fruit bowls and exotic dishes.",
    origin: "Vietnam",
    nutritionalInfo: {
      calories: 60,
      carbs: "13g",
      fiber: "3g",
      sugar: "8g",
      protein: "1.2g",
      vitaminC: "9mg",
      iron: "0.74mg"
    },
    benefits: ["Rich in antioxidants", "Good source of iron", "Supports immune system", "Low in calories"],
    storageInstructions: "Store at room temperature until ripe, then refrigerate for 2-3 days",
    shelfLife: "2-3 days when ripe",
    deliveryTime: "Next day delivery",
    tags: ["exotic", "antioxidants", "unique", "imported"],
    rating: 4.2,
    reviewCount: 34,
    featured: false
  },
  {
    id: 10,
    name: "Fresh Pineapple",
    category: "tropical",
    subcategory: "tropical",
    price: 80,
    originalPrice: 100,
    unit: "piece",
    image: "🍍",
    images: ["🍍", "🍍", "🍍"],
    badge: "Tropical",
    badgeColor: "yellow",
    inStock: true,
    stockQuantity: 20,
    description: "Sweet and tangy fresh pineapple, perfectly ripe",
    longDescription: "Fresh, juicy pineapples that are sweet, tangy, and perfectly ripe. Rich in vitamin C and bromelain, an enzyme that aids digestion. Perfect for fresh consumption, smoothies, or cooking. Each pineapple is hand-selected for optimal ripeness and sweetness.",
    origin: "Kerala, India",
    nutritionalInfo: {
      calories: 50,
      carbs: "13.1g",
      fiber: "1.4g",
      sugar: "9.9g",
      protein: "0.5g",
      vitaminC: "47.8mg",
      manganese: "0.9mg"
    },
    benefits: ["Rich in Vitamin C", "Contains bromelain enzyme", "Aids digestion", "Anti-inflammatory"],
    storageInstructions: "Store at room temperature for 2-3 days or refrigerate cut pieces",
    shelfLife: "2-3 days at room temperature, 5-7 days cut and refrigerated",
    deliveryTime: "Same day delivery available",
    tags: ["tropical", "vitamin-c", "digestive", "fresh"],
    rating: 4.5,
    reviewCount: 78,
    featured: false
  }
]

// Coupon codes
export const availableCoupons = [
  {
    code: "FRESH10",
    type: "percentage",
    value: 10,
    minOrderValue: 200,
    description: "10% off on orders above ₹200",
    validUntil: "2024-12-31",
    isActive: true
  },
  {
    code: "NEWUSER",
    type: "percentage",
    value: 15,
    minOrderValue: 300,
    description: "15% off for new users on orders above ₹300",
    validUntil: "2024-12-31",
    isActive: true
  },
  {
    code: "BULK50",
    type: "fixed",
    value: 50,
    minOrderValue: 500,
    description: "₹50 off on orders above ₹500",
    validUntil: "2024-12-31",
    isActive: true
  }
]

// Delivery options
export const deliveryOptions = [
  {
    id: "same-day",
    name: "Same Day Delivery",
    description: "Get your order within 2-4 hours",
    price: 50,
    estimatedTime: "2-4 hours",
    available: true
  },
  {
    id: "next-day",
    name: "Next Day Delivery",
    description: "Delivered by next day",
    price: 25,
    estimatedTime: "Next day",
    available: true
  },
  {
    id: "standard",
    name: "Standard Delivery",
    description: "Delivered within 2-3 days",
    price: 0,
    estimatedTime: "2-3 days",
    available: true
  }
]

// Helper functions

export const getProductsByCategory = (category) => {
  if (category === 'all') return products
  return products.filter(product => product.category === category)
}

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

export const filterProducts = (products, filters) => {
  let filteredProducts = [...products]
  
  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === filters.category)
  }
  
  // Filter by price range
  if (filters.priceRange) {
    filteredProducts = filteredProducts.filter(product => 
      product.price >= filters.priceRange.min && product.price <= filters.priceRange.max
    )
  }
  
  // Filter by availability
  if (filters.availability && filters.availability !== 'all') {
    if (filters.availability === 'in-stock') {
      filteredProducts = filteredProducts.filter(product => product.inStock)
    } else if (filters.availability === 'out-of-stock') {
      filteredProducts = filteredProducts.filter(product => !product.inStock)
    }
  }
  
  // Search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase()
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }
  
  return filteredProducts
}

export const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products]
  
  switch (sortBy) {
    case 'name':
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name))
    case 'price-low-high':
      return sortedProducts.sort((a, b) => a.price - b.price)
    case 'price-high-low':
      return sortedProducts.sort((a, b) => b.price - a.price)
    case 'rating':
      return sortedProducts.sort((a, b) => b.rating - a.rating)
    case 'newest':
      return sortedProducts.sort((a, b) => b.id - a.id)
    default:
      return sortedProducts
  }
}

// Get product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === id) || null
}

// Get related products by category
export const getRelatedProducts = (productId, category, limit = 4) => {
  return products
    .filter(product => product.id !== productId && product.category === category)
    .slice(0, limit)
}