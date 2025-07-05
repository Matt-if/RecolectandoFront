import { createContext, useState, useEffect, useCallback } from "react"
import { jwtDecode } from "jwt-decode"

export const context = createContext()
const Provider = context.Provider

const CustomProvider = (props) => {

    const [rol, setRol] = useState(() => localStorage.getItem("userRol") || null);
    const [id, setId] = useState(() => localStorage.getItem("userId") || null);
    const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem("accessToken") || null);
    const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refreshToken") || null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Función para refrescar el access token
    const refreshAccessToken = useCallback(async () => {
        if (isRefreshing || !refreshToken) return null;
        
        setIsRefreshing(true);
        try {
            const response = await fetch(import.meta.env.VITE_REFRESH_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken })
            });

            if (response.ok) {
                const data = await response.json();
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken; // Si la API rota también el refresh token
                
                setAccessToken(newAccessToken);
                sessionStorage.setItem('accessToken', newAccessToken);
                
                if (newRefreshToken) {
                    setRefreshToken(newRefreshToken);
                    localStorage.setItem('refreshToken', newRefreshToken);
                }
                
                console.log('Token refreshed successfully');
                return newAccessToken;
            } else {
                // Refresh token inválido o expirado
                console.log('Refresh token inválido, cerrando sesión...');
                logout();
                return null;
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            logout();
            return null;
        } finally {
            setIsRefreshing(false);
        }
    }, [refreshToken, isRefreshing]);

    // Función para limpiar sesión
    const logout = useCallback(() => {
        setAccessToken(null);
        setRefreshToken(null);
        setId(null);
        setRol(null);
        sessionStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRol");
    }, []);

    // Verificar expiración del access token automáticamente
    useEffect(() => {
        const checkTokenExpiration = async () => {
            if (accessToken) {
                try {
                    const decoded = jwtDecode(accessToken);
                    const currentTime = Date.now() / 1000;
                    const timeUntilExpiry = decoded.exp - currentTime;
                    
                    // Si el token expira en menos de 5 minutos, intentar refrescarlo
                    if (timeUntilExpiry < 300) { // 5 minutos
                        console.log('Access token próximo a expirar, refrescando...');
                        await refreshAccessToken();
                    }
                    // Si ya expiró, intentar refrescarlo inmediatamente
                    else if (timeUntilExpiry < 0) {
                        console.log('Access token expirado, refrescando...');
                        await refreshAccessToken();
                    }
                } catch (error) {
                    console.error('Error verificando access token:', error);
                    // Si hay error decodificando, intentar refrescar
                    await refreshAccessToken();
                }
            }
        };

        // Verificar inmediatamente
        checkTokenExpiration();
        
        // Verificar cada 2 minutos (más frecuente para access tokens de corta duración)
        const interval = setInterval(checkTokenExpiration, 120000);
        
        return () => clearInterval(interval);
    }, [accessToken, refreshAccessToken]);

    const ctx = {
        rol,
        setRol,
        id, 
        setId,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        refreshAccessToken,
        logout,
        isRefreshing
    };

    return (
        <Provider value={ctx}>
            {props.children}
        </Provider>
    )
}
export default CustomProvider