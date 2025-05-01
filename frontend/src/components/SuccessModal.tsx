import { X } from "lucide-react"

interface ErrorModal {
  title?: string
  message?: string
  buttonText?: string
  onClose?: () => void
  onRetry?: () => void
}

export default function ErrorModal({
  title = "Success!",
  message = "Interaction success!!",
  buttonText = "Proceed",
  onClose,
  onRetry,
}: ErrorModal) {
  return (
    <div className="w-full max-w-md mx-auto overflow-hidden rounded-md shadow-lg border border-gray-200">
      {/* Header with close button */}
      <div className="bg-green-400 p-4 flex justify-end">
        <button
          onClick={onClose}
          className="rounded-full border-2 border-white p-2 text-white hover:bg-green-500 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="bg-white p-8 flex flex-col items-center text-center">
        <h2 className="text-3xl font-medium text-gray-700 mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>


        <button
          onClick={onRetry}
          className="bg-green-400 hover:bg-green-800 text-white font-medium px-8 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}
