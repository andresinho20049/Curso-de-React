import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../pages"


export const Roteamento = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    )
}