import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { DialogConfirm, FerramentasDetalhe } from "../../shared/components";
import { VTextField } from "../../shared/components/forms";
import { useDialogConfirmAppContext } from "../../shared/context";
import { useSnackbarAppContext } from "../../shared/context/SnackbarAppContext";
import { LayoutBasePaginas } from "../../shared/layout";
import { CidadesService } from "../../shared/services";


interface IFormData {
    nome: string
}

export const DetalheCidades = () => {

    var isSaveAndClose = false;
    const { id } = useParams<'id'>();
    const navigate = useNavigate();
    const { handleOpenDialog } = useDialogConfirmAppContext();

    const { showMsg } = useSnackbarAppContext();

    const formRef = useRef<FormHandles>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    const formValidSchema: yup.SchemaOf<IFormData> = yup.object().shape({
        nome: yup.string().required().min(3)
    })

    useEffect(() => {
        if (id !== undefined) {
            setIsLoading(true);
            CidadesService.getById(Number(id))
                .then((result) => {
                    if (result instanceof Error) {
                        showMsg(result.message, true);
                        navigate('/cidades');
                    } else {
                        setNome(result.nome);

                        formRef.current?.setData(result);
                    }
                    setIsLoading(false);
                })
        } else {
            formRef.current?.setData({
                nome: ''
            })
        }
    }, [id])

    const handleSave = (dados: IFormData) => {

        formValidSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValid) => {


                setIsLoading(true);
                if (id === undefined) {
                    CidadesService.create(dadosValid)
                        .then((result) => {
                            if (result instanceof Error) {
                                showMsg(result.message, true);
                            } else {
                                showMsg('Cidade cadastrada com sucesso!');
                                if (isSaveAndClose) {
                                    navigate('/cidades')
                                } else {
                                    navigate(`/cidades/detalhe/${result}`)
                                }
                            }
                            setIsLoading(false)
                        })
                } else {
                    CidadesService.update({ id: Number(id), ...dadosValid })
                        .then((result) => {
                            if (result instanceof Error) {
                                showMsg(result.message, true);
                            } else {
                                showMsg('Cidade atualizada com sucesso!');
                                if (isSaveAndClose) {
                                    navigate('/cidades');
                                } else {
                                    setNome(dados.nome);
                                }
                            }
                            setIsLoading(false);
                        })
                }

            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: { [key: string]: string } = {}

                errors.inner.forEach(error => {
                    if (!error.path || validationErrors[error.path]) return;

                    validationErrors[error.path] = error.message
                });
                formRef.current?.setErrors(validationErrors);
            })
    }


    const handleDelete = useCallback((id: number) => {
        CidadesService.deleteById(Number(id))
            .then(result => {
                if (result instanceof Error) {
                    showMsg(result.message, true)
                } else {
                    showMsg('Registro apagado com sucesso!')
                    navigate('/cidades')
                }
            })
    }, [])

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

                    clickSalvar={() => { isSaveAndClose = false; formRef.current?.submitForm(); }}
                    clickApagar={() => handleOpenDialog(Number(id))}
                    clickSalvarVoltar={() => { isSaveAndClose = true; formRef.current?.submitForm(); }}
                    clickVoltar={() => navigate('/cidades')}
                    clickNovo={() => navigate('/cidades/detalhe')}
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