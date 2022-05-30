import { UsuarioLoggedProvider } from "./shared/context";
import { Rota } from "./routes"

export const App = () => {
  return (
    <UsuarioLoggedProvider>
      <Rota />
    </UsuarioLoggedProvider>
  );
}