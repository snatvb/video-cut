import { useEffect } from 'react'

const useRafLoop = (callback, dependencies) => {
  useEffect(() => {
    let rafId = 0

    const handleLoop = () => {
      rafId = requestAnimationFrame(() => {
        callback()
        handleLoop()
      })
    }

    handleLoop()

    return () => {
      cancelAnimationFrame(rafId)
    }
  }, dependencies)
}

export default useRafLoop
