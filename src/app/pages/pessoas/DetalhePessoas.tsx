import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { Form } from "@unform/web";
import { useDetalhePessoa } from "../../hooks";
import { DialogConfirm, FerramentasDetalhe, VAutocomplete, VTextField } from "../../shared/components";
import { LayoutBasePaginas } from "../../shared/layout";

export const DetalhePessoas = () => {

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

        getOptionLabel,
        findAutocompleteCidade

    } = useDetalhePessoa();

    return (
        <LayoutBasePaginas
            titulo={id !== undefined ? `Atualizar ${nome}` : 'Nova pessoa'}
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
                                    name="nomeCompleto"
                                    label="Nome"
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction='row'>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VTextField
                                    fullWidth
                                    name="email"
                                    label="E-mail"
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction='row'>
                            <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                                <VAutocomplete
                                    isExtLoading={isLoading}
                                    label="Cidade"
                                    name="cidade"
                                    getLabel={getOptionLabel}
                                    findValues={(busca) => findAutocompleteCidade(busca)}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Form>

            <DialogConfirm
                titleDialog="Excluir pessoa"
                contextTextDialog={`
                    Deseja realmente excluir a pessoa (${nome})? 
                    Caso queira continuar é só clicar em confirmar.
                `}
                handleActionDialog={() => handleDelete(Number(id))}
            />

        </LayoutBasePaginas >
    )
}