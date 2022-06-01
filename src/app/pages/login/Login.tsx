import { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContextUsuarioLogged } from "../../shared/hooks";
import { ApiException } from "../../shared/services/api/ApiException";
import { UsuarioService } from "../../shared/services/api/usuario/UsuarioService";
import { ButtonLogin } from "./components/ButtonLogin";
import { InputLogin } from "./components/inputLogin";

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const {setToken} = useContextUsuarioLogged();
    const navigate = useNavigate();

    const bcrypt = require('bcryptjs');

    const handleEntrar = useCallback(() => {
        console.log(email, password);

        UsuarioService.getByUsername(email).then((result) => {
            if (result instanceof ApiException) {
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
                <InputLogin
                    value={email}
                    label="Email"
                    onChange={setEmail}
                    onPressEnter={() => inputPasswordRef.current?.focus()}
                />

                <InputLogin
                    value={password}
                    label="Password"
                    onChange={setPassword}
                    type='password'
                    ref={inputPasswordRef}
                />

                <ButtonLogin type="button" onClick={handleEntrar} label="Entrar" />
            </form>
        </div>
    )
}