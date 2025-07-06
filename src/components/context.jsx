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
    const [lastRefreshTime, setLastRefreshTime] = useState(0); // Para evitar múltiples refreshes

    // Función para refrescar el access token
    const refreshAccessToken = useCallback(async () => {
        const now = Date.now();
        
        // Evitar múltiples refresh en un período corto (30 segundos)
        if (isRefreshing || !refreshToken || (now - lastRefreshTime) < 30000) {
            console.log('Refresh ya en progreso, sin refreshToken, o muy reciente');
            return null;
        }
        
        setIsRefreshing(true);
        setLastRefreshTime(now);
        
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
                const newRefreshToken = data.refreshToken; // Si la API rota también el refresh token, lo cual es asi!
                
                setAccessToken(newAccessToken);
                sessionStorage.setItem('accessToken', newAccessToken);
                
                if (newRefreshToken) {
                    setRefreshToken(newRefreshToken);
                    localStorage.setItem('refreshToken', newRefreshToken);
                }

                console.log('Token refreshed successfully');
                return newAccessToken;
            } else {
                const data = await response.json()
                // Refresh token inválido o expirado
                console.log("Refresh token inválido, error: ", data.msg, "\n cerrando sesión...");
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
    }, [refreshToken, lastRefreshTime]); // Añadimos lastRefreshTime

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
        if (!accessToken) return;

        const checkTokenExpiration = async () => {
            // Evitar múltiples ejecuciones simultáneas
            if (isRefreshing) {
                console.log('Ya hay un refresh en progreso, saltando verificación...');
                return;
            }

            console.log('Verificando expiración del access token...');
            try {
                const decoded = jwtDecode(accessToken);
                const currentTime = Date.now() / 1000;
                const timeUntilExpiry = decoded.exp - currentTime;
                console.log('Tiempo restante para expiración del access token:', Math.round(timeUntilExpiry / 60), ' minutos');
                
                // Si el token expira en menos de 5 minutos (300 segundos), intentar refrescarlo
                if (timeUntilExpiry < 300 && timeUntilExpiry > 0) {
                    console.log('Access token próximo a expirar, refrescando...');
                    await refreshAccessToken();
                }
                // Si ya expiró, intentar refrescarlo inmediatamente
                else if (timeUntilExpiry <= 0) {
                    console.log('Access token expirado, refrescando...');
                    await refreshAccessToken();
                }
            } catch (error) {
                console.error('Error verificando access token:', error);
                // Si hay error decodificando, intentar refrescar
                await refreshAccessToken();
            }
        };

        // Verificar inmediatamente
        checkTokenExpiration();
        
        // Verificar cada 5 minutos (menos agresivo)
        const interval = setInterval(checkTokenExpiration, 300000);
        
        return () => clearInterval(interval);
    }, [accessToken, refreshAccessToken, isRefreshing]);

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
        isRefreshing,
        lastRefreshTime
    };

    return (
        <Provider value={ctx}>
            {props.children}
        </Provider>
    )
}
export default CustomProvider