import { AppThemeProvider, AuthenticationProvider } from "./shared/context";
import './shared/form/TraducoesYup'
import { Rotas } from "./routes";

export const App = () => {
  return (
    <AppThemeProvider>
      <AuthenticationProvider>
        <Rotas />
      </AuthenticationProvider>
    </AppThemeProvider>
  );
}