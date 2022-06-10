import { AppThemeProvider, AuthenticationProvider, SnackbarAppProvider } from "./shared/context";
import './shared/form/TraducoesYup'
import { Rotas } from "./routes";
import { darkScrollbar, GlobalStyles } from "@mui/material";

export const App = () => {
  return (
    <AppThemeProvider>
      <SnackbarAppProvider>
        <AuthenticationProvider>
          <GlobalStyles styles={{ ...darkScrollbar() }} />
          <Rotas />
        </AuthenticationProvider>
      </SnackbarAppProvider>
    </AppThemeProvider>
  );
}