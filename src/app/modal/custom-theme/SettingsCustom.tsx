import { Box, Divider, FormControl, FormControlLabel, FormGroup, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Switch, TextField, Typography } from "@mui/material"
import { useState } from "react";


export const SettingCustom = () => {
    const [age, setAge] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };

    const [primaryColor, setPrimaryColor] = useState('');

    const handleChangePrimaryColor = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrimaryColor(event.target.value);
    };

    const [themeMode, setThemeMode] = useState(true);

    const handleThemeMode = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThemeMode(event.target.checked);
    };


    return (
        <Box
            flexDirection={'column'}
            display={'flex'}
            gap={3}
        >
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={themeMode}
                            onChange={handleThemeMode}
                            color={"secondary"}
                        />}
                    label={themeMode ? 'Dark' : 'Light'} />
            </FormGroup>

            <Divider />

            <FormControl variant="standard" fullWidth>
                <InputLabel id="select-font-family">Font Family</InputLabel>
                <Select
                    labelId="select-font-family"
                    id="demo-simple-select-standard"
                    value={age}
                    onChange={handleChange}
                    label="Font Family"
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        type={'color'}
                        label={'Primary Color'}
                        size={'small'}
                        fullWidth
                        value={primaryColor}
                        onChange={handleChangePrimaryColor}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type={'color'}
                        label={'Secundary Color'}
                        size={'small'}
                        fullWidth
                        value={primaryColor}
                        onChange={handleChangePrimaryColor}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type={'color'}
                        label={'Error Color'}
                        size={'small'}
                        fullWidth
                        value={primaryColor}
                        onChange={handleChangePrimaryColor}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type={'color'}
                        label={'Warning Color'}
                        size={'small'}
                        fullWidth
                        value={primaryColor}
                        onChange={handleChangePrimaryColor}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type={'color'}
                        label={'Sucess Color'}
                        size={'small'}
                        fullWidth
                        value={primaryColor}
                        onChange={handleChangePrimaryColor}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type={'color'}
                        label={'Info Color'}
                        size={'small'}
                        fullWidth
                        value={primaryColor}
                        onChange={handleChangePrimaryColor}
                    />
                </Grid>

                <Grid item xs={6}>
                        <></>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type={'color'}
                        label={'Info Color'}
                        size={'small'}
                        fullWidth
                        value={primaryColor}
                        onChange={handleChangePrimaryColor}
                    />
                </Grid>
            </Grid>


        </Box>
    )
}