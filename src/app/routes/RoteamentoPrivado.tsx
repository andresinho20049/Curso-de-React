import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Dashboard, Lista } from "../pages"


export const RoteamentoPrivado = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/lista" element={<Lista />} />

                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    )
}