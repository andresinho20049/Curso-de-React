import { Slide, SlideProps } from "@mui/material";
import { createContext, ReactNode, useCallback, useContext, useState } from "react";


interface ISnackbarAppContextData {
    msgOpen: boolean;
    msg: string | null;
    isMsgError: boolean;
    transition: React.ComponentType<SlideProps> | undefined;

    showMsg: (msg: string, isMsgError?: boolean) => void;
    closeMsg: () => void
}

export const SnackbarAppContext = createContext({} as ISnackbarAppContextData);

interface ISnackbarAppProviderProps {
    children: ReactNode
}

export const useSnackbarAppContext = () => {
    return useContext(SnackbarAppContext);
}

type TransitionProps = Omit<SlideProps, 'direction'>;

export const SnackbarAppProvider = ({ children }: ISnackbarAppProviderProps) => {

    const [snackMsg, setSnackMsg] = useState<string | null>(null);
    const [isMsgError, setIsMsgError] = useState(false);
    const [transition, setTransition] = useState<
        React.ComponentType<TransitionProps> | undefined
    >(undefined);

    const slideUp = (props: TransitionProps) => {
        return <Slide direction="up" {...props} />
    }

    const showMsg = useCallback((msg: string, isError = false) => {

        setIsMsgError(isError);
        setTransition(() => slideUp)
        setSnackMsg(msg);
        
    }, [snackMsg])

    const closeMsg = useCallback(() => {
        setSnackMsg(null);
    }, [snackMsg])


    return (
        <SnackbarAppContext.Provider value={{ msgOpen: !!snackMsg, isMsgError: isMsgError, msg: snackMsg, showMsg, closeMsg, transition }}>
            {children}
        </SnackbarAppContext.Provider>
    )
}