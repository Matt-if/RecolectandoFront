import { useContext, useCallback } from 'react'
import { context } from '../components/context'
import { jwtDecode } from 'jwt-decode'

export const useAuth = () => {
  const { 
    accessToken, 
    refreshToken, 
    id, 
    rol, 
    refreshAccessToken,
    logout,
    isRefreshing 
  } = useContext(context)

  // Verificar si el usuario está logueado
  const isAuthenticated = useCallback(() => {
    if (!accessToken || !refreshToken) return false
    
    try {
      const decoded = jwtDecode(accessToken)
      const currentTime = Date.now() / 1000
      
      // Si el access token no ha expirado, está autenticado
      if (decoded.exp > currentTime) return true
      
      // Si el access token expiró pero hay refresh token, aún puede estar autenticado
      return !!refreshToken
    } catch {
      return false
    }
  }, [accessToken, refreshToken])

  // Verificar si el usuario tiene un rol específico
  const hasRole = useCallback((requiredRole) => {
    if (!isAuthenticated()) return false
    
    try {
      const decoded = jwtDecode(accessToken)
      const userRole = decoded.rol || decoded.role
      return userRole === requiredRole
    } catch {
      return false
    }
  }, [accessToken, isAuthenticated])

  // Verificar si el usuario tiene alguno de los roles requeridos
  const hasAnyRole = useCallback((requiredRoles = []) => {
    if (!isAuthenticated()) return false
    
    try {
      const decoded = jwtDecode(accessToken)
      const userRole = decoded.rol || decoded.role
      return requiredRoles.includes(userRole)
    } catch {
      return false
    }
  }, [accessToken, isAuthenticated])

  // Obtener información del usuario actual
  const getCurrentUser = useCallback(() => {
    if (!isAuthenticated()) return null
    
    try {
      const decoded = jwtDecode(accessToken)
      return {
        id: decoded.id,
        role: decoded.rol || decoded.role,
        email: decoded.sub || decoded.email,
        exp: decoded.exp
      }
    } catch {
      return null
    }
  }, [accessToken, isAuthenticated])

  // Verificar si el access token está próximo a expirar (últimos 5 minutos)
  const isTokenExpiringSoon = useCallback(() => {
    if (!accessToken) return false
    
    try {
      const decoded = jwtDecode(accessToken)
      const currentTime = Date.now() / 1000
      const timeUntilExpiry = decoded.exp - currentTime
      return timeUntilExpiry < 300 // 5 minutos
    } catch {
      return false
    }
  }, [accessToken])

  // Función para realizar peticiones API con manejo automático de refresh
  const authenticatedFetch = useCallback(async (url, options = {}) => {
    let token = accessToken

    // Solo refrescar si realmente es necesario y no hay refresh en progreso
    if (!token && !isRefreshing) {
      console.log('No hay accessToken, intentando obtener uno nuevo...');
      token = await refreshAccessToken()
      if (!token) {
        throw new Error('No se pudo obtener un token válido')
      }
    }

    // Si ya hay un refresh en progreso, esperar un poco
    if (isRefreshing) {
      console.log('Refresh en progreso, esperando...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      token = accessToken; // Usar el token actualizado
    }

    // Realizar la petición con el token
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    // Si recibimos 401 y NO hay refresh en progreso, intentar refrescar una vez
    if (response.status === 401 && !isRefreshing) {
      console.log('Recibido 401, intentando refrescar token...');
      const newToken = await refreshAccessToken()
      if (newToken) {
        // Reintentar la petición con el nuevo token
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'Authorization': `Bearer ${newToken}`,
            'Content-Type': 'application/json'
          }
        })
      }
    }

    return response
  }, [accessToken, refreshAccessToken, isRefreshing])

  return {
    accessToken,
    refreshToken,
    id,
    rol,
    isAuthenticated,
    hasRole,
    hasAnyRole,
    getCurrentUser,
    logout,
    isTokenExpiringSoon,
    authenticatedFetch,
    isRefreshing
  }
}
