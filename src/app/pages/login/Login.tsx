import { useCallback, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUsuarioLogged } from "../../shared/hooks";
import { ButtonLogin } from "./components/ButtonLogin";
import { InputLogin } from "./components/inputLogin";

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const { nomeUsuario } = useUsuarioLogged();


    // useEffect(() => {
    //     console.log(email, password);
    // }, [email, password]);

    const handleEntrar = useCallback(() => {
        console.log(email, password);

        if(inputPasswordRef.current !== null){
            inputPasswordRef.current.focus();
            return;
        }

        Navigate({to: '/'});
    }, [email, password])

    return (
        <div>
            <form>

                <p>Quantidade de caracteres no e-mail: {email.length}</p>

                <p>{nomeUsuario}</p>

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
                
                {/* <button type="button" onClick={handleEntrar}>
                    Entrar
                </button> */}

                <ButtonLogin type="button" onClick={handleEntrar} label="Entrar" />
            </form>
        </div>
    )
}