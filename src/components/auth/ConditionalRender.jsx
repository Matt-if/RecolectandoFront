import { useAuth } from '../../hooks/useAuth'

// Componente para mostrar contenido solo si está autenticado
export const AuthenticatedOnly = ({ children, fallback = null }) => {
  const { isAuthenticated } = useAuth()
  
  return isAuthenticated() ? children : fallback
}

// Componente para mostrar contenido solo si NO está autenticado
export const UnauthenticatedOnly = ({ children, fallback = null }) => {
  const { isAuthenticated } = useAuth()
  
  return !isAuthenticated() ? children : fallback
}

// Componente para mostrar contenido basado en roles
export const RoleBasedAccess = ({ 
  requiredRoles = [], 
  children, 
  fallback = null,
  requireAll = false // Si true, requiere TODOS los roles, si false, requiere AL MENOS UNO
}) => {
  const { hasAnyRole, hasRole } = useAuth()
  
  let hasAccess = false
  
  if (requireAll) {
    // Verificar que tenga TODOS los roles
    hasAccess = requiredRoles.every(role => hasRole(role))
  } else {
    // Verificar que tenga AL MENOS UNO de los roles
    hasAccess = hasAnyRole(requiredRoles)
  }
  
  return hasAccess ? children : fallback
}

// Componente para mostrar contenido específico por rol
export const RoleSpecificContent = ({ role, children, fallback = null }) => {
  const { hasRole } = useAuth()
  
  return hasRole(role) ? children : fallback
}
