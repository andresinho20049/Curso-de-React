import { Api } from "../ApiConfig";

export interface ICidadeData {
    id: number;
    nome: string
}

export interface IListCidadePaginado {
    data: ICidadeData[];
    totalCount: number;
}

const getAll = async (page = 1, limit = 5, filter = ''): Promise<IListCidadePaginado | Error> => {

    try {

        const path = `/cidades?_page=${page}&_limit=${limit}&nome_like=${filter}`;
        const { data, headers } = await Api.get(path);

        if (data) {
            return {
                data,
                totalCount: Number(headers["x-total-count"]) || 0
            }
        }

        return new Error("Erro ao fazer consulta de cidades");

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao fazer consulta de cidades");
    }
};

const getById = async (id: number): Promise<ICidadeData | Error> => {

    try {

        const path = `/cidades/${id}`;
        const { data } = await Api.get(path);

        if (data)
            return data;


        return new Error(`Erro ao fazer consulta do cidade id: ${id}`);

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || `Erro ao fazer consulta do cidade id: ${id}`);
    }
};

const create = async (body: Omit<ICidadeData, 'id'>): Promise<Number | Error> => {

    try {

        const path = `/cidades`;
        const { data } = await Api.post<ICidadeData>(path, body);

        if (data)
            return data.id;


        return new Error(`Erro ao tentar cadastrar cidade`);

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || `Erro ao tentar cadastrar cidade`);
    }
};

const update = async (body: ICidadeData): Promise<ICidadeData | Error> => {

    try {

        const path = `/cidades/${body.id}`;
        const { data } = await Api.put(path, body);

        if (data)
            return data;


        return new Error(`Erro ao tentar atualizar cidade`);

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || `Erro ao tentar atualizar cidade`);
    }
};


const deleteById = async (id: number): Promise<undefined | Error> => {

    try {

        const path = `/cidades/${id}`;
        const { data } = await Api.delete(path)

        if (data)
            return;


        return new Error(`Erro ao tentar deletar cidade id: ${id}`);

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || `Erro ao tentar deletar cidade id: ${id}`);
    }
};


export const CidadesService = {
    getAll,
    getById,
    create,
    update,
    deleteById
}