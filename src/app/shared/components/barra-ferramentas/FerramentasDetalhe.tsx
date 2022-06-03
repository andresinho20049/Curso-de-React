import { Button, Divider, Icon, Skeleton } from "@mui/material"

interface IFerramentasDetalheProps {
    btnNovoTexto?:string;
    isVisibleBtnNovo?: boolean;
    isVisibleBtnApagar?: boolean;
    isVisibleBtnVoltar?: boolean;
    isVisibleBtnSalvar?: boolean;
    isVisibleBtnSalvaVoltar?: boolean;

    isLoading?: boolean;

    clickNovo?: () => void;
    clickApagar?: () => void;
    clickVoltar?: () => void;
    clickSalvar?: () => void;
    clickSalvarVoltar?: () => void;
}

export const FerramentasDetalhe = ({
    btnNovoTexto = "Novo",
    isVisibleBtnNovo = true,
    isVisibleBtnApagar = true,
    isVisibleBtnVoltar = true,
    isVisibleBtnSalvar = true,
    isVisibleBtnSalvaVoltar = false,

    isLoading = false,

    clickNovo,
    clickApagar,
    clickVoltar,
    clickSalvar,
    clickSalvarVoltar,

}:IFerramentasDetalheProps) => {
    return (
        <>
            {(isVisibleBtnSalvar && !isLoading) && (<Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={clickSalvar}
                startIcon={<Icon>save</Icon>}>

                Salvar

            </Button>)}
            {isLoading && (<Skeleton width={110} height={60}/>)}

            {(isVisibleBtnSalvaVoltar && !isLoading) && (<Button
                variant="outlined"
                color="primary"
                disableElevation
                onClick={clickSalvarVoltar}
                startIcon={<Icon>save</Icon>}>

                Salvar e Voltar

            </Button>)}
            {isLoading && (<Skeleton width={180} height={60}/>)}

            {(isVisibleBtnApagar && !isLoading) && (<Button
                variant="outlined"
                color="primary"
                disableElevation
                onClick={clickApagar}
                startIcon={<Icon>delete</Icon>}>

                Apagar

            </Button>)}
            {isLoading && (<Skeleton width={110} height={60}/>)}

            {(isVisibleBtnNovo && !isLoading) && (<Button
                variant="outlined"
                color="primary"
                disableElevation
                onClick={clickNovo}
                startIcon={<Icon>add</Icon>}>

                {btnNovoTexto}

            </Button>)}
            {isLoading && (<Skeleton width={110} height={60}/>)}

            <Divider variant="middle" orientation="vertical" />

            {(isVisibleBtnVoltar && !isLoading) && (<Button
                variant="outlined"
                color="primary"
                disableElevation
                onClick={clickVoltar}
                startIcon={<Icon>arrow_back</Icon>}>

                Voltar

            </Button>)}
            {isLoading && (<Skeleton width={110} height={60}/>)}
        </>
    )
}