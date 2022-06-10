import { Icon, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { ReactNode } from "react"
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom"


interface IButtonItemDrawerAppProps {
    to: string
    icone: string
    onClick?: () => void
    children: ReactNode
}

export const ButtonItemDrawerApp = ({ to, icone, onClick, children }: IButtonItemDrawerAppProps) => {
    const navigate = useNavigate();

    const resolverdPath = useResolvedPath(to);
    const match = useMatch({ path: resolverdPath.pathname, end: false });

    const handleClick = () => {
        navigate(to)
        onClick?.();
    }

    return (
        <ListItemButton onClick={handleClick} selected={!!match}>
            <ListItemIcon>
                <Icon color="primary" >{icone}</Icon>
            </ListItemIcon>
            <ListItemText>
                <Typography variant="button">
                {children}
                </Typography>
            </ListItemText>
        </ListItemButton>
    )
}