import { FormHandles } from "@unform/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useDialogConfirmAppContext } from "../../shared/context";
import { useSnackbarAppContext } from "../../shared/context/SnackbarAppContext";
import { CidadesService, ICidadeData, IDetalhePessoa, PessoasService } from "../../shared/services";



export const useDetalhePessoa = () => {

    const navigate = useNavigate();
    const { showMsg } = useSnackbarAppContext();
    const { handleOpenDialog } = useDialogConfirmAppContext();

    const { id } = useParams<'id'>();
    const [nome, setNome] = useState('');

    const formRef = useRef<FormHandles>(null);

    const [isLoading, setIsLoading] = useState(false);

    const getOptionLabel = useCallback((cidade: ICidadeData) => {
        return cidade?.nome || '';
    }, [])

    const findAutocompleteCidade = useCallback(async (busca: string): Promise<ICidadeData[]> => {

        const result = await CidadesService.getAll(1, 5, busca);

        if (result instanceof Error) return [] as ICidadeData[];

        return result.data;

    }, [])


    const formValidSchema: yup.SchemaOf<Omit<IDetalhePessoa, 'id'>> = yup.object().shape({
        nomeCompleto: yup.string().required().min(3),
        email: yup.string().required().email(),
        cidade: yup.object().shape({
            id: yup.number().required(),
            nome: yup.string().required()
        })
    })

    useEffect(() => {
        if (id !== undefined) {
            setIsLoading(true);
            PessoasService.getById(Number(id))
                .then((result) => {
                    if (result instanceof Error) {
                        showMsg(result.message, true);
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
                cidade: null
            })
        }
    }, [id])

    const handleVoltar = useCallback(() => {
        navigate('/pessoas');
    }, [])

    const handleNovo = useCallback(() => {
        navigate('/pessoas/detalhe');
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

    const handleSave = useCallback((dados: IDetalhePessoa) => {

        formValidSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValid) => {

                setIsLoading(true);
                if (id === undefined) {
                    PessoasService.create(dadosValid)
                        .then((result) => {
                            if (result instanceof Error) {
                                showMsg(result.message);
                            } else {
                                showMsg("Pessoa cadastrada com sucesso!");
                                if (isSaveAndClose.current) {
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
                                showMsg(result.message);
                            } else {
                                showMsg("Pessoa atualizada com sucesso!");
                                if (isSaveAndClose.current) {
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
                const validationErrors: { [key: string]: string } = {}

                errors.inner.forEach(error => {
                    if (!error.path || validationErrors[error.path]) return;

                    validationErrors[error.path] = error.message
                });
                formRef.current?.setErrors(validationErrors);
            })
    }, [id])

    const handleDelete = useCallback((id: number) => {
        PessoasService.deleteById(Number(id))
            .then(result => {
                if (result instanceof Error) {
                    showMsg(result.message, true)
                } else {
                    showMsg('Registro apagado com sucesso!')
                    navigate('/pessoas')
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

        getOptionLabel,
        findAutocompleteCidade

    }

}