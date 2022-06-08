import { AppThemeProvider, AuthenticationProvider } from "./shared/context";
import './shared/form/TraducoesYup'
import { Rotas } from "./routes";
import { SnackbarAppProvider } from "./shared/context/SnackbarAppContext";

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