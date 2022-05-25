import { Link } from "react-router-dom"

export const Dashboard = () => {
    return (
        <div>
            <p>Dashboard</p>

            <div>
                <Link to="/login">Logar</Link>
            </div>
        </div>
    )
}