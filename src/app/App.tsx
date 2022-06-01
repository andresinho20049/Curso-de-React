import { UsuarioLoggedProvider } from "./shared/context";
import { Rota } from "./routes"
import { ThemeProvider } from "@mui/material";
import { LightTheme } from "./shared/themes";

export const App = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <UsuarioLoggedProvider>
        <Rota />
      </UsuarioLoggedProvider>
    </ThemeProvider>
  );
}