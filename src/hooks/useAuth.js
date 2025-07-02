import { useContext, useCallback } from 'react'
import { context } from '../components/context'
import { jwtDecode } from 'jwt-decode'

export const useAuth = () => {
  const { token, id, rol, setToken, setId, setRol } = useContext(context)

  // Verificar si el usuario está logueado
  const isAuthenticated = useCallback(() => {
    if (!token) return false
    
    try {
      const decoded = jwtDecode(token)
      const currentTime = Date.now() / 1000
      return decoded.exp > currentTime
    } catch {
      return false
    }
  }, [token])

  // Verificar si el usuario tiene un rol específico
  const hasRole = useCallback((requiredRole) => {
    if (!isAuthenticated()) return false
    
    try {
      const decoded = jwtDecode(token)
      const userRole = decoded.rol || decoded.role
      return userRole === requiredRole
    } catch {
      return false
    }
  }, [token, isAuthenticated])

  // Verificar si el usuario tiene alguno de los roles requeridos
  const hasAnyRole = useCallback((requiredRoles = []) => {
    if (!isAuthenticated()) return false
    
    try {
      const decoded = jwtDecode(token)
      const userRole = decoded.rol || decoded.role
      return requiredRoles.includes(userRole)
    } catch {
      return false
    }
  }, [token, isAuthenticated])

  // Obtener información del usuario actual
  const getCurrentUser = useCallback(() => {
    if (!isAuthenticated()) return null
    
    try {
      const decoded = jwtDecode(token)
      return {
        id: decoded.id,
        role: decoded.rol || decoded.role,
        email: decoded.sub || decoded.email,
        exp: decoded.exp
      }
    } catch {
      return null
    }
  }, [token, isAuthenticated])

  // Cerrar sesión
  const logout = useCallback(() => {
    setToken(null)
    setId(null)
    setRol(null)
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userRol')
  }, [setToken, setId, setRol])

  // Verificar si el token está próximo a expirar (últimos 5 minutos)
  const isTokenExpiringSoon = useCallback(() => {
    if (!token) return false
    
    try {
      const decoded = jwtDecode(token)
      const currentTime = Date.now() / 1000
      const timeUntilExpiry = decoded.exp - currentTime
      return timeUntilExpiry < 300 // 5 minutos
    } catch {
      return false
    }
  }, [token])

  return {
    token,
    id,
    rol,
    isAuthenticated,
    hasRole,
    hasAnyRole,
    getCurrentUser,
    logout,
    isTokenExpiringSoon
  }
}
