import { UsuarioLoggedProvider, AppThemeProvider } from "./shared/context";
import { Rotas } from "./routes";

export const App = () => {
  return (
    <AppThemeProvider>
      <UsuarioLoggedProvider>
        <Rotas />
      </UsuarioLoggedProvider>
    </AppThemeProvider>
  );
}