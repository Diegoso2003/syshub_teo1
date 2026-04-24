import api from '../api/client'

export const login = async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password })

    localStorage.setItem('token', data.token)
    return data
}

export const registro = async (usuario: any) => {
    return api.post('/auth/registro', usuario)
}

export const logout = () => {
    localStorage.removeItem('token')
}