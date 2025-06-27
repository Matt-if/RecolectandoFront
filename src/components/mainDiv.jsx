import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import ErrorPage from "./pages/errorPage";
import RecoForm from "./pages/recoForm";
import Register from "./pages/register";

export default function MainDiv(){
    return (
        <div>
            <Routes>
                <Route path="/" element={<Landing/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/recolectionForm" element={<RecoForm/>} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </div>
    );
}