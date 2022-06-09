import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDialogConfirmAppContext, useSnackbarAppContext } from "../../shared/context";
import { useDobounce } from "../../shared/hooks";
import { CidadesService, ICidadeData } from "../../shared/services";


export const useListagemCidades = () => {
    
    const navigate = useNavigate();
    const { debounce } = useDobounce();
    const { showMsg } = useSnackbarAppContext();
    const { handleOpenDialog } = useDialogConfirmAppContext();


    const [selectedItem, setSelectedItem] = useState({} as ICidadeData)

    const [rows, setRows] = useState<ICidadeData[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [limitPage, setLimitPage] = useState(5);

    
    //Busca e troca de pagina usando SearchParams
    const [searchParams, setSearchParams] = useSearchParams();
    
    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);
    
    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    const handleSearchInput = useCallback((newValue: string) => {
        setSearchParams({ busca: newValue }, { replace: true })
    }, [busca])

    const handleChangePage = (event: unknown, newPage: number) => {
        setSearchParams({ busca, pagina: String(newPage + 1) }, { replace: true })
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLimitPage(parseInt(event.target.value));
        setSearchParams({ busca, pagina: '1' }, { replace: true })
    };
    
    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
        setLoading(true);

        debounce(() => {
            CidadesService.getAll(pagina, limitPage, busca)
                .then((result) => {
                    setLoading(false);

                    if (result instanceof Error) {
                        showMsg(result.message, true);
                        return;
                    }

                    setRows(result.data);
                    setTotalCount(result.totalCount);
                })
        })
    }, [pagina, limitPage, busca])

    const handleNovo = useCallback(() => {
        navigate(`/cidades/detalhe`);
    }, [])

    const handleUpdate = useCallback((id: number) => {
        navigate(`/cidades/detalhe/${id}`)
    }, [])

    const handleConfirmDelete = useCallback((selectedItem: ICidadeData) => {
        setSelectedItem(selectedItem);
        handleOpenDialog(selectedItem.id);
    }, [selectedItem])

    const handleDelete = useCallback((id: number) => {
        CidadesService.deleteById(id)
            .then((result) => {
                if (result instanceof Error) {
                    showMsg(result.message, true)
                } else {
                    showMsg("Cidade apagada com sucesso!");
                    setRows(oldRows => oldRows.filter(p => p.id !== id))
                }
            })
    }, [])

    return {
        busca,
        handleSearchInput,

        selectedItem,

        handleNovo,
        handleUpdate,
        handleDelete,
        handleConfirmDelete,
        
        isLoading,

        rows,
        pagina,
        limitPage,
        totalCount,
        handleChangePage,
        handleChangeRowsPerPage,

    }
}