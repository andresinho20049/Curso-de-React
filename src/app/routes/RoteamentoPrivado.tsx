import { useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Dashboard, Dashboard2, Lista, ListagemCidades, ListagemPessoas } from "../pages"
import { MenuLateral } from "../shared/components"
import { useAppDrawerContext } from "../shared/context"


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
                icon: 'assessment',
                path: '/dashboard2'
            },
            {
                label: 'Pessoas',
                icon: 'people',
                path: '/pessoas'
            },
            {
                label: 'Cidades',
                icon: 'location_city',
                path: '/cidades'
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
                    <Route path="/pessoas" element={<ListagemPessoas />} />
                    <Route path="/cidades" element={<ListagemCidades />} />
                    {/* <Route path="/cidades/detalhe/:id" element={<Dashboard2 />} /> */}
                    <Route path="/lista" element={<Lista />} />

                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </MenuLateral>
        </BrowserRouter>
    )
}