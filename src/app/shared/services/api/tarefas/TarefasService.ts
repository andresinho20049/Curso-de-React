import { Api } from "../ApiConfig";

export interface ITarefa {
    id?: number,
    title: string;
    isCompleted: boolean;
}

const getAll = async (): Promise<ITarefa[] | Error> => {
    
    try {
        const { data } = await Api.get('/tarefas');

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar a Api");
    }
};

const getById = async (id:number): Promise<ITarefa | Error> => {
    
    try {
        const { data } = await Api.get(`/tarefas/${id}`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar o Registro");
    }
};

const create = async (dataToCreate:ITarefa): Promise<ITarefa | Error> => {
    
    try {
        const { data } = await Api.post<ITarefa>(`/tarefas`, dataToCreate);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao criar o Registro");
    }
};

const update = async (id:number, dataToUpdate:ITarefa): Promise<ITarefa | Error> => {
    
    try {
        const { data } = await Api.put<ITarefa>(`/tarefas/${id}`, dataToUpdate);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao atualizar o Registro");
    }
};

const deleteById = async (id:number): Promise<undefined | Error> => {
    
    try {
        await Api.delete(`/tarefas/${id}`);

        return;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao deletar o Registro");
    }
};

export const TarefasService = {
    getAll,
    create,
    getById,
    update,
    deleteById
};