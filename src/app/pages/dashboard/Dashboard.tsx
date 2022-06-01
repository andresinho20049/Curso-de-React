import { Button } from "@mui/material";
import { useContextUsuarioLogged } from "../../shared/hooks";

export const Dashboard = () => {

    const { setToken } = useContextUsuarioLogged();

    return (
        <div>
            <p>Dashboard</p>

            <Button variant="contained" color="primary" type="button" onClick={() => setToken(null)}>Sair</Button>
        </div>
    )
}