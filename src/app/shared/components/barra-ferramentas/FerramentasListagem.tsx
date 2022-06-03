import { Box, Button, Icon, TextField } from "@mui/material"


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
                {(buttonVisible &&
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        onClick={onClickButton}
                        endIcon={<Icon>add</Icon>}>

                        {textoButton}

                    </Button>)}
            </Box>
        </>
    )
}