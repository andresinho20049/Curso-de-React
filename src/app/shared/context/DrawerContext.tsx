import { createContext, ReactNode, useCallback, useContext, useState } from "react";

interface IDrawerOptions {
    icon: string;
    path: string;
    label: string;
}

interface IDrawerContextData {
    drawerOpen: boolean;
    toggleDrawer: () => void;
    drawerOptions: IDrawerOptions[]
    setDrawerOption: (newDrawerOptions: IDrawerOptions[]) => void
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
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);

    const toggleDrawer = useCallback(() => {
        setDrawer(oldDrawer => !oldDrawer);
    }, []);
    
    const handleDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[]) => {
        setDrawerOptions(newDrawerOptions);
    }, []);

    return (
        <AppDrawerContext.Provider value={{drawerOpen, toggleDrawer, drawerOptions, setDrawerOption: handleDrawerOptions}}>
            {children}
        </AppDrawerContext.Provider>
    )
}