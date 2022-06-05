
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useCallback, useEffect, useState } from "react";
import { FerramentasDetalhe } from "../../shared/components";
import { LayoutBasePaginas } from "../../shared/layout";
import { IListPessoa, PessoasService } from "../../shared/services";

export const Dashboard2 = () => {

    const [listPessoa, setList] = useState<IListPessoa[]>([]);

    const [page, setPage] = useState(1);
    const [limitPage, setLimitPage] = useState(5);
    const [totalSize, setTotalSize] = useState(0);

    const handleChangePage = (event: unknown, newPage: number) => {
        console.log('ChangePage', newPage)
        console.log(event)
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handle Change Rows PerPage')
        setLimitPage(parseInt(event.target.value));
        setPage(1);
    };

    useEffect(() => {
        PessoasService.getAll(page, limitPage)
            .then((result) => {
                if (result instanceof Error)
                    return;

                setList(result.data);
                setTotalSize(result.totalCount);

            }).catch((error) => {
                console.error(error);
            })
    }, [page, limitPage])

    return (
        <LayoutBasePaginas titulo="Dashboard" barraFerramentas={<FerramentasDetalhe isVisibleBtnSalvaVoltar />}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>CidadeId</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listPessoa.map((pessoa) => (
                            <TableRow
                                key={pessoa.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {pessoa.id}
                                </TableCell>
                                <TableCell>{pessoa.nomeCompleto}</TableCell>
                                <TableCell>{pessoa.email}</TableCell>
                                <TableCell>{pessoa.cidadeId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalSize}
                rowsPerPage={limitPage}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </LayoutBasePaginas>
    )
}