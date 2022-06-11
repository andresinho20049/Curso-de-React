import { Alert, Box, Divider, Grid, Link, Stack, Typography } from "@mui/material";
import { SpeedDialPreview } from "./SpeendDialPreview";

interface alert {
    severity: "success" | "error" | "warning" | "info";
}

export const PreviewComponents = () => {

    const listAlerts: alert[] = [{ severity: "success" }, { severity: "error" }, { severity: "warning" }, { severity: "info" }]

    return (
        <Box>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography>Links - Examplo</Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Link href="#" underline="none">
                        {'underline="none"'}
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Link href="#" underline="hover">
                        {'underline="hover"'}
                    </Link>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Link href="#" underline="always">
                        {'underline="always"'}
                    </Link>
                </Grid>


                <Grid item xs={12}>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Typography>Alerts - Examplo</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Stack sx={{ width: '100%' }} spacing={1}>
                        {listAlerts.map(alert => (
                            <Alert variant="outlined" severity={alert.severity}>
                                This is an {alert.severity} alert — check it out!
                            </Alert>
                        ))}
                        {listAlerts.map(alert => (
                            <Alert variant="filled" severity={alert.severity}>
                                This is an {alert.severity} alert — check it out!
                            </Alert>
                        ))}
                        {listAlerts.map(alert => (
                            <Alert variant="standard" severity={alert.severity}>
                                This is an {alert.severity} alert — check it out!
                            </Alert>
                        ))}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <SpeedDialPreview />
                </Grid>
            </Grid>
        </Box>
    )
}