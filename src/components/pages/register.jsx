import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { Leaf, Mail, Lock, Eye, EyeOff, User, UserPlus, Save, ArrowLeft, AlertCircle, CheckCircle } from "lucide-react"

export default function Register() {
  const navigate = useNavigate()
  const { authenticatedFetch } = useAuth()

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
  })

  // UI state
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
    // Clear API error when user makes changes
    if (apiError) {
      setApiError("")
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }

  const validateForm = () => {
    const newErrors = {}

    // Email validation
    if (!formData.email) {
      newErrors.email = "El email es requerido"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Ingrese un email válido"
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número"
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Debe confirmar la contraseña"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setApiError("")

    try {
      // Here you would submit to your backend
      const userData = {
        username: formData.email,
        password: formData.password,
        firstname: formData.firstname || null,
        lastname: formData.lastname || null,
      }

      const response = await authenticatedFetch(import.meta.env.VITE_API_URL + "/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })

      if (response.ok) {
        setSuccess(true)
        // Reset form
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          firstname: "",
          lastname: "",
        })
        alert("Usuario registrado correctamente")
        setTimeout(() => {
          setSuccess(false)
        }, 3000)
      } else {
        const errorData = await response.json()
        setApiError(errorData.message || "Error al registrar el usuario")
      }
    } catch (error) {
      setApiError("Error de conexión. Intente nuevamente.")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstname: "",
      lastname: "",
    })
    setErrors({})
    setApiError("")
    setSuccess(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-xl opacity-20"></div>
              <div className="relative bg-white rounded-full p-3 shadow-lg">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-green-900 mb-2">Registrar Usuario</h1>
          <p className="text-green-700">Panel de administración - Crear nueva cuenta de usuario</p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-green-700">Usuario registrado exitosamente</span>
          </div>
        )}

        {/* API Error Alert */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700">{apiError}</span>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-green-800 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email *
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg bg-green-50/50 text-green-900 placeholder-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all ${
                  errors.email ? "border-red-300 focus:border-red-500" : "border-green-200 focus:border-green-500"
                }`}
                placeholder="usuario@ejemplo.com"
                required
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-green-800 flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Contraseña *
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg bg-green-50/50 text-green-900 placeholder-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all ${
                    errors.password ? "border-red-300 focus:border-red-500" : "border-green-200 focus:border-green-500"
                  }`}
                  placeholder="Mínimo 8 caracteres"
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
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              <p className="text-xs text-green-600">
                La contraseña debe contener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-green-800 flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Confirmar Contraseña *
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg bg-green-50/50 text-green-900 placeholder-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all ${
                    errors.confirmPassword
                      ? "border-red-300 focus:border-red-500"
                      : "border-green-200 focus:border-green-500"
                  }`}
                  placeholder="Repita la contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-500 hover:text-green-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstname" className="text-sm font-medium text-green-800 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Nombre
                </label>
                <input
                  id="firstname"
                  type="text"
                  value={formData.firstname}
                  onChange={(e) => handleInputChange("firstname", e.target.value)}
                  className="w-full px-4 py-3 border border-green-200 rounded-lg bg-green-50/50 text-green-900 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                  placeholder="Nombre (opcional)"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastname" className="text-sm font-medium text-green-800 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Apellido
                </label>
                <input
                  id="lastname"
                  type="text"
                  value={formData.lastname}
                  onChange={(e) => handleInputChange("lastname", e.target.value)}
                  className="w-full px-4 py-3 border border-green-200 rounded-lg bg-green-50/50 text-green-900 placeholder-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
                  placeholder="Apellido (opcional)"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Registrando...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5 mr-2" />
                    Registrar Usuario
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center px-6 py-3 border border-green-600 text-green-600 bg-transparent rounded-lg font-medium hover:bg-green-50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
              >
                <Save className="h-5 w-5 mr-2" />
                Limpiar
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center px-6 py-3 border border-green-600 text-green-600 bg-transparent rounded-lg font-medium hover:bg-green-50 focus:ring-2 focus:ring-green-500/20 focus:outline-none transition-all"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Volver
              </button>
            </div>
          </form>
        </div>

        {/* Admin Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">Nota para Administradores</h3>
              <p className="text-sm text-blue-700 mt-1">
                Esta página es solo para uso administrativo. Los usuarios registrados aquí tendrán acceso al sistema con
                las credenciales proporcionadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
