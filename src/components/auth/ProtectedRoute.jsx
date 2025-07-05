import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const ProtectedRoute = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, hasAnyRole, logout } = useAuth()
  const [isValidating, setIsValidating] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const location = useLocation()

  useEffect(() => {
    validateAccess()
  }, [])

  const validateAccess = () => {
    try {
      // 1. Verificar si está autenticado
      if (!isAuthenticated()) {
        setIsValid(false)
        setIsValidating(false)
        return
      }

      // 2. Verificar roles si se requieren
      if (requiredRoles.length > 0) {
        if (!hasAnyRole(requiredRoles)) {
          console.log('Rol insuficiente')
          setIsValid(false)
          setIsValidating(false)
          return
        }
      }

      // 3. Acceso válido
      setIsValid(true)
      setIsValidating(false)

    } catch (error) {
      console.error('Error validando acceso: ', error)
      logout()
      setIsValid(false)
      setIsValidating(false)
    }
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
