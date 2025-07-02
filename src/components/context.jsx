import { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

export const context = createContext()
const Provider = context.Provider

const CustomProvider = (props) => {

    const [rol, setRol] = useState(() => localStorage.getItem("userRol") || null);
    const [id, setId] = useState(() => localStorage.getItem("userId") || null);
    const [token, setToken] = useState(() => localStorage.getItem("authToken") || null);

    // Verificar expiración del token automáticamente
    useEffect(() => {
        const checkTokenExpiration = () => {
            if (token) {
                try {
                    const decoded = jwtDecode(token)
                    const currentTime = Date.now() / 1000
                    
                    if (decoded.exp < currentTime) {
                        console.log('Token expirado, limpiando sesión...')
                        // Limpiar todo si el token expiró
                        setToken(null)
                        setId(null)
                        setRol(null)
                        localStorage.removeItem("authToken")
                        localStorage.removeItem("userId")
                        localStorage.removeItem("userRol")
                    }
                } catch (error) {
                    console.error('Error verificando token:', error)
                    // Si hay error decodificando, limpiar
                    setToken(null)
                    setId(null)
                    setRol(null)
                    localStorage.removeItem("authToken")
                    localStorage.removeItem("userId")
                    localStorage.removeItem("userRol")
                }
            }
        }

        // Verificar inmediatamente
        checkTokenExpiration()
        
        // Verificar cada minuto
        const interval = setInterval(checkTokenExpiration, 60000)
        
        return () => clearInterval(interval)
    }, [token])

    const ctx = {
  
        rol : rol,
        setRol: setRol,
        id : id, 
        setId : setId,
        token : token,
        setToken : setToken
  
    }

    return (
        <Provider value={ctx}>
            {props.children}
        </Provider>
    )
}
export default CustomProvider