import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BabyProgressBar } from "./Progressbar"

interface LoadingScreenProps {
  /**
   * Duration of the loading in milliseconds
   */
  duration?: number
  /**
   * Callback function to execute when loading is complete
   */
  onComplete?: () => void
  /**
   * Optional className for additional styling
   */
  className?: string
  /**
   * Whether the loading screen is visible
   */
  isVisible?: boolean
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  duration = 5000,
  onComplete,
  className = "",
  isVisible = true
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      setProgress(0)
      return
    }

    const startTime = Date.now()
    
    const updateProgress = () => {
      const currentTime = Date.now()
      const elapsedTime = currentTime - startTime
      const calculatedProgress = Math.min(Math.floor((elapsedTime / duration) * 100), 100)
      
      setProgress(calculatedProgress)
      
      if (calculatedProgress < 100) {
        requestAnimationFrame(updateProgress)
      } else if (onComplete) {
        setTimeout(() => {
          onComplete()
        }, 300) // Small delay for visual completion
      }
    }
    
    const animationId = requestAnimationFrame(updateProgress)
    
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [duration, onComplete, isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={`fixed inset-0 flex flex-col items-center justify-center z-50 ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Blurred background */}
          <motion.div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-12 z-10 w-full"
          >
            {/* Logo with breathing and glow animation */}
            <div className="relative">
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-[#AEA4BF]/30 blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ 
                  duration: 3, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              {/* Logo with breathing animation */}
              <motion.div
                className="w-40 h-40 flex items-center justify-center relative z-10"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  duration: 3, 
                  ease: "easeInOut", 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <img
                  src="/logo_clinic.png"
                  alt="Jimirene Clinic"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>
            
            {/* Wider progress bar container - matching the image width */}
            <div className="w-full max-w-4xl px-4 mx-auto">
              <BabyProgressBar progress={progress} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 