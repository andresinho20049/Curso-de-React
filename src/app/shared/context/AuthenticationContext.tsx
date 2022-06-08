import { createContext, ReactNode, useCallback, useContext, useMemo } from "react";
import { useStorage } from "../hooks";
import { IUsuarioLogin, UsuarioService } from "../services";

interface IAuthenticationData {
    isAuthenticated: boolean;
    login: (login: IUsuarioLogin) => Promise<string | void>;
    logout: () => void;

}

export const AuthenticationContext = createContext({} as IAuthenticationData);

export const useContextAuthentication = () => {
    return useContext(AuthenticationContext);
}

interface IAuthenticationProviderProps {
    children: ReactNode
}

export const AuthenticationProvider = ({ children} : IAuthenticationProviderProps) => {
    const [token, setToken] = useStorage(null);

    const handleLogin = useCallback(async (login: IUsuarioLogin) => {
        
        const isValid = await UsuarioService.auth(login);
        if(isValid)
            setToken('logado')

    }, [])

    const handleLogout = useCallback(() => {
        setToken(null);
    }, [])

    const isAuthenticated = useMemo(() => {
        return !!token;
    }, [token])

    return (
        <AuthenticationContext.Provider value={{isAuthenticated, login: handleLogin, logout: handleLogout}}>
            {children}
        </AuthenticationContext.Provider>
    )
}