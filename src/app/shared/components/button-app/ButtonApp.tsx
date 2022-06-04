import { Button, Icon, Typography } from "@mui/material"

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
}:IButtonAppProps) => {
    return (
        <Button
            variant={variant}
            color={color}
            disableElevation
            onClick={() => onClick()}
            startIcon={<Icon>{iconButton}</Icon>}>

            <Typography variant="button" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
                {label}
            </Typography>

        </Button>
    )
}