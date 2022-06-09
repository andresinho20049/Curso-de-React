import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { Form } from "@unform/web";
import { DialogConfirm, FerramentasDetalhe } from "../../shared/components";
import { VTextField } from "../../shared/components/forms";
import { LayoutBasePaginas } from "../../shared/layout";
import { useDetalheCidade } from "../../hooks";
;

export const DetalheCidades = () => {

    const {
        id,
        nome,

        isLoading,

        formRef,
        saveOnly,
        saveAndClose,

        handleNovo,
        handleSave,
        handleVoltar,
        handleDelete,

        handleOpenDialog,
    } = useDetalheCidade();

    return (
        <LayoutBasePaginas
            titulo={id !== undefined ? `Atualizar ${nome}` : 'Nova cidade'}
            barraFerramentas={
                <FerramentasDetalhe
                    btnNovoTexto="Nova"
                    isVisibleBtnSalvaVoltar
                    isVisibleBtnNovo={id !== undefined}
                    isVisibleBtnApagar={id !== undefined}
                    isLoading={isLoading}

                    clickSalvar={saveOnly}
                    clickApagar={() => handleOpenDialog(Number(id))}
                    clickSalvarVoltar={saveAndClose}
                    clickVoltar={handleVoltar}
                    clickNovo={handleNovo}
                />}>

            <Form ref={formRef} onSubmit={handleSave}>

                <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>

                    <Grid container direction='column' padding={2} spacing={2}>

                        <Grid item>
                            {isLoading && (
                                <LinearProgress variant="indeterminate" />
                            )}
                        </Grid>

                        <Grid item>
                            <Typography variant="h6">Geral</Typography>
                        </Grid>

                        <Grid container item direction='row' spacing={2} >
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    name="nome"
                                    label="Nome"
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Form>

            <DialogConfirm
                titleDialog="Excluir cidade"
                contextTextDialog={`
                    Deseja realmente excluir a cidade (${nome})? 
                    Caso queira continuar é só clicar em confirmar.
                `}
                handleActionDialog={() => handleDelete(Number(id))}
            />

        </LayoutBasePaginas >
    )
}