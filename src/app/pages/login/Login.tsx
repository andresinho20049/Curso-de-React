import { useState } from "react";
import { useNavigate } from "react-router-dom"



export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();


    const handleEntrar = () => {
        console.log(email, password);
    }

    return (
        <div>
            <form>
                <div>
                    <label>
                        <span>Email</span>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="text" />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Senha</span>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
                    </label>
                </div>

                <button type="button" onClick={handleEntrar}>
                    Entrar
                </button>
            </form>
        </div>
    )
}