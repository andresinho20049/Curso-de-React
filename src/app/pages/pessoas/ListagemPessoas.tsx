import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';

import { IListPessoa, PessoasService } from "../../shared/services";
import { DialogConfirm, FerramentasListagem } from "../../shared/components"
import { LayoutBasePaginas } from "../../shared/layout"
import { useDobounce } from "../../shared/hooks";
import { useSnackbarAppContext } from "../../shared/context/SnackbarAppContext";
import { useDialogConfirmAppContext } from "../../shared/context";


interface ISelectedItemData {
    id: number;
    nome: string;
}

export const ListagemPessoas = () => {
    const navigate = useNavigate();
    const { debounce } = useDobounce();
    const { showMsg } = useSnackbarAppContext();
    const { handleOpenDialog } = useDialogConfirmAppContext();
    const [selectedItem, setSelectedItem] = useState({} as ISelectedItemData);
    
    
    const [limitPage, setLimitPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [rows, setRows] = useState<IListPessoa[]>([]);
    
    
    // Busca e pagina no SearchParams
    const [searchParams, setSearchParams] = useSearchParams();

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);
    
    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);
    
    const handleChangePage = (event: unknown, newPage: number) => {
        console.log('ChangePage', newPage)
        console.log(event)
        setSearchParams({ busca, pagina: String(newPage + 1) }, { replace: true })
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handle Change Rows PerPage')
        setLimitPage(parseInt(event.target.value));
        setSearchParams({ busca, pagina: '1' }, { replace: true })
    };

    
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        debounce(() => {
            PessoasService.getAll(pagina, limitPage, busca)
                .then((result) => {
                    setLoading(false);

                    if (result instanceof Error) {
                        showMsg(result.message, true);
                        return;
                    }

                    setRows(result.data);
                    setTotalCount(result.totalCount);
                })
        })
    }, [pagina, limitPage, busca])


    const handleConfirmDelete = useCallback((selectedItem: ISelectedItemData) => {
        setSelectedItem(selectedItem);
        handleOpenDialog(selectedItem.id);
    }, [selectedItem])

    const handleDelete = useCallback((id: number) => {
        PessoasService.deleteById(id)
            .then((result) => {
                if (result instanceof Error) {
                    showMsg(result.message, true)
                } else {
                    showMsg("Pessoa apagada com sucesso!");
                    setRows(oldRows => oldRows.filter(p => p.id !== id))
                }
            })
    }, [])

    return (
        <LayoutBasePaginas
            titulo="Listagem de Pessoas"
            barraFerramentas={
                <FerramentasListagem
                    inputBuscaVisible
                    buttonVisible
                    textoBusca={busca}
                    onClickButton={() => navigate(`/pessoas/detalhe`)}
                    onChangeInput={value => setSearchParams({ busca: value }, { replace: true })}
                />
            }>

            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={100}>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((pessoa) => (
                            <TableRow
                                key={pessoa.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <IconButton onClick={() => handleConfirmDelete({ id: pessoa.id, nome: pessoa.nomeCompleto })} size="small">
                                        <Icon>delete</Icon>
                                    </IconButton>
                                    <IconButton onClick={() => navigate(`/pessoas/detalhe/${pessoa.id}`)} size="small">
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </TableCell>
                                <TableCell>{pessoa.nomeCompleto}</TableCell>
                                <TableCell>{pessoa.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    {totalCount === 0 && !isLoading && (
                        <caption> Nenhum Registro encontrado.</caption>
                    )}

                    <TableFooter>
                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <LinearProgress variant="indeterminate" />
                                </TableCell>
                            </TableRow>
                        )}

                        {totalCount !== 0 && !isLoading && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={totalCount}
                                        rowsPerPage={limitPage}
                                        page={pagina - 1}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>

            <DialogConfirm
                titleDialog="Excluir pessoa"
                contextTextDialog={`
                    Deseja realmente excluir a pessoa (${selectedItem.nome})? 
                    Caso queira continuar é só clicar em confirmar.
                `}
                handleActionDialog={() => handleDelete(selectedItem.id)}
            />

        </LayoutBasePaginas >

    )
}