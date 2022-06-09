import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useField } from "@unform/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDobounce } from "../../hooks";

interface IVAutocompleteProps {
    name: string;
    label: string;
    isExtLoading?: boolean;

    options: any[];
    setOptions: (list: any[]) => void

    selected: any | null;
    setSelected: (item: any | null) => void;

    getLabel: (optItem: any) => string;
    findValues: (busca: string) => Promise<any[]>;
}

export const VAutocomplete = ({
    name,
    label,

    selected,
    setSelected,

    options,
    setOptions,

    getLabel,
    findValues,
    isExtLoading = false }: IVAutocompleteProps) => {

    const { fieldName, registerField, defaultValue, error, clearError } = useField(name);

    const { debounce } = useDobounce();
    const [isLoading, setLoading] = useState(true);

    const [busca, setBusca] = useState(getLabel(defaultValue));

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selected,
            setValue: (_, newValue) => setSelected(newValue)
        })
    }, [registerField, fieldName, selected])

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

    const checkValue = useCallback((opt: any, value: any) => {
        if(opt?.id)
            return opt?.id === value?.id

        return opt === value
    }, [])

    return (
        <Autocomplete
            openText="Abrir"
            closeText="Fechar"
            noOptionsText="Nenhuma opção"
            loadingText="Carregando..."
            disablePortal
            value={selected}
            options={options}
            loading={isLoading}
            disabled={isExtLoading}
            inputValue={defaultValue}
            filterSelectedOptions={false}
            isOptionEqualToValue={(opt, value) => checkValue(opt, value)}
            getOptionLabel={(opt) => getLabel(opt)}
            onInputChange={(_, newValue) => setBusca(newValue)}
            onChange={(_, newValue) => { setSelected(newValue); clearError() }}
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