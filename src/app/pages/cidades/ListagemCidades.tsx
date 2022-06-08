import { Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { DialogConfirm, FerramentasListagem } from "../../shared/components"
import { useDialogConfirmAppContext } from "../../shared/context";
import { useSnackbarAppContext } from "../../shared/context/SnackbarAppContext";
import { useDobounce } from "../../shared/hooks";
import { LayoutBasePaginas } from "../../shared/layout"
import { CidadesService, ICidadeData } from "../../shared/services";


export const ListagemCidades = () => {
    const navigate = useNavigate();
    const { debounce } = useDobounce();
    const { showMsg } = useSnackbarAppContext();
    const { handleOpenDialog } = useDialogConfirmAppContext();
    const [selectedItem, setSelectedItem] = useState({} as ICidadeData)


    const [rows, setRows] = useState<ICidadeData[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [limitPage, setLimitPage] = useState(5);

    
    //Busca e troca de pagina usando SearchParams
    const [searchParams, setSearchParams] = useSearchParams();
    
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);
    
    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setSearchParams({ busca, pagina: String(newPage + 1) }, { replace: true })
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimitPage(parseInt(event.target.value));
        setSearchParams({ busca, pagina: '1' }, { replace: true })
    };
    
    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);

        debounce(() => {
            CidadesService.getAll(pagina, limitPage, busca)
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

    const handleConfirmDelete = useCallback((selectedItem: ICidadeData) => {
        setSelectedItem(selectedItem);
        handleOpenDialog(selectedItem.id);
    }, [selectedItem])

    const handleDelete = useCallback((id: number) => {
        CidadesService.deleteById(id)
            .then((result) => {
                if (result instanceof Error) {
                    showMsg(result.message, true)
                } else {
                    showMsg("Cidade apagada com sucesso!");
                    setRows(oldRows => oldRows.filter(p => p.id !== id))
                }
            })
    }, [])

    return (
        <LayoutBasePaginas
            titulo="Listagem de Cidades"
            barraFerramentas={
                <FerramentasListagem
                    inputBuscaVisible
                    buttonVisible
                    textoBusca={busca}
                    onClickButton={() => navigate(`/cidades/detalhe`)}
                    onChangeInput={value => setSearchParams({ busca: value }, { replace: true })}
                />
            }>

            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell width={100}>Ações</TableCell>
                            <TableCell>Nome</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((cidade) => (
                            <TableRow
                                key={cidade.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    <IconButton onClick={() => handleConfirmDelete(cidade)} size="small">
                                        <Icon>delete</Icon>
                                    </IconButton>
                                    <IconButton onClick={() => navigate(`/cidades/detalhe/${cidade.id}`)} size="small">
                                        <Icon>edit</Icon>
                                    </IconButton>
                                </TableCell>
                                <TableCell>{cidade.nome}</TableCell>
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
                titleDialog="Excluir cidade"
                contextTextDialog={`
                    Deseja realmente excluir a cidade (${selectedItem.nome})? 
                    Caso queira continuar é só clicar em confirmar.
                `}
                handleActionDialog={() => handleDelete(selectedItem.id)}
            />

        </LayoutBasePaginas >

    )
}