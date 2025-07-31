import { useState, useEffect } from 'react'

export function useScrollToBottom(offset = 100) {
  const [isBottom, setIsBottom] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      const scrolledFromTop = window.scrollY + window.innerHeight
      const pageHeight = document.documentElement.scrollHeight
      const isCurrentlyAtBottom = pageHeight - scrolledFromTop < offset

      if (!ticking) {
        if (isCurrentlyAtBottom) {
          setIsBottom(isCurrentlyAtBottom)
          ticking = true
          setTimeout(() => setIsBottom(false), 1)
        }
      }
      if (!isCurrentlyAtBottom) ticking = false
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [offset])

  return isBottom
}
