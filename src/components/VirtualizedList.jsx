import React, { useState, useEffect, useRef, useMemo } from 'react'
import { throttle } from '../utils/performance'

const VirtualizedList = ({
  items = [],
  itemHeight = 200,
  containerHeight = 600,
  renderItem,
  className = '',
  buffer = 5,
  onScroll,
}) => {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef()
  
  // Calculate visible range
  const visibleRange = useMemo(() => {
    const visibleStart = Math.floor(scrollTop / itemHeight)
    const visibleEnd = Math.ceil((scrollTop + containerHeight) / itemHeight)
    
    return {
      start: Math.max(0, visibleStart - buffer),
      end: Math.min(items.length, visibleEnd + buffer)
    }
  }, [scrollTop, itemHeight, containerHeight, items.length, buffer])
  
  // Get visible items
  const visibleItems = useMemo(() => {
    return items.slice(visibleRange.start, visibleRange.end).map((item, index) => ({
      ...item,
      index: visibleRange.start + index
    }))
  }, [items, visibleRange])
  
  // Throttled scroll handler
  const handleScroll = useMemo(
    () => throttle((e) => {
      const newScrollTop = e.target.scrollTop
      setScrollTop(newScrollTop)
      onScroll?.(newScrollTop)
    }, 16), // ~60fps
    [onScroll]
  )
  
  // Effect to handle scroll events
  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])
  
  const totalHeight = items.length * itemHeight
  const offsetY = visibleRange.start * itemHeight
  
  return (
    <div
      ref={containerRef}
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        >
          {visibleItems.map((item) => (
            <div
              key={item.id || item.index}
              style={{ height: itemHeight }}
              className="w-full"
            >
              {renderItem(item, item.index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VirtualizedList