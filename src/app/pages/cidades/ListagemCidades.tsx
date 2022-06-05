import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom"
import { FerramentasListagem } from "../../shared/components"
import { LayoutBasePaginas } from "../../shared/layout"


export const ListagemCidades = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);


    useEffect(() => {
        
    }, [])


    return (
        <LayoutBasePaginas
            titulo="Listagem de cidades"
            barraFerramentas={
                <FerramentasListagem
                    inputBuscaVisible
                    buttonVisible
                    textoButton='Nova'
                    textoBusca={busca}
                    onChangeInput={value => setSearchParams({busca: value}, {replace: true})}
                    />
            }>

        </LayoutBasePaginas>

    )
}