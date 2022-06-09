import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as yup from "yup";
import { FormHandles } from "@unform/core";

import { useDialogConfirmAppContext } from "../../shared/context";
import { CidadesService, ICidadeData } from "../../shared/services";
import { useSnackbarAppContext } from "../../shared/context/SnackbarAppContext";

export const useDetalheCidade = () => {

    const navigate = useNavigate();
    const formRef = useRef<FormHandles>(null);

    const { id } = useParams<'id'>();

    const { showMsg } = useSnackbarAppContext();

    const { handleOpenDialog } = useDialogConfirmAppContext();

    const [isLoading, setIsLoading] = useState(false);
    const [nome, setNome] = useState('');

    const formValidSchema: yup.SchemaOf<Omit<ICidadeData, 'id'>> = yup.object().shape({
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

    const handleVoltar = useCallback(() => {
        navigate('/cidades');
    }, [])

    const handleNovo = useCallback(() => {
        navigate('/cidades/detalhe');
    }, [])

    const isSaveAndClose = useRef(false);
    const saveAndClose = useCallback(() => {
        isSaveAndClose.current = true;
        formRef.current?.submitForm();
    }, [])

    const saveOnly = useCallback(() => {
        isSaveAndClose.current = false;
        formRef.current?.submitForm();
    }, [])

    const handleSave = useCallback((dados: Omit<ICidadeData, 'id'>) => {

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
                                if (isSaveAndClose.current) {
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
                                if (isSaveAndClose.current) {
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
    }, [id, isSaveAndClose])


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

    return {
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
    }

}