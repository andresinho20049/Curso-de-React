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