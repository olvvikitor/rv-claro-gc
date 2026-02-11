import api from "../../../service/api"

export interface LoginDto {
    site:string,
    login: string,
    senha: string
}
export async function requestLogin(payload: LoginDto) {
    const response = await api.post('/auth/login', payload)
    return response
}