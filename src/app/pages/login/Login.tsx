import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarioLogged } from "../../shared/hooks/UseUsuarioLogged";
import { ButtonLogin } from "./components/ButtonLogin";
import { InputLogin } from "./components/inputLogin";

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const { setNome } = useUsuarioLogged();

    const navigate = useNavigate();


    const handleEntrar = useCallback(() => {
        console.log(email, password);

        setNome(email);
        navigate('/')
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