import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDobounce } from "../../hooks";
import { useField } from "@unform/core";


export interface IAutocompleteOptions {
    id: number;
    label: string;
}

interface IVAutocompleteProps {
    name: string;
    label: string;
    isExtLoading?: boolean;
    findValues: (busca: string) => Promise<IAutocompleteOptions[]>
}

export const VAutocomplete = ({
    name,
    label,
    findValues,
    isExtLoading = false}: IVAutocompleteProps) => {

    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

    const [selectedId, setSelectedId] = useState<number | null>(defaultValue);

    const { debounce } = useDobounce();
    const [isLoading, setLoading] = useState(true);

    const [options, setOptions] = useState<IAutocompleteOptions[]>([]);
    const [busca, setBusca] = useState('');

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newValue) => setSelectedId(newValue)
        })
    }, [registerField, fieldName, selectedId])

    useEffect(() => {
        setLoading(true);
        debounce(() => {
            findValues(busca)
                .then((result) => {
                    setOptions(result);
                    setLoading(false);
                })
        })
    }, [busca])

    const autoCompleteSelectedOption = useMemo(() => {
        if (!selectedId) return null;

        const selectedOpt = options.find(opt => opt.id === selectedId);
        return selectedOpt ?? null;
    }, [selectedId, options])

    return (
        <Autocomplete
            openText="Abrir"
            closeText="Fechar"
            noOptionsText="Nenhuma opção"
            loadingText="Carregando..."
            disablePortal
            options={options}
            loading={isLoading}
            disabled={isExtLoading}
            value={autoCompleteSelectedOption}
            onInputChange={(_, newValue) => setBusca(newValue)}
            onChange={(_, newValue) => { setSelectedId(newValue?.id ?? null); setBusca(''); clearError() }}
            popupIcon={isExtLoading || isLoading ? <CircularProgress size={22} /> : undefined}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    label={label}
                    error={!!error}
                    helperText={error}
                />
            )}
        />
    )
}