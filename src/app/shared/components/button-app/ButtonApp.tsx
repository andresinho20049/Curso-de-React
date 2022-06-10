import { Button, Icon } from "@mui/material";

interface IButtonAppProps {
    variant?: "outlined" | "text" | "contained";
    color?: "primary" | "secondary";
    onClick: () => void
    iconButton: string;
    label: string
}

export const ButtonApp = ({
    variant = "outlined",
    color = "primary",
    onClick,
    iconButton,
    label
}: IButtonAppProps) => {
    return (
        <Button
            variant={variant}
            color={color}
            disableElevation
            onClick={onClick}
            startIcon={<Icon>{iconButton}</Icon>}>

            {label}

        </Button>
    )
}