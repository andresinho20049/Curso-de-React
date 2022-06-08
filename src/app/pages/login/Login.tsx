import { Copyright } from "@mui/icons-material";
import { Avatar, Box, Button, CircularProgress, Container, CssBaseline, Grid, Input, Link, TextField, Tooltip, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextAuthentication } from "../../shared/context";
import { IUsuarioLogin } from "../../shared/services";
import * as yup from "yup";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { VTextField } from "../../shared/components/forms";

export const Login = () => {

    const formValidSchema: yup.SchemaOf<IUsuarioLogin> = yup.object().shape({
        username: yup.string().required().email(),
        password: yup.string().required()
    })
    const formRef = useRef<FormHandles>(null);

    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const { login } = useContextAuthentication();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const handleEntrar = useCallback((dados: IUsuarioLogin) => {
        setIsLoading(true);

        formValidSchema
            .validate(dados, { abortEarly: false })
            .then((dadosValid) => {

                login(dadosValid)
                    .then((res) => {
                        setIsLoading(false);
                        navigate('/dashboard');
                    })
            })
            .catch((errors: yup.ValidationError) => {
                setIsLoading(false);
                const validationErrors: { [key: string]: string } = {}

                errors.inner.forEach(error => {
                    if (!error.path || validationErrors[error.path]) return;

                    validationErrors[error.path] = error.message
                });
                formRef.current?.setErrors(validationErrors);
            })

    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 1
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                </Avatar>
                <Typography variant="h5">
                    Login
                </Typography>
                <Form ref={formRef} onSubmit={handleEntrar}>
                    <VTextField
                        autoFocus
                        fullWidth
                        id="email"
                        label="E-mail"
                        name="username"
                        variant="standard"
                        disabled={isLoading}
                    />
                    <VTextField
                        fullWidth
                        sx={{ mt: 1 }}
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        variant="standard"
                        disabled={isLoading}
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        sx={{ mt: 3, mb: 2 }}
                        endIcon={isLoading ? <CircularProgress variant="indeterminate" size={22} /> : undefined}
                    >
                        Logar
                    </Button>
                    <Box display="flex" justifyContent="flex-end">

                        <Tooltip
                            title={`
                            Mais informações podem ser encontradas no README do github
                        `}
                        >
                            <Link target="_blank" color="error" href="https://github.com/andresinho20049/Curso-de-React" variant="body2">
                                Help
                            </Link>
                        </Tooltip>
                    </Box>
                </Form>
            </Box>
        </Container>
    )
}