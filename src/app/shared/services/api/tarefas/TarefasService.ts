import { API } from "../ApiConfig";
import { ApiException } from "../ApiException";

export interface ITarefa {
    id?: number,
    title: string;
    isCompleted: boolean;
}

const getAll = async (): Promise<ITarefa[] | ApiException> => {
    
    try {
        const { data } = await API().get('/tarefas');

        return data;
    } catch (error: any) {
        return new ApiException(error?.message || "Erro ao consultar a API");
    }
};

const getById = async (id:number): Promise<ITarefa | ApiException> => {
    
    try {
        const { data } = await API().get(`/tarefas/${id}`);

        return data;
    } catch (error: any) {
        return new ApiException(error?.message || "Erro ao consultar o Registro");
    }
};

const create = async (dataToCreate:ITarefa): Promise<ITarefa | ApiException> => {
    
    try {
        const { data } = await API().post<ITarefa>(`/tarefas`, dataToCreate);

        return data;
    } catch (error: any) {
        return new ApiException(error?.message || "Erro ao criar o Registro");
    }
};

const update = async (id:number, dataToUpdate:ITarefa): Promise<ITarefa | ApiException> => {
    
    try {
        const { data } = await API().put<ITarefa>(`/tarefas/${id}`, dataToUpdate);

        return data;
    } catch (error: any) {
        return new ApiException(error?.message || "Erro ao atualizar o Registro");
    }
};

const deleteById = async (id:number): Promise<undefined | ApiException> => {
    
    try {
        await API().delete(`/tarefas/${id}`);

        return undefined;
    } catch (error: any) {
        return new ApiException(error?.message || "Erro ao deletar o Registro");
    }
};

export const TarefasService = {
    getAll,
    create,
    getById,
    update,
    deleteById
};