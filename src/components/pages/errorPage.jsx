import { Leaf, Home, ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ErrorPage() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate("/")
  }

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-xl opacity-20"></div>
            <div className="relative bg-white rounded-full p-4 shadow-lg">
              <Leaf className="h-12 w-12 text-green-600" />
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold text-green-800">404</h1>
            <h2 className="text-2xl font-bold text-green-900">Page Not Found</h2>
            <p className="text-green-700">
              Oops! The page you're looking for seems to have wandered off into the forest.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleGoHome}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all transform hover:scale-[1.02]"
            >
              <Home className="h-5 w-5 mr-2" />
              Go Home
            </button>
            <button
              onClick={handleGoBack}
              className="inline-flex items-center justify-center px-6 py-3 border border-green-600 text-green-600 bg-transparent rounded-lg font-medium hover:bg-green-50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Go Back
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12">
          <p className="text-sm text-green-600">
            Need help? Contact us at{" "}
            <a href="mailto:hello@ecovision.com" className="hover:underline font-medium">
              hello@ecovision.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}