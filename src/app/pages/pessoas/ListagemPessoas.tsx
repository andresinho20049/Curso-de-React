import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom"
import { FerramentasListagem } from "../../shared/components"
import { useDobounce } from "../../shared/hooks";
import { LayoutBasePaginas } from "../../shared/layout"
import { PessoasService } from "../../shared/services";


export const ListagemPessoas = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDobounce(3000);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);


    useEffect(() => {
        debounce(() => {
            PessoasService.getAll(1, 10, busca)
                .then((result) => {
                    if (result instanceof Error) {
                        console.log(result.message);
                        return;
                    }

                    console.log(result.data)
                })
        })
    }, [busca])


    return (
        <LayoutBasePaginas
            titulo="Listagem de Pessoas"
            barraFerramentas={
                <FerramentasListagem
                    inputBuscaVisible
                    buttonVisible
                    textoBusca={busca}
                    onChangeInput={value => setSearchParams({ busca: value }, { replace: true })}
                />
            }>

        </LayoutBasePaginas>

    )
}