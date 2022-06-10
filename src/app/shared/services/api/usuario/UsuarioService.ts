import { Api } from "../ApiConfig";

const bcrypt = require('bcryptjs');

export interface IUsuarioLogin {
    id: number;
    username: string,
    password: string
}

const encryptPassword = (password: string) => {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
}

const auth = async (login: Omit<IUsuarioLogin, 'id'>): Promise<Boolean> => {
    
    const result = await getByUsername(login.username);

    if(result instanceof Error || result.length === 0) return false;

    const user = result[0];
    
    return bcrypt.compareSync(login.password, user.password);
}

const getAll = async (): Promise<IUsuarioLogin[] | Error> => {

    try {
        const { data } = await Api.get('/usuarios');

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar a API");
    }
};

const getById = async (id: number): Promise<IUsuarioLogin | Error> => {

    try {
        const { data } = await Api.get(`/usuarios/${id}`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar o Registro");
    }
};

const getByUsername = async (username: string): Promise<IUsuarioLogin[] | Error> => {

    try {

        const { data } = await Api.get(`/usuarios?username=${username}`);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao consultar o Registro");
    }
};

const create = async (dataToCreate: Omit<IUsuarioLogin, 'id'>): Promise<IUsuarioLogin | Error> => {

    try {
        const password = await encryptPassword(dataToCreate.password);
        dataToCreate.password = password;

        const { data } = await Api.post<IUsuarioLogin>(`/usuarios`, dataToCreate);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao criar o Registro");
    }
};

const update = async (dataToUpdate: IUsuarioLogin): Promise<IUsuarioLogin | Error> => {

    try {
        dataToUpdate.password = encryptPassword(dataToUpdate.password);

        const { data } = await Api.put<IUsuarioLogin>(`/usuarios/${dataToUpdate.id}`, dataToUpdate);

        return data;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao atualizar o Registro");
    }
};

const deleteById = async (id: number): Promise<undefined | Error> => {

    try {
        await Api.delete(`/usuarios/${id}`);

        return undefined;
    } catch (error: any) {
        return new Error(error?.message || "Erro ao deletar o Registro");
    }
};

export const UsuarioService = {
    auth,
    getAll,
    create,
    getById,
    getByUsername,
    update,
    deleteById
};