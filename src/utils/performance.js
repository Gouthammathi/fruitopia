// Performance optimization utilities

// Debounce function for search and input handling
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll and resize events
export const throttle = (func, wait) => {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), wait)
    }
  }
}

// Memoization helper for expensive calculations
export const memoize = (fn) => {
  const cache = new Map()
  return (...args) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  }
}

// Image optimization helpers
export const getOptimizedImageUrl = (originalUrl, width = 400, height = 300, quality = 80) => {
  // For placeholder API or CDN optimization
  if (originalUrl.includes('placeholder')) {
    return `${originalUrl}/${width}x${height}`
  }
  
  // For real CDN implementation, you would modify this
  // Example: return `${originalUrl}?w=${width}&h=${height}&q=${quality}&auto=format`
  return originalUrl
}

// Preload critical resources
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Preload multiple images
export const preloadImages = async (srcArray) => {
  try {
    const promises = srcArray.map(src => preloadImage(src))
    await Promise.all(promises)
    return true
  } catch (error) {
    console.warn('Some images failed to preload:', error)
    return false
  }
}

// Local storage with expiration
export const setItemWithExpiry = (key, value, ttl = 24 * 60 * 60 * 1000) => {
  const now = new Date()
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export const getItemWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key)
  
  if (!itemStr) {
    return null
  }
  
  try {
    const item = JSON.parse(itemStr)
    const now = new Date()
    
    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key)
      return null
    }
    
    return item.value
  } catch (error) {
    localStorage.removeItem(key)
    return null
  }
}

// Bundle size optimization - dynamic imports
export const lazyLoad = (importFunc) => {
  return React.lazy(importFunc)
}

// Performance monitoring
export const measurePerformance = (name, fn) => {
  return (...args) => {
    const start = performance.now()
    const result = fn(...args)
    const end = performance.now()
    console.log(`${name} took ${end - start} milliseconds`)
    return result
  }
}

// Virtual scrolling helper for large lists
export const calculateVisibleRange = (containerHeight, itemHeight, scrollTop, buffer = 5) => {
  const visibleStart = Math.floor(scrollTop / itemHeight)
  const visibleEnd = Math.ceil((scrollTop + containerHeight) / itemHeight)
  
  return {
    start: Math.max(0, visibleStart - buffer),
    end: visibleEnd + buffer
  }
}

// Request optimization
export const createRequestQueue = (maxConcurrent = 3) => {
  let running = 0
  const queue = []
  
  const processQueue = async () => {
    if (running >= maxConcurrent || queue.length === 0) {
      return
    }
    
    running++
    const { request, resolve, reject } = queue.shift()
    
    try {
      const result = await request()
      resolve(result)
    } catch (error) {
      reject(error)
    } finally {
      running--
      processQueue()
    }
  }
  
  return (request) => {
    return new Promise((resolve, reject) => {
      queue.push({ request, resolve, reject })
      processQueue()
    })
  }
}

// Memory management
export const createCleanupManager = () => {
  const cleanupFunctions = []
  
  return {
    add: (cleanupFn) => {
      cleanupFunctions.push(cleanupFn)
    },
    cleanup: () => {
      cleanupFunctions.forEach(fn => {
        try {
          fn()
        } catch (error) {
          console.warn('Cleanup function failed:', error)
        }
      })
      cleanupFunctions.length = 0
    }
  }
}

// Web Worker utilities
export const createWorker = (workerFunction) => {
  const blob = new Blob([`(${workerFunction.toString()})()`], { type: 'application/javascript' })
  return new Worker(URL.createObjectURL(blob))
}

// Service Worker registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('ServiceWorker registered:', registration)
      return registration
    } catch (error) {
      console.log('ServiceWorker registration failed:', error)
      return null
    }
  }
  return null
}

// Critical CSS detection
export const detectCriticalCSS = () => {
  const criticalElements = document.querySelectorAll('[data-critical]')
  const criticalStyles = []
  
  criticalElements.forEach(element => {
    const computedStyle = window.getComputedStyle(element)
    // Extract critical styles (simplified)
    criticalStyles.push({
      selector: element.className,
      styles: {
        display: computedStyle.display,
        position: computedStyle.position,
        width: computedStyle.width,
        height: computedStyle.height,
      }
    })
  })
  
  return criticalStyles
}

// Resource hints
export const addResourceHints = (hints) => {
  hints.forEach(({ rel, href, as, type }) => {
    const link = document.createElement('link')
    link.rel = rel
    link.href = href
    if (as) link.as = as
    if (type) link.type = type
    document.head.appendChild(link)
  })
}

// Performance observer
export const createPerformanceObserver = (callback) => {
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      callback(entries)
    })
    
    observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] })
    return observer
  }
  return null
}