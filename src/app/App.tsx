import { UsuarioLoggedProvider, AppThemeProvider } from "./shared/context";
import './shared/form/TraducoesYup'
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