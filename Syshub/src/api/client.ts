import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/syshub'
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    const isAuthRoute = config.url?.includes('/auth/login') ||
    config.url?.includes('/auth/registro')

    if (token && !isAuthRoute) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default api