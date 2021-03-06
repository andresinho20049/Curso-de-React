import { Api } from "../ApiConfig";
import { ICidadeData } from "../cidades/CidadesService";

export interface IListPessoa {
    id: number;
    email: string;
    cidade: ICidadeData;
    nomeCompleto: string;
}

export interface IDetalhePessoa {
    id: number;
    email: string;
    cidade: ICidadeData;
    nomeCompleto: string;
}

export interface IListPessoaPaginado {
    data: IListPessoa[];
    totalCount: number;
}

const getAll = async (page = 1, limit = 5, filter = ''): Promise<IListPessoaPaginado | Error> => {

    try {

        const path = `/pessoas?_page=${page}&_limit=${limit}&nomeCompleto_like=${filter}`;
        const { data, headers } = await Api.get(path);

        if (data) {
            return {
                data,
                totalCount: Number(headers["x-total-count"]) || 0
            }
        }

        return new Error("Erro ao fazer consulta de usuários");

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao fazer consulta de usuários");
    }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {

    try {

        const path = `/pessoas/${id}`;
        const { data } = await Api.get(path);

        if (data)
            return data;


        return new Error(`Erro ao fazer consulta do usuário id: ${id}`);

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || `Erro ao fazer consulta do usuário id: ${id}`);
    }
};

const create = async (body: Omit<IDetalhePessoa, 'id'>): Promise<Number | Error> => {

    try {

        const path = `/pessoas`;
        const { data } = await Api.post<IDetalhePessoa>(path, body);

        if (data)
            return data.id;


        return new Error(`Erro ao tentar cadastrar usuário`);

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || `Erro ao tentar cadastrar usuário`);
    }
};

const update = async (body: IDetalhePessoa): Promise<IDetalhePessoa | Error> => {

    try {

        const path = `/pessoas/${body.id}`;
        const { data } = await Api.put(path, body);

        if (data)
            return data;


        return new Error(`Erro ao tentar atualizar usuário`);

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || `Erro ao tentar atualizar usuário`);
    }
};


const deleteById = async (id: number): Promise<undefined | Error> => {

    try {

        const path = `/pessoas/${id}`;
        const { data } = await Api.delete(path)

        if (data)
            return;


        return new Error(`Erro ao tentar deletar usuário id: ${id}`);

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || `Erro ao tentar deletar usuário id: ${id}`);
    }
};


export const PessoasService = {
    getAll,
    getById,
    create,
    update,
    deleteById
}