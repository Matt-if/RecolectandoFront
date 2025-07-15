import { createContext, useState, useEffect, useCallback, useRef } from "react"
import { jwtDecode } from "jwt-decode"

export const context = createContext()
const Provider = context.Provider

const CustomProvider = (props) => {
    const [rol, setRol] = useState(() => localStorage.getItem("userRol") || null);
    const [id, setId] = useState(() => localStorage.getItem("userId") || null);
    const [accessToken, setAccessToken] = useState(() => sessionStorage.getItem("accessToken") || null);
    const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem("refreshToken") || null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    // Referencia para el intervalo - NO se resetea con re-renders
    const intervalRef = useRef(null);

    // Función para limpiar sesión
    const logout = useCallback(async () => { // ← Agregar async
        // Hacer logout en el backend ANTES de limpiar el storage local
        console.log('🔒 Usuario desautenticado, haciendo POST a /logout');
        
        try {
            const response = await fetch(import.meta.env.VITE_LOGOUT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${refreshToken}`
                }
            });
            
            if (response.ok) {
                console.log('✅ Logout exitoso');
            } else {
                console.error('❌ Error al hacer logout:', response.status);
            }
        } catch (error) {
            console.error('❌ Error en request de logout:', error);
        }

        // Limpiar storage DESPUÉS de hacer el request
        setAccessToken(null);
        setRefreshToken(null);
        setId(null);
        setRol(null);
        sessionStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRol");

        // Limpiar el intervalo cuando se hace logout
        if (intervalRef.current) {
            console.log('🧹 Limpiando intervalo por logout...');
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        
        // Forzar navegación a la página principal
        window.location.href = '/'; // ← Esto fuerza un reload completo
    }, [refreshToken]);

    // Función para refrescar el access token
    const refreshAccessToken = useCallback(async () => {
        // Obtener valores actuales del storage
        const currentRefreshToken = localStorage.getItem('refreshToken');
        
        if (isRefreshing || !currentRefreshToken) {
            console.log('Refresh ya en progreso o sin refreshToken');
            return null;
        }
        
        setIsRefreshing(true);
        
        try {
            console.log('Iniciando refresh del token...');
            const response = await fetch(import.meta.env.VITE_REFRESH_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentRefreshToken}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const newAccessToken = data.accessToken;
                const newRefreshToken = data.refreshToken;
                
                setAccessToken(newAccessToken);
                sessionStorage.setItem('accessToken', newAccessToken);
                
                if (newRefreshToken) {
                    setRefreshToken(newRefreshToken);
                    localStorage.setItem('refreshToken', newRefreshToken);
                }

                console.log('✅ Token refreshed successfully');
                
                // IMPORTANTE: Reiniciar el intervalo después del refresh
                startTokenExpirationTimer();

                return newAccessToken;
            } else {
                const data = await response.json()
                console.log("❌ Refresh token inválido, error: ", data.msg, "\n cerrando sesión...");
                logout();
                return null;
            }
        } catch (error) {
            console.error('❌ Error refreshing token:', error);
            logout();
            return null;
        } finally {
            setIsRefreshing(false);
        }
    }, [logout, isRefreshing]);

    // Función para iniciar el timer de expiración
    const startTokenExpirationTimer = useCallback(() => {
        // Limpiar intervalo anterior si existe
        if (intervalRef.current) {
            console.log('🧹 Limpiando intervalo anterior...');
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        const currentToken = sessionStorage.getItem('accessToken');
        if (!currentToken) {
            console.log('❌ No hay access token para iniciar timer');
            return;
        }

        try {
            const decoded = jwtDecode(currentToken);
            const currentTime = Date.now() / 1000;
            const timeUntilExpiry = decoded.exp - currentTime;
            
            console.log('⏰ Access token expira en:', Math.round(timeUntilExpiry / 60), 'minutos');
            
            // Si ya expiró, refrescar inmediatamente
            if (timeUntilExpiry <= 0) {
                console.log('⚠️ Token ya expirado, refrescando...');
                refreshAccessToken();
                return;
            }
            
            // Programar refresh 2 minutos antes de que expire
            const refreshTime = Math.max((timeUntilExpiry - 120) * 1000, 5000); // Mínimo 5 segundos
            
            console.log('⚙️ Programando refresh en:', Math.round(refreshTime / 1000 / 60), 'minutos');
            
            intervalRef.current = setTimeout(() => {
                console.log('🔄 Ejecutando refresh programado...');
                refreshAccessToken();
            }, refreshTime);
            
        } catch (error) {
            console.error('❌ Error al programar refresh:', error);
            refreshAccessToken();
        }
    }, [refreshAccessToken]);

    // Solo ejecutar cuando el usuario inicie sesión (accessToken cambia de null a valor)
    useEffect(() => {
        if (accessToken && !intervalRef.current) {
            console.log('🚀 Usuario autenticado, iniciando timer de expiración...');
            startTokenExpirationTimer();
        } else if (!accessToken && intervalRef.current) {
            console.log('🧹 Usuario desautenticado, limpiando timer...');
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }, [accessToken, startTokenExpirationTimer]);

    // Cleanup al desmontar el componente
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                console.log('🧹 Limpiando intervalo al desmontar componente...');
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, []);

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