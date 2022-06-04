import { Box, TextField } from "@mui/material";
import { ButtonApp } from "../button-app/ButtonApp";


interface IFerramentasListagemProps {
    textoBusca?: string;
    inputBuscaVisible?: boolean;
    onChangeInput?: (newTexto: string) => void;

    textoButton?: string;
    buttonVisible?: boolean;
    onClickButton?: () => void;
}

export const FerramentasListagem = ({
    textoBusca = '',
    inputBuscaVisible = false,
    onChangeInput,
    textoButton = 'Novo',
    buttonVisible = true,
    onClickButton
}: IFerramentasListagemProps) => {
    return (
        <>
            {inputBuscaVisible && (
                <TextField
                    placeholder="Pesquisar..."
                    size="small"
                    value={textoBusca}
                    onChange={(e) => onChangeInput?.(e.target.value)}
                />
            )}
            <Box display="flex" flex={1} justifyContent="end">
                {buttonVisible &&
                    (<ButtonApp
                        onClick={() => onClickButton}
                        iconButton="add"
                        label={textoButton} />
                    )}
            </Box>
        </>
    )
}