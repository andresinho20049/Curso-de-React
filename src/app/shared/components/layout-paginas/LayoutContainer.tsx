import { styled } from '@mui/material';

export const LayoutContainer = styled('div')`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: ${({ theme }) => theme.spacing(1)};
`

export const TitleContainer = styled('div')`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing(1)};
    padding: ${({ theme }) => theme.spacing(1)};
    height: ${({ theme }) => theme.spacing(12)};

    ${({ theme }) => theme.breakpoints.down('md')} {
        height: ${({ theme }) => theme.spacing(8)};
    }

    ${({ theme }) => theme.breakpoints.down('sm')} {
        height: ${({ theme }) => theme.spacing(6)};
    }
`

export const BarraFerramentasContainer = styled('div')`
    display: flex;
    gap: ${({theme}) => theme.spacing(1)};
    align-items: center;
    margin: ${({theme}) => theme.spacing(0)} ${({theme}) => theme.spacing(1)};
    padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
    box-shadow: ${({theme}) => theme.shadows[4]};
    border-radius: ${({theme}) => theme.spacing(1)};
    background-color: ${({ theme }) => theme.palette.background.paper};
    height: ${({theme}) => theme.spacing(5)};
`

export const ContentContainer = styled('div')`
    flex: 1;
    overflow: auto;
`

export const ItemListaStyled = styled('li')`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing(5)};
    margin-bottom: ${({ theme }) => theme.spacing(5)};
    
    ${({ theme }) => theme.breakpoints.down('md')} {
        grid-template-columns: 1fr;
        gap: ${({ theme }) => theme.spacing(2)};
        margin-bottom: ${({ theme }) => theme.spacing(10)};
    }
`