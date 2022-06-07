import { UsuarioLoggedProvider, AppThemeProvider } from "./shared/context";
import './shared/hooks/TraducoesYup'
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