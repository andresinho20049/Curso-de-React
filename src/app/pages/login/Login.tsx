import { Button, Input } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextUsuarioLogged } from "../../shared/context";
import { UsuarioService } from "../../shared/services";

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const { setToken } = useContextUsuarioLogged();
    const navigate = useNavigate();

    const bcrypt = require('bcryptjs');

    const handleEntrar = useCallback(() => {
        console.log(email, password);

        UsuarioService.getByUsername(email).then((result) => {
            if (result instanceof Error) {
                alert(result.message);
            } else {
                const r = result[0];

                //Check Password
                if (bcrypt.compareSync(password, r.password)) {

                    setToken(r.password);
                    return navigate('/dashboard');
                }

            }
        });

    }, [email, password])

    return (
        <div>
            <form>
                <Input
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    onClick={() => inputPasswordRef.current?.focus()}
                />

                <Input
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    type='password'
                    ref={inputPasswordRef}
                />

                <Button type="button" onClick={() => handleEntrar()}>Entrar</Button>
            </form>
        </div>
    )
}