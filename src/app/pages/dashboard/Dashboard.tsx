import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FerramentasListagem } from "../../shared/components";
import { useContextUsuarioLogged } from "../../shared/context";
import { LayoutBasePaginas } from "../../shared/layout";
import { CidadesService, PessoasService } from "../../shared/services";

export const Dashboard = () => {

    const { setToken } = useContextUsuarioLogged();

    const [totalPessoas, setTotalPessoas] = useState(0);
    const [isLoadingPessoas, setLoadingPessoas] = useState(true);

    const [totalCidade, setTotalCidade] = useState(0);
    const [isLoadingCidades, setLoadingCidades] = useState(true);

    useEffect(() => {
        setLoadingPessoas(true);

        PessoasService.getAll(1, 5, '')
            .then((result) => {
                setLoadingPessoas(false);

                if (result instanceof Error) {
                    console.log(result.message);
                    return;
                }

                setTotalPessoas(result.totalCount);
            })

        setLoadingCidades(true);
        CidadesService.getAll(1, 5, '')
            .then((result) => {
                setLoadingCidades(false);

                if (result instanceof Error) {
                    console.log(result.message);
                    return;
                }

                setTotalCidade(result.totalCount);
            })
    }, [])

    return (
        <LayoutBasePaginas titulo="Dashboard" barraFerramentas={<FerramentasListagem buttonVisible={false} />}>

            <Box width='100%' display='flex'>
                <Grid container spacing={2} margin={1}>
                    <Grid item xs={12} md={6} lg={4} xl={3}>

                        <Card>
                            <CardContent>
                                <Typography align="center" variant="h5">
                                    Total de Pesssoas
                                </Typography>

                                <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                                <Typography variant={!isLoadingPessoas ? "h1" : "h6"}>
                                        {!isLoadingPessoas ? totalPessoas : "Carregando..."}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>

                    </Grid>

                    <Grid item xs={12} md={6} lg={4} xl={3}>

                        <Card>
                            <CardContent>
                                <Typography align="center" variant="h6">
                                    Total de Cidades
                                </Typography>

                                <Box padding={6} display="flex" justifyContent="center" alignItems="center">
                                    <Typography variant={!isLoadingCidades ? "h1" : "h5"}>
                                        {!isLoadingCidades ? totalCidade : "Carregando..."}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>

                    </Grid>
                </Grid>

            </Box>


        </LayoutBasePaginas>
    )
}