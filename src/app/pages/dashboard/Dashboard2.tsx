
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import { FerramentasDetalhe, FerramentasListagem } from "../../shared/components";
import { useAppDrawerContext, useContextUsuarioLogged } from "../../shared/context";
import { LayoutBasePaginas } from "../../shared/layout";
import { IListPessoa, IListPessoaPaginado, PessoasService } from "../../shared/services";

export const Dashboard2 = () => {

    const [lista, setLista] = useState<IListPessoa[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        PessoasService.getAll(page)
            .then((result) => {
                if (result instanceof Error)
                    return;

                setLista(result.data);

            }).catch((error) => {
                console.error(error);
            })
    }, [page])

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
                        {lista.map((pessoa) => (
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
        </LayoutBasePaginas>
    )
}