import { useContextUsuarioLogged } from "../../shared/hooks";

export const Dashboard = () => {

    const { setToken } = useContextUsuarioLogged();

    return (
        <div>
            <p>Dashboard</p>


            <button type="button" onClick={() => setToken(null)}>
                Sair
            </button>
        </div>
    )
}