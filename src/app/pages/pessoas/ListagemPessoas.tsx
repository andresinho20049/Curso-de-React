import { Icon, IconButton, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { useListagemPessoas } from '../../hooks';


import { DialogConfirm, FerramentasListagem } from "../../shared/components"
import { LayoutBasePaginas } from "../../shared/layout"

export const ListagemPessoas = () => {

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

    } = useListagemPessoas();

    return (
        <LayoutBasePaginas
            titulo="Listagem de Pessoas"
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
                                    <IconButton onClick={() => handleUpdate(pessoa.id)} size="small">
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