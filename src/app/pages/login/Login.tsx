import { useCallback, useRef, useState } from "react";

export const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const inputPasswordRef = useRef<HTMLInputElement>(null);


    // useEffect(() => {
    //     console.log(email, password);
    // }, [email, password]);

    const handleEntrar = useCallback(() => {
        console.log(email, password);

        if(inputPasswordRef.current !== null){
            inputPasswordRef.current.focus();
        }
    }, [email, password])

    return (
        <div>
            <form>
                <p>Quantidade de caracteres no e-mail: {email.length}</p>
                <div>
                    <label>
                        <span>Email</span>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="text"
                        onKeyDown={e => e.key === 'Enter' ? inputPasswordRef.current?.focus() : undefined} />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Senha</span>
                        <input ref={inputPasswordRef} value={password} onChange={e => setPassword(e.target.value)} type="password" />
                    </label>
                </div>

                <button type="button" onClick={handleEntrar}>
                    Entrar
                </button>
            </form>
        </div>
    )
}