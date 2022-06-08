import { Rota } from "./routes"
import { UsuarioLoggedProvider } from "./shared/context/UsuarioLogged";

export const App = () => {
  return (
    <UsuarioLoggedProvider>
      <Rota />
    </UsuarioLoggedProvider>
  );
}