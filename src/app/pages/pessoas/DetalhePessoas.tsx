import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FerramentasDetalhe } from "../../shared/components";
import { LayoutBasePaginas } from "../../shared/layout";
import { PessoasService } from "../../shared/services";


export const DetalhePessoas = () => {

    const { id } = useParams<'id'>();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    useEffect(() => {

        if (id !== undefined) {
            setIsLoading(true);
            PessoasService.getById(Number(id))
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/pessoas');
                    } else {
                        console.log(result);
                        setNome(result.nomeCompleto);
                    }
                    setIsLoading(false);
                })
        }
    }, [])

    const handleSave = () => {
        console.log('Save')
    }

    const handleDelete = () => {
        if(window.confirm('Deseja excluir realmente?')){
            PessoasService.deleteById(Number(id))
                .then(result => {
                    if(result instanceof Error){
                        alert(result.message)
                        // navigate('/pessoas')
                    } else {
                        alert('Registro apagado com sucesso!')
                        navigate('/pessoas')
                    }
                })
        }
    }

    const handleSaveAndBack = () => {
        console.log('Salvar e voltar');
    }

    return (
        <LayoutBasePaginas
            titulo={id !== undefined ? `Atualizar ${nome}` : 'Nova pessoa'}
            barraFerramentas={
                <FerramentasDetalhe
                    btnNovoTexto="Nova"
                    isVisibleBtnSalvaVoltar
                    isVisibleBtnNovo={id !== undefined}
                    isVisibleBtnApagar={id !== undefined}

                    clickSalvar={handleSave}
                    clickApagar={handleDelete}
                    clickSalvarVoltar={handleSaveAndBack}
                    clickVoltar={() => navigate('/pessoas')}
                    clickNovo={() => navigate('/pessoas/detalhe')}
                />}>

            {isLoading && (
                <LinearProgress variant="indeterminate" />
            )}

        </LayoutBasePaginas>
    )
}