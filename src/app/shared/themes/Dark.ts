import { createTheme } from "@mui/material";
import { cyan, yellow } from "@mui/material/colors";


export const DarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: yellow[700],
            contrastText: '#fff'
        },
        secondary: {
            main: cyan[500],
            contrastText: '#fff'
        },
        background: {
            default: '#202124',
            paper: '#303134'
        }
    },
    typography: {
        allVariants: {
            color: 'white'
        }
    }
});