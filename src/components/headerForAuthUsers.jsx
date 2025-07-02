import { useAuth } from '../hooks/useAuth'
import { AuthenticatedOnly, RoleBasedAccess } from './auth/ConditionalRender'

export default function HeaderForAuthUsers() {
    const { logout, getCurrentUser } = useAuth()
    const user = getCurrentUser()
    
    return (
    
    <header className="px-4 lg:px-6 h-16 flex items-center border-b border-green-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <a href="/" className="flex items-center justify-center">
          {/* <Leaf className="h-8 w-8 text-green-600" /> */}
          <span className="ml-2 text-xl font-bold text-green-800"> Bienvenido, {user?.email}</span>
        </a>

        <nav className="ml-auto flex gap-4 sm:gap-6">
            
            <RoleBasedAccess requiredRoles={['ADMIN']}>
            <a href="/register" className="text-sm font-medium text-green-700 hover:text-green-600 transition-colors">
                Registrar un nuevo usuario
            </a>
            </RoleBasedAccess>

            <a href="/recolectionForm" className="text-sm font-medium text-green-700 hover:text-green-600 transition-colors">
                Subir una Recoleccion
            </a>

            <a href="/" onClick={logout} className="text-sm font-medium text-green-700 hover:text-green-600 transition-colors">
                Cerrar Sesion
            </a>
        </nav>
      </header> );
}