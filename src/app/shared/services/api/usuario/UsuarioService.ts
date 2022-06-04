import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

export interface IUsuarioLogin {
    username: string,
    password: string
}

const encryptPassword = (password: string) => {
    const bcrypt = require('bcryptjs');

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash;
}

const getAll = async (): Promise<IUsuarioLogin[] | ApiException> => {

    try {
        const { data } = await Api.get('/usuarios');

        return data;
    } catch (error: any) {
        return new ApiException(error?.message || "Erro ao consultar a API");
    }
};

const getById = async (id: number): Promise<IUsuarioLogin | ApiException> => {

    try {
        const { data } = await Api.get(`/usuarios/${id}`);

        return data;
    } catch (error: any) {
        return new ApiException(error?.message || "Erro ao consultar o Registro");
    }
};

const getByUsername = async (username: string): Promise<IUsuarioLogin[] | ApiException> => {

    try {

        const { data } = await Api.get(`/usuarios?username=${username}`);

        return data;
    } catch (error: any) {
        return new ApiException(error?.message || "Erro ao consultar o Registro");
    }
};

const create = async (dataToCreate: IUsuarioLogin): Promise<IUsuarioLogin | ApiException> => {

    try {
        const password = await encryptPassword(dataToCreate.password);
        dataToCreate.password = password;
        console.log(dataToCreate)
        console.log(password);

        const { data } = await Api.post<IUsuarioLogin>(`/usuarios`, dataToCreate);

        return data;
    } catch (error: any) {
        return new ApiException(error?.message || "Erro ao criar o Registro");
    }
};

const update = async (id: number, dataToUpdate: IUsuarioLogin): Promise<IUsuarioLogin | ApiException> => {

    try {
        dataToUpdate.password = encryptPassword(dataToUpdate.password);

        const { data } = await Api.put<IUsuarioLogin>(`/usuarios/${id}`, dataToUpdate);

        return data;
    } catch (error: any) {
        return new ApiException(error?.message || "Erro ao atualizar o Registro");
    }
};

const deleteById = async (id: number): Promise<undefined | ApiException> => {

    try {
        await Api.delete(`/usuarios/${id}`);

        return undefined;
    } catch (error: any) {
        return new ApiException(error?.message || "Erro ao deletar o Registro");
    }
};

export const UsuarioService = {
    getAll,
    create,
    getById,
    getByUsername,
    update,
    deleteById
};