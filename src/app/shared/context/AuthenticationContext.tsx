import { createContext, ReactNode, useCallback, useContext, useMemo } from "react";
import usePersistedState from "../hooks/UsePersistedState";
import { IUsuarioLogin, UsuarioService } from "../services";

interface IAuthenticationData {
    isAuthenticated: boolean;
    login: (login: Omit<IUsuarioLogin, 'id'>) => Promise<string | void>;
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
    const [token, setToken] = usePersistedState<string | null>('auth', null);

    const handleLogin = useCallback(async (login: Omit<IUsuarioLogin, 'id'>) => {
        
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