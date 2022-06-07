import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { FerramentasDetalhe } from "../../shared/components";
import { VTextField } from "../../shared/components/forms";
import { LayoutBasePaginas } from "../../shared/layout";
import { PessoasService } from "../../shared/services";


interface IFormData {
    nomeCompleto: string;
    email: string;
    cidadeId: number;
}

export const DetalhePessoas = () => {

    var isSaveAndClose = false;
    const { id } = useParams<'id'>();
    const navigate = useNavigate();

    const formRef = useRef<FormHandles>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    const formValidSchema: yup.SchemaOf<IFormData> = yup.object().shape({
        nomeCompleto: yup.string().required().min(3),
        email: yup.string().required().email(),
        cidadeId: yup.number().required()
    })

    useEffect(() => {
        console.log(id);
        if (id !== undefined) {
            setIsLoading(true);
            PessoasService.getById(Number(id))
                .then((result) => {
                    if (result instanceof Error) {
                        alert(result.message);
                        navigate('/pessoas');
                    } else {
                        setNome(result.nomeCompleto);

                        formRef.current?.setData(result);
                    }
                    setIsLoading(false);
                })
        } else {
            formRef.current?.setData({
                nomeCompleto: '',
                email: '',
                cidadeId: ''
            })
        }
    }, [id])

    const handleSave = (dados: IFormData) => {

        formValidSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValid) => {


                setIsLoading(true);
                if (id === undefined) {
                    PessoasService.create(dadosValid)
                        .then((result) => {
                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose) {
                                    navigate('/pessoas')
                                } else {
                                    navigate(`/pessoas/detalhe/${result}`)
                                }
                            }
                            setIsLoading(false)
                        })
                } else {
                    PessoasService.update({ id: Number(id), ...dadosValid })
                        .then((result) => {
                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                if (isSaveAndClose) {
                                    navigate('/pessoas');
                                } else {
                                    setNome(dados.nomeCompleto);
                                }
                            }
                            setIsLoading(false);
                        })
                }

            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors : { [key: string]: string} = {}

                errors.inner.forEach(error => {
                    if (!error.path) return;

                    validationErrors[error.path] = error.message
                });
                console.log(validationErrors);
                formRef.current?.setErrors(validationErrors);
            })
    }

    const handleDelete = () => {
        if (window.confirm(`Deseja excluir realmente? ${nome}`)) {
            PessoasService.deleteById(Number(id))
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message)
                        // navigate('/pessoas')
                    } else {
                        alert('Registro apagado com sucesso!')
                        navigate('/pessoas')
                    }
                })
        }
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
                    isLoading={isLoading}

                    clickSalvar={() => { isSaveAndClose = false; formRef.current?.submitForm(); }}
                    clickApagar={handleDelete}
                    clickSalvarVoltar={() => { isSaveAndClose = true; formRef.current?.submitForm(); }}
                    clickVoltar={() => navigate('/pessoas')}
                    clickNovo={() => navigate('/pessoas/detalhe')}
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
                                <VTextField
                                    fullWidth
                                    name="cidadeId"
                                    label="Cidade"
                                    disabled={isLoading}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Form>

        </LayoutBasePaginas >
    )
}