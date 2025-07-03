import { Route, Routes } from "react-router-dom";
import ProtectedRoute from './auth/ProtectedRoute'
import Landing from "./pages/landing";
import Login from "./pages/login";
import ErrorPage from "./pages/errorPage";
import RecoForm from "./pages/recoForm";
import Register from "./pages/register";
import UserProfile from "./pages/userProfile";

export default function MainDiv(){
    return (
        <div>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Landing/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="*" element={<ErrorPage />} />

                {/* Rutas para usuarios autenticados - USER o ADMIN */}
                <Route path="/recolectionForm" element={<ProtectedRoute> <RecoForm/> </ProtectedRoute> }/>
                <Route path="/userProfile" element={<ProtectedRoute> <UserProfile /> </ProtectedRoute> }/>

                {/* Rutas para ADMIN */}
                <Route path="/register" element={ <ProtectedRoute requiredRoles={['ADMIN']}> <Register /> </ProtectedRoute>} />
            </Routes>
        </div>
    );
}