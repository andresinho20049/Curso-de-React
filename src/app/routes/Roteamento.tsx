import React from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../pages"


interface IRoteamentoMyProps {
    defaultPage: string
    children: React.ReactNode
}

export const Roteamento = ({defaultPage, children} : IRoteamentoMyProps) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                {children}
                
                <Route path="*" element={<Navigate to={defaultPage} />} />
            </Routes>
        </BrowserRouter>
    )
}