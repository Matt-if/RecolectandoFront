import { useContext, useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { context } from '../context'
import { jwtDecode } from 'jwt-decode'

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { token, setToken, setId, setRol } = useContext(context)
  const [isValidating, setIsValidating] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const location = useLocation()

  useEffect(() => {
    validateToken()
  }, [token])

  const validateToken = () => {
    try {
      // 1. Verificar si existe token
      if (!token) {
        setIsValid(false)
        setIsValidating(false)
        return
      }

      // 2. Decodificar y verificar expiración
      const decoded = jwtDecode(token)
      const currentTime = Date.now() / 1000

      // 3. Si el token expiró, limpiar todo
      if (decoded.exp < currentTime) {
        console.log('Token expirado')
        clearAuth()
        setIsValid(false)
        setIsValidating(false)
        return
      }

      // 4. Verificar roles si se requieren
      if (requiredRoles.length > 0) {
        const userRole = decoded.rol || decoded.role
        if (!requiredRoles.includes(userRole)) {
          console.log('Rol insuficiente')
          setIsValid(false)
          setIsValidating(false)
          return
        }
      }

      // 5. Token válido
      setIsValid(true)
      setIsValidating(false)

    } catch (error) {
      console.error('Error validando token: ', error)
      clearAuth()
      setIsValid(false)
      setIsValidating(false)
    }
  }

  const clearAuth = () => {
    setToken(null)
    setId(null)
    setRol(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userRol')
  }

  // Mostrar loading mientras valida
  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  // Si no es válido, redirigir a login
  if (!isValid) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Si es válido, mostrar el componente
  return children
}

export default ProtectedRoute
