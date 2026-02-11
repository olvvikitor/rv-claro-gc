import api from "../../../service/api"

export interface LoginDto {
    email: string,
    password: string
}
export async function requestLogin(payload: LoginDto) {
    const response = await api.get('/users', {
        params: {email:payload.email}
    })

    const user = await response.data[0];

    if (!user) {
        throw new Error("Usuário não encontrado");
    }

    if (user.password !== payload.password) {
        throw new Error("Senha inválida");
    }

    return user;
}