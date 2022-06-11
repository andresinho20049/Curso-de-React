
export interface IPaletteElementData {
    path: string;
    label: string; 
    enabled: boolean;
}

export interface IPaletteData {
    title: string;
    listElement: IPaletteElementData[];
}

export const getListPalette = ():IPaletteData[] => {

    return [
        {
            title: 'Background',
            listElement: [
                {label: 'Default', path: 'background.default', enabled: true},
                {label: 'Paper', path: 'background.paper', enabled: true}
            ]
        },
        {
            title: 'Primária',
            listElement: [
                {label: 'Main', path: 'primary.main', enabled: true},
                {label: 'Contrast Texto', path: 'primary.contrastText', enabled: false}
            ]
        },
        {
            title: 'Secundária',
            listElement: [
                {label: 'Main', path: 'secondary.main', enabled: true},
                {label: 'Contrast Texto', path: 'secondary.contrastText', enabled: true}
            ]
        },
        {
            title: 'Error',
            listElement: [
                {label: 'Main', path: 'error.main', enabled: true}
            ]
        },
        {
            title: 'Warning',
            listElement: [
                {label: 'Main', path: 'warning.main', enabled: true}
            ]
        },
        {
            title: 'Info',
            listElement: [
                {label: 'Main', path: 'info.main', enabled: true}
            ]
        },
        {
            title: 'Sucesso',
            listElement: [
                {label: 'Main', path: 'success.main', enabled: true}
            ]
        }
    ];
}