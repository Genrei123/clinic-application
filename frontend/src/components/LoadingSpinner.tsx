import { motion, AnimatePresence } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
  isVisible?: boolean
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
  isVisible = true
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  }

  const glowSizes = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-20 h-20"
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={`flex items-center justify-center ${className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative">
            {/* Glow effect */}
            <motion.div
              className={`absolute inset-0 ${glowSizes[size]} -m-2 rounded-full bg-[#AEA4BF]/30 blur-md`}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            {/* Logo with breathing animation */}
            <motion.div
              className={`${sizeClasses[size]} flex items-center justify-center relative z-10`}
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2, 
                ease: "easeInOut", 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <img
                src="/baby.png"
                alt="Loading"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 