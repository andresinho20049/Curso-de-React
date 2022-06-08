import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
import { useSnackbarAppContext } from "../../context/SnackbarAppContext";


export const SnackbarApp = () => {

    const { msgOpen, msg, isMsgError, closeMsg, transition } = useSnackbarAppContext();

    return (
        <Snackbar
            open={msgOpen}
            TransitionComponent={transition}
            autoHideDuration={2500}
            onClose={closeMsg}
        >
            <Alert onClose={closeMsg} severity={isMsgError ? "error" : "success"} sx={{ width: '100%' }}>
                {msg}
            </Alert>
        </Snackbar>
    )
}