import { AppThemeProvider, AuthenticationProvider, SnackbarAppProvider } from "./shared/context";
import './shared/form/TraducoesYup'
import { Rotas } from "./routes";

export const App = () => {
  return (
    <AppThemeProvider>
      <SnackbarAppProvider>
        <AuthenticationProvider>
          <Rotas />
        </AuthenticationProvider>
      </SnackbarAppProvider>
    </AppThemeProvider>
  );
}