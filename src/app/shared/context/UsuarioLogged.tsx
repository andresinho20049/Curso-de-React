import { createContext, useCallback, useEffect, useState } from "react";

interface IUsuarioLoggedConxtextData {
    nomeUsuario: string
    setNome: (nome: string) => void
    logout: () => void
}

interface IUsuarioLoggedProviderProps {
    children: React.ReactNode
}

export const UsuarioLoggedContext = createContext<IUsuarioLoggedConxtextData>({} as IUsuarioLoggedConxtextData);

export const UsuarioLoggedProvider : React.FC<IUsuarioLoggedProviderProps> = ({children}) => {

    const [nome, setNome] = useState('');

    const handleLogout = useCallback(() => {
        console.log('Logout Executou');
    }, [])

    return (
        <UsuarioLoggedContext.Provider value={{nomeUsuario: nome, setNome: setNome, logout: handleLogout}}>
            {children}
        </UsuarioLoggedContext.Provider>
    );
}