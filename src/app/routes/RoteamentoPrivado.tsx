import { useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Dashboard, Lista } from "../pages"
import { Dashboard2 } from "../pages/dashboard/Dashboard2"
import { MenuLateral } from "../shared/components"
import { AppDrawerProvider, useAppDrawerContext } from "../shared/context"


export const RoteamentoPrivado = () => {

    const { setDrawerOption } = useAppDrawerContext();

    useEffect(() => {
        setDrawerOption([
            {
                label: 'Pagina Inicial',
                icon: 'home',
                path: '/dashboard'
            },
            {
                label: 'Dashboard Det',
                icon: 'Assessment',
                path: '/dashboard2'
            },
            {
                label: 'Lista',
                icon: 'edit',
                path: '/lista'
            }
        ])
    }, [])

    return (
        <BrowserRouter>
            <MenuLateral>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard2" element={<Dashboard2 />} />
                    <Route path="/lista" element={<Lista />} />

                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </MenuLateral>
        </BrowserRouter>
    )
}