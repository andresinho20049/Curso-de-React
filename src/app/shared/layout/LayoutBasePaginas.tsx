import { ReactNode } from "react";
import { Icon, IconButton, Typography, useTheme, useMediaQuery } from "@mui/material";

import { BarraFerramentasContainer, ContentContainer, LayoutContainer, TitleContainer } from "../components";
import { useAppDrawerContext } from "../context";

interface ILayoutBasePaginasProps {
    titulo: string
    barraFerramentas?: ReactNode
    children: ReactNode
}

export const LayoutBasePaginas = ({ titulo, children, barraFerramentas }: ILayoutBasePaginasProps) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    const { toggleDrawer } = useAppDrawerContext();

    return (
        <LayoutContainer>
            <TitleContainer>

                {smDown && (
                    <IconButton onClick={toggleDrawer}>
                        <Icon>
                            menu
                        </Icon>
                    </IconButton>
                )}

                <Typography 
                    variant={smDown ? "h5" : mdDown ? "h4" : "h3" }
                    whiteSpace="nowrap" 
                    overflow="hidden" 
                    textOverflow="ellipsis"
                >
                    
                    {titulo}
                </Typography>
            </TitleContainer>

            {barraFerramentas &&
                (<BarraFerramentasContainer>
                    {barraFerramentas}
                </BarraFerramentasContainer>)}

            <ContentContainer>
                {children}
            </ContentContainer>

        </LayoutContainer>
    );
}
