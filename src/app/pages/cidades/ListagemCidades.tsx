import { Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import { useListagemCidades } from "../../hooks";
import { DialogConfirm, FerramentasListagem } from "../../shared/components";
import { LayoutBasePaginas } from "../../shared/layout";


export const ListagemCidades = () => {

    const {
        busca,
        handleSearchInput,

        selectedItem,

        handleNovo,
        handleUpdate,
        handleDelete,
        handleConfirmDelete,
        
        isLoading,
        
        rows,
        pagina,
        limitPage,
        totalCount,
        handleChangePage,
        handleChangeRowsPerPage,

    } = useListagemCidades();

    return (
        <LayoutBasePaginas
            titulo="Listagem de Cidades"
            barraFerramentas={
                <FerramentasListagem
                    inputBuscaVisible
                    buttonVisible
                    textoBusca={busca}
                    onClickButton={handleNovo}
                    onChangeInput={value => handleSearchInput(value)}
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
                                    <IconButton onClick={() => handleUpdate(cidade.id)} size="small">
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