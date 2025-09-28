import { useEffect } from 'react'

// Utility function to scroll to top of the page
export const scrollToTop = (behavior = 'smooth') => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: behavior
  })
}

// Hook to scroll to top when component mounts or dependencies change
export const useScrollToTop = (dependencies = []) => {
  useEffect(() => {
    scrollToTop('instant')
  }, dependencies)
}
