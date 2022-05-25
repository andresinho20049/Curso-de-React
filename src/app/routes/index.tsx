import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Dashboard } from "../pages"

export const Rota = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/entrar" element={<Login/>} /> */}
                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    )
}