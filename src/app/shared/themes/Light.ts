import { createTheme } from "@mui/material";
import { cyan, yellow } from "@mui/material/colors";


export const LightTheme = createTheme({
    palette: {
        primary: {
            main: yellow[700],
            contrastText: '#fff'
        },
        secondary: {
            main: cyan[500],
            contrastText: '#fff'
        },
        background: {
            default: '#f7f6f3',
            paper: '#fff'
        }
    }
});