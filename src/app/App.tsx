import { AppDrawerProvider, UsuarioLoggedProvider } from "./shared/context";
import { Rota } from "./routes"
import { AppThemeProvider } from "./shared/context/ThemeContext";
import { MenuLateral } from "./shared/components";

export const App = () => {
  return (
    <AppThemeProvider>
      <UsuarioLoggedProvider>
        <AppDrawerProvider>
          <MenuLateral>
            <Rota />
          </MenuLateral>
        </AppDrawerProvider>
      </UsuarioLoggedProvider>
    </AppThemeProvider>
  );
}