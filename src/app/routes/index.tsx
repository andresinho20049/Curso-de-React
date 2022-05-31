import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Dashboard, Login } from "../pages"
import { Lista } from "../pages/lista/Lista"

export const Rota = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/lista" element={<Lista />} />

                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    )
}