import { useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Dashboard, DetalhePessoas, ListagemCidades, ListagemPessoas } from "../pages"
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
                label: 'Pessoas',
                icon: 'people',
                path: '/pessoas'
            },
            {
                label: 'Cidades',
                icon: 'location_city',
                path: '/cidades'
            }
        ])
    }, [])

    return (
        <BrowserRouter>
            <MenuLateral>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/pessoas" element={<ListagemPessoas />} />
                    <Route path="/cidades" element={<ListagemCidades />} />
                    <Route path="/pessoas/detalhe" element={<DetalhePessoas />} />
                    <Route path="/pessoas/detalhe/:id" element={<DetalhePessoas />} />

                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </MenuLateral>
        </BrowserRouter>
    )
}