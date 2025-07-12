# Sistema de Autenticación con JWT y RefreshToken

Este proyecto implementa un sistema de autenticación robusto usando JWT (accessToken y refreshToken) para mayor seguridad.

## Arquitectura del Sistema

### 1. Tokens
- **AccessToken**: Token de corta duración (15-30 min) almacenado en `sessionStorage`
- **RefreshToken**: Token de larga duración (7-30 días) almacenado en `localStorage`

### 2. Componentes Principales

#### Context (`src/components/context.jsx`)
- Maneja el estado global de autenticación
- Almacena tokens y datos del usuario
- Implementa renovación automática de tokens
- Limpia la sesión cuando los tokens expiran

#### Hook useAuth (`src/hooks/useAuth.js`)
- Proporciona una API limpia para manejar autenticación
- Incluye `authenticatedFetch` para peticiones automáticas con renovación
- Funciones de verificación de roles y permisos
- Manejo de estados de autenticación

#### ProtectedRoute (`src/components/auth/ProtectedRoute.jsx`)
- Protege rutas basado en autenticación y roles
- Redirige a login si no hay acceso
- Muestra loader mientras valida permisos

#### ConditionalRender (`src/components/auth/ConditionalRender.jsx`)
- Componentes para mostrar UI condicional basada en autenticación
- `AuthenticatedOnly`, `UnauthenticatedOnly`, `RoleBasedAccess`

## Flujo de Autenticación

### Login
1. Usuario ingresa credenciales
2. API devuelve `accessToken` y `refreshToken`
3. Tokens se almacenan en contexto y storage
4. Usuario se redirige a área protegida

### Renovación Automática
1. Sistema verifica expiración cada `Token expiration` - 2 minutos
2. Si accessToken expira pronto (< 5 min), se renueva automáticamente
3. Si refreshToken es inválido, se limpia la sesión

### Peticiones API
```javascript
// Usar authenticatedFetch en lugar de fetch
const { authenticatedFetch } = useAuth()

const response = await authenticatedFetch('/api/data', {
  method: 'POST',
  body: JSON.stringify(data)
})
```

## Estructura de Archivos

```
src/
├── components/
│   ├── context.jsx              # Context global
│   ├── auth/
│   │   ├── ProtectedRoute.jsx   # Protección de rutas
│   │   └── ConditionalRender.jsx # Renderizado condicional
│   └── pages/
│       ├── login.jsx            # Página de login
│       ├── recoForm.jsx         # Formulario protegido
│       └── userProfile.jsx      # Perfil de usuario
├── hooks/
│   └── useAuth.js              # Hook de autenticación
└── ...
```

## Variables de Entorno

``` env
VITE_API_URL="http://localhost:8080/api/v1"
VITE_LOGIN_URL="http://localhost:8080/api/v1/auth/login"
VITE_REFRESH_URL="http://localhost:8080/api/v1/auth/refresh"
VITE_TOKEN_REFRESH_MARGIN=300
```

## Uso en Componentes

### Verificar Autenticación
```jsx
import { useAuth } from '../hooks/useAuth'

const MyComponent = () => {
  const { isAuthenticated, hasRole } = useAuth()
  
  if (!isAuthenticated()) {
    return <div>No autenticado</div>
  }
  
  return <div>Contenido protegido</div>
}
```

### Proteger Rutas
```jsx
<Route 
  path="/admin" 
  element={
    <ProtectedRoute requiredRoles={['ADMIN']}>
      <AdminPanel />
    </ProtectedRoute>
  } 
/>
```

### Renderizado Condicional
```jsx
<AuthenticatedOnly>
  <UserMenu />
</AuthenticatedOnly>

<RoleBasedAccess requiredRoles={['ADMIN', 'EDITOR']}>
  <AdminButton />
</RoleBasedAccess>
```

## Consideraciones de Seguridad

1. **Separación de Almacenamiento**: AccessToken en sessionStorage, RefreshToken en localStorage
2. **Renovación Automática**: Tokens se renuevan antes de expirar
3. **Limpieza de Sesión**: Tokens inválidos se eliminan automáticamente
4. **Interceptores HTTP**: `authenticatedFetch` maneja automáticamente la renovación
5. **Validación de Roles**: Verificación en frontend y backend

## Personalización

Para adaptar el sistema a tu API:

1. Actualiza las URLs en `.env`
2. Modifica la estructura de tokens en `context.jsx`
3. Ajusta la lógica de roles en `useAuth.js`
4. Personaliza los componentes de UI según necesites

## Notas Importantes

- El sistema asume que la API devuelve `accessToken` y `refreshToken`
- Los tokens deben ser JWT válidos con claim `exp` (expiration time)
- La renovación se hace automáticamente en peticiones API
- El sistema limpia automáticamente tokens expirados
