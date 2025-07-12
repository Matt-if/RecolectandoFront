# JWT Authentication System with RefreshToken

This project implements a robust authentication system using JWT (accessToken and refreshToken) for enhanced security.

## System Architecture

### 1. Tokens
- **AccessToken**: Short-lived token (15-30 min) stored in `sessionStorage`
- **RefreshToken**: Long-lived token (7-30 days) stored in `localStorage`

### 2. Main Components

#### Context (`src/components/context.jsx`)
- Manages global authentication state
- Stores tokens and user data
- Implements automatic token renewal
- Clears session when tokens expire

#### useAuth Hook (`src/hooks/useAuth.js`)
- Provides a clean API for handling authentication
- Includes `authenticatedFetch` for automatic requests with renewal
- Role and permission verification functions
- Authentication state management

#### ProtectedRoute (`src/components/auth/ProtectedRoute.jsx`)
- Protects routes based on authentication and roles
- Redirects to login if no access
- Shows loader while validating permissions

#### ConditionalRender (`src/components/auth/ConditionalRender.jsx`)
- Components for conditional UI rendering based on authentication
- `AuthenticatedOnly`, `UnauthenticatedOnly`, `RoleBasedAccess`

## Authentication Flow

### Login
1. User enters credentials
2. API returns `accessToken` and `refreshToken`
3. Tokens are stored in context and storage
4. User is redirected to protected area

### Automatic Renewal
1. System checks expiration every `Token expiration` - 2 minutes
2. If accessToken expires soon (< 5 min), it renews automatically
3. If refreshToken is invalid, session is cleared

### API Requests
```javascript
// Use authenticatedFetch instead of fetch
const { authenticatedFetch } = useAuth()

const response = await authenticatedFetch('/api/data', {
  method: 'POST',
  body: JSON.stringify(data)
})
```

## File Structure

```
src/
├── components/
│   ├── context.jsx              # Global context
│   ├── auth/
│   │   ├── ProtectedRoute.jsx   # Route protection
│   │   └── ConditionalRender.jsx # Conditional rendering
│   └── pages/
│       ├── login.jsx            # Login page
│       ├── recoForm.jsx         # Protected form
│       └── userProfile.jsx      # User profile
├── hooks/
│   └── useAuth.js              # Authentication hook
└── ...
```

## Environment Variables

``` env
VITE_API_URL="http://localhost:8080/api/v1"
VITE_LOGIN_URL="http://localhost:8080/api/v1/auth/login"
VITE_REFRESH_URL="http://localhost:8080/api/v1/auth/refresh"
VITE_TOKEN_REFRESH_MARGIN=300
```

## Usage in Components

### Check Authentication
```jsx
import { useAuth } from '../hooks/useAuth'

const MyComponent = () => {
  const { isAuthenticated, hasRole } = useAuth()
  
  if (!isAuthenticated()) {
    return <div>Not authenticated</div>
  }
  
  return <div>Protected content</div>
}
```

### Protect Routes
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

### Conditional Rendering
```jsx
<AuthenticatedOnly>
  <UserMenu />
</AuthenticatedOnly>

<RoleBasedAccess requiredRoles={['ADMIN', 'EDITOR']}>
  <AdminButton />
</RoleBasedAccess>
```

## Security Considerations

1. **Storage Separation**: AccessToken in sessionStorage, RefreshToken in localStorage
2. **Automatic Renewal**: Tokens are renewed before expiring
3. **Session Cleanup**: Invalid tokens are automatically removed
4. **HTTP Interceptors**: `authenticatedFetch` automatically handles renewal
5. **Role Validation**: Verification on both frontend and backend

## Customization

To adapt the system to your API:

1. Update URLs in `.env`
2. Modify token structure in `context.jsx`
3. Adjust role logic in `useAuth.js`
4. Customize UI components as needed

## Important Notes

- The system assumes the API returns `accessToken` and `refreshToken`
- Tokens must be valid JWTs with `exp` (expiration time) claim
- Renewal is done automatically in API requests
- The system automatically cleans expired tokens