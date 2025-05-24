import { useState } from "react"

/**
 * Custom hook for managing loading state in components
 * @returns Object with loading state and helper functions
 */
export const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false)
  
  /**
   * Wrapper function to execute an async operation with loading state
   * @param asyncFn - Async function to execute
   * @returns Result of the async function
   */
  const withLoading = async <T,>(asyncFn: () => Promise<T>): Promise<T> => {
    try {
      setIsLoading(true)
      return await asyncFn()
    } finally {
      setIsLoading(false)
    }
  }
  
  return {
    isLoading,
    setIsLoading,
    withLoading
  }
} 