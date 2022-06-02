import { createContext, ReactNode, useCallback, useContext, useState } from "react";


interface IDrawerContextData {
    drawerOpen: boolean;
    toggleDrawer: () => void;
}

export const AppDrawerContext = createContext({} as IDrawerContextData);

interface IDrawerProviderProps {
    children: ReactNode
}

export const useAppDrawerContext = () => {
    return useContext(AppDrawerContext);
}

export const AppDrawerProvider = ({ children }: IDrawerProviderProps) => {
    const [drawerOpen, setDrawer] = useState(false);

    const toggleDrawer = useCallback(() => {
        setDrawer(oldDrawer => !oldDrawer);
    }, []);


    return (
        <AppDrawerContext.Provider value={{drawerOpen, toggleDrawer}}>
            {children}
        </AppDrawerContext.Provider>
    )
}