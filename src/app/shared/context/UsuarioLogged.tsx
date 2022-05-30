import { createContext, useCallback, useEffect, useState } from "react";

interface IUsuarioLoggedConxtextData {
    nomeUsuario: string
    logout: () => void
}

interface IUsuarioLoggedProviderProps {
    children: React.ReactNode
}

export const UsuarioLoggedContext = createContext<IUsuarioLoggedConxtextData>({} as IUsuarioLoggedConxtextData);

export const UsuarioLoggedProvider : React.FC<IUsuarioLoggedProviderProps> = ({children}) => {

    const [nome, setNome] = useState('');

    useEffect(() => {
        setTimeout(() => [
            setNome('André')
        ], 1000);
    })

    const handleLogout = useCallback(() => {
        console.log('Logout Executou');
    }, [])

    return (
        <UsuarioLoggedContext.Provider value={{nomeUsuario: nome, logout: handleLogout}}>
            {children}
        </UsuarioLoggedContext.Provider>
    );
}