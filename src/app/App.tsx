import { UsuarioLoggedProvider } from "./shared/context";
import { Rota } from "./routes"
import { AppThemeProvider } from "./shared/context/ThemeContext";

export const App = () => {
  return (
    <AppThemeProvider>
      <UsuarioLoggedProvider>
        <Rota />
      </UsuarioLoggedProvider>
    </AppThemeProvider>
  );
}