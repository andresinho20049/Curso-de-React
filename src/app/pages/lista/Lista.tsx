import { useCallback, useEffect, useState } from "react";
import { ApiException } from "../../shared/services/api/ApiException";
import { ITarefa, TarefasService } from "../../shared/services/api/tarefas/TarefasService";



export const Lista = () => {
    const [lista, setLista] = useState<ITarefa[]>([]);

    useEffect(() => {
        TarefasService.getAll()
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setLista(result);
                }
            })
    }, [])

    const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {
            if (e.currentTarget.value.trim().length === 0) return;

            const value = e.currentTarget.value;
            e.currentTarget.value = '';

            if (lista.some((item) => item.title === value)) return;

            TarefasService.create({
                title: value,
                isCompleted: false
            }).then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setLista((oldLista) => {

                        return [...oldLista, result];
                    })
                }
            });
        }
    }, [lista]);

    const handleChangeSelected = useCallback((item: ITarefa) => {

        const id = item.id;
        if (!item || !id) return;

        item.isCompleted = !item.isCompleted;

        TarefasService.update(id, item)
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setLista((oldLista) => {
                        return oldLista.map(item => {
                            if (item.id === result.id) return result;

                            return item;
                        });
                    });
                }
            });

    }, []);

    const handleDelete = useCallback((id: number) => {

        TarefasService.deleteById(id)
            .then((result) => {
                if (result instanceof ApiException) {
                    alert(result.message);
                } else {
                    setLista((oldLista) => {
                        return oldLista.filter(item => {

                            return item.id !== id;
                        });
                    });
                }
            });

    }, []);

    return (
        <>
            <p>Lista</p>

            <input
                type="text"
                onKeyDown={handleInputKeyDown}
            />

            <p>{lista.filter((item) => item.isCompleted).length}</p>

            <ul>
                {lista.map((item: ITarefa, index: number, array: ITarefa[]) => {
                    return (
                        <li key={item.id}>
                            <input
                                type="checkbox"
                                checked={item.isCompleted}
                                onChange={() => handleChangeSelected(item)}
                            />
                            {item.title}
                            <button onClick={() => handleDelete(item.id ?? 0)}>Apagar</button>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}