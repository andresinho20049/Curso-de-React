import { useRef } from "react";
import { Link } from "react-router-dom"
import { useUsuarioLogged } from "../../shared/hooks";

export const Dashboard = () => {
    const counterRef = useRef({ counter: 0});

    const usuarioLoggedContext = useUsuarioLogged();
    
    return (
        <div>
            <p>Dashboard</p>

            <p>{usuarioLoggedContext.nomeUsuario}</p>

            <p>{counterRef.current?.counter}</p>

            <button onClick={() => counterRef.current.counter++}>Add+</button>
            <button onClick={() => console.log(counterRef.current.counter)}>Log</button>

            <button onClick={usuarioLoggedContext.logout}>Logout</button>

            <div>
                <Link to="/login">Logar</Link>
            </div>
        </div>
    )
}