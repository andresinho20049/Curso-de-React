
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDialogConfirmAppContext } from "../../shared/context";
import { useSnackbarAppContext } from "../../shared/context/SnackbarAppContext";
import { useDobounce } from "../../shared/hooks";
import { IListPessoa, PessoasService } from "../../shared/services";


interface ISelectedItemData {
    id: number;
    nome: string;
}

export const useListagemPessoas = () => {
    const navigate = useNavigate();
    const { debounce } = useDobounce();
    const { showMsg } = useSnackbarAppContext();
    const { handleOpenDialog } = useDialogConfirmAppContext();
    
    const [selectedItem, setSelectedItem] = useState({} as ISelectedItemData);
    
    
    const [limitPage, setLimitPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const [rows, setRows] = useState<IListPessoa[]>([]);

    
    // Busca e pagina no SearchParams
    const [searchParams, setSearchParams] = useSearchParams();

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);
    
    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina') || '1');
    }, [searchParams]);

    const handleSearchInput = useCallback((newValue: string) => {
        setSearchParams({ busca: newValue }, { replace: true });
    }, [busca])
    
    const handleChangePage = (event: unknown, newPage: number) => {
        console.log('ChangePage', newPage)
        console.log(event)
        setSearchParams({ busca, pagina: String(newPage + 1) }, { replace: true })
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log('handle Change Rows PerPage')
        setLimitPage(parseInt(event.target.value));
        setSearchParams({ busca, pagina: '1' }, { replace: true })
    };

    
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        debounce(() => {
            PessoasService.getAll(pagina, limitPage, busca)
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
        navigate(`/pessoas/detalhe`);
    }, [])

    const handleUpdate = useCallback((id:number) => {
        navigate(`/pessoas/detalhe/${id}`)
    }, [])

    const handleConfirmDelete = useCallback((selectedItem: ISelectedItemData) => {
        setSelectedItem(selectedItem);
        handleOpenDialog(selectedItem.id);
    }, [selectedItem])

    const handleDelete = useCallback((id: number) => {
        PessoasService.deleteById(id)
            .then((result) => {
                if (result instanceof Error) {
                    showMsg(result.message, true)
                } else {
                    showMsg("Pessoa apagada com sucesso!");
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