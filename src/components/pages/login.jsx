
import { Leaf, Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { context } from "../context"
import { jwtDecode } from "jwt-decode";
import { images } from '../../assets/images'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  const { setAccessToken, setRefreshToken, setId, setRol } = useContext(context) //setters para guardar valores en las variables del contexto
  const ctx = useContext(context); //para acceder al contexto y ver lo que este guardado
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(import.meta.env.VITE_LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({username, password }),
      })

      const data = await response.json()

      if (response.ok && data.accessToken && data.refreshToken) {
        // Decodificar el accessToken para obtener info del usuario
        const decoded = jwtDecode(data.accessToken);
        
        // Guardar tokens en contexto y almacenamiento
        setAccessToken(data.accessToken)
        setRefreshToken(data.refreshToken)
        setId(decoded.id || "")
        setRol(decoded.role || "")
        
        // Guardar en almacenamiento
        sessionStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
        localStorage.setItem('userId', decoded.id || "")
        localStorage.setItem('userRol', decoded.role || "")
        //console.log("Login exitoso, rol: ", decoded.role, " id: ", decoded.id)

        //A sweet alert can be added here if needed, with 2sec delay
        navigate("/userProfile")
        
      } else {
        setError(data.msg || 'Error inesperado en el inicio de sesión')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Error de conexión. Intenta nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log("Forgot password clicked")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <img src={images.logos.logoRecortado} alt="PGA Logo" className="h-30 w-30" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-green-900 mb-2">Bienvenido a PGA</h1>
          <p className="text-green-700">Inicia sesion para registrar recolecciones !</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-green-800">
                Direccion de e-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-green-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-lg bg-green-50/50 text-green-900 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                  placeholder="Ingresa tu email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-green-800">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-green-500" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-green-200 rounded-lg bg-green-50/50 text-green-900 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                  placeholder="Ingresa tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500 hover:text-green-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password 
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-green-600 bg-green-50 border-green-300 rounded focus:ring-green-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-green-700">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-green-600 hover:text-green-700 hover:underline transition-colors"
              >
                Forgot password?
              </button>
            </div>
            */}

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesion'}
            </button>

            {/*
            {/* Divider 
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-green-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-green-600">Or continue with</span>
              </div>
            </div>

            
            {/* Social Login Buttons 
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-green-200 rounded-lg bg-white text-green-700 hover:bg-green-50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-green-200 rounded-lg bg-white text-green-700 hover:bg-green-50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
            */}
          </form>

          {/*
          {/* Sign Up Link 
          <div className="mt-6 text-center">
            <p className="text-sm text-green-700">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-green-600 hover:text-green-700 font-medium hover:underline transition-colors"
              >
                Sign up for free
              </a>
            </p>
          </div>
          */}

        </div>
        
        {/* Footer 
        <div className="mt-8 text-center">
          <p className="text-xs text-green-600">
            By signing in, you agree to our{" "}
            <a href="/terms" className="hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
        */}
      </div>
    </div>
  )
}