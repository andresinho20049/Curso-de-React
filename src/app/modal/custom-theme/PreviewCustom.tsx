import { Box, Tab, Tabs, Typography } from "@mui/material"
import { useState } from "react"
import { PreviewComponents } from "./preview-components/PreviewComponents";
import { SpeedDialPreview } from "./preview-components/SpeendDialPreview";

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

const TabPanel = ({
    value,
    index,
    children
}: TabPanelProps) => {

    return (
        <Box
            role="tabpanel"
            hidden={value != index}
            sx={{bgcolor: 'background.default'}}
        >
            {value === index && (
                <Box sx={{ p: 2}}>
                    {children}
                </Box>
            )}

        </Box>
    )

}

export const PreviewCustom = () => {

    const [tabVal, setTabVal] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabVal(newValue);
    };

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tabVal}
                    variant="fullWidth"
                    onChange={handleChange}
                >
                    <Tab label="Preview" />
                    <Tab label="Components" />
                    <Tab label="Layout" />
                </Tabs>
            </Box>
            <TabPanel value={tabVal} index={0}>
                <Box sx={{height: '100%', minHeight: 300, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography>Em Desenvolvimento</Typography>
                </Box>
            </TabPanel>
            <TabPanel value={tabVal} index={1}>
                <PreviewComponents />
            </TabPanel>
            <TabPanel value={tabVal} index={2}>
                <Box sx={{height: '100%', minHeight: 300, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography>Em Desenvolvimento</Typography>
                </Box>
            </TabPanel>
        </Box>
    )
}