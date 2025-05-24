import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface UseLoadingScreenOptions {
  /**
   * Duration of the loading in milliseconds
   */
  duration?: number
}

/**
 * Custom hook for managing the LoadingScreen for page transitions
 * @param options - Loading screen options
 * @returns Object with loading state and navigation functions
 */
export const useLoadingScreen = (options: UseLoadingScreenOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [destination, setDestination] = useState<string | null>(null)
  const navigate = useNavigate()
  
  const { duration = 3000 } = options
  
  /**
   * Navigate to a new route with a loading screen
   * @param path - The path to navigate to
   */
  const navigateWithLoading = (path: string) => {
    setIsLoading(true)
    setDestination(path)
  }
  
  /**
   * Handle the completion of the loading screen
   */
  const handleLoadingComplete = () => {
    if (destination) {
      navigate(destination)
      setDestination(null)
    }
    setIsLoading(false)
  }
  
  return {
    isLoading,
    navigateWithLoading,
    handleLoadingComplete,
    duration
  }
} 