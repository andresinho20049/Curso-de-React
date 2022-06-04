import { Divider, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { ButtonApp } from "../button-app/ButtonApp";

interface IFerramentasDetalheProps {
    btnNovoTexto?: string;
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

}: IFerramentasDetalheProps) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            {(isVisibleBtnSalvar && !isLoading) &&
                (<ButtonApp
                    onClick={() => clickSalvar}
                    iconButton="save"
                    variant="contained"
                    label="Salvar" />
                )}

            {isLoading && (<Skeleton width={110} height={60} />)}

            {(isVisibleBtnSalvaVoltar && !isLoading && !smDown && !mdDown) &&
                (<ButtonApp
                    onClick={() => clickSalvarVoltar}
                    iconButton="save"
                    label="Salvar e Voltar" />
                )}

            {isLoading && !smDown && !mdDown && (<Skeleton width={180} height={60} />)}

            {(isVisibleBtnApagar && !isLoading) &&
                (<ButtonApp
                    onClick={() => clickSalvarVoltar}
                    iconButton="delete"
                    label="Apagar" />
                )}

            {isLoading && (<Skeleton width={110} height={60} />)}

            {(isVisibleBtnNovo && !isLoading && !smDown) &&
                (<ButtonApp
                    onClick={() => clickNovo}
                    iconButton="add"
                    label={btnNovoTexto} />
                )}

            {isLoading && !smDown && (<Skeleton width={110} height={60} />)}

            {isVisibleBtnApagar && (
                isVisibleBtnNovo || isVisibleBtnApagar || isVisibleBtnSalvar || isVisibleBtnSalvaVoltar
            ) && (
                <Divider variant="middle" orientation="vertical" />
            )}

            {(isVisibleBtnVoltar && !isLoading) &&
                (<ButtonApp
                    onClick={() => clickVoltar}
                    iconButton="arrow_back"
                    label="Voltar" />
                )}

            {isLoading && (<Skeleton width={110} height={60} />)}
        </>
    )
}