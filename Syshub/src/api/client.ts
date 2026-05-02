import axios from 'axios'
import router from '../router'

const api = axios.create({
    baseURL: 'http://localhost:3000/syshub',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'  // ← Asegurar Content-Type
    }
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

let isRedirecting = false;

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const isLoginPage = window.location.pathname.includes('/login');
            
            if (!isLoginPage && !isRedirecting) {
                isRedirecting = true;
                
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                
                router.push('/login').finally(() => {
                    isRedirecting = false;
                });
            }
            
            const authError = new Error('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
            (authError as any).statusCode = 401;
            return Promise.reject(authError);
        }
        
        if (error.response?.status === 400) {
            if (error.response?.data) {
                const { message } = error.response.data;
                let userMessage = '';
                
                if (Array.isArray(message)) {
                    userMessage = message.join(', ');
                } else if (typeof message === 'string') {
                    userMessage = message;
                } else {
                    userMessage = 'Error en la solicitud';
                }
                
                const badRequestError = new Error(userMessage);
                (badRequestError as any).statusCode = 400;
                return Promise.reject(badRequestError);
            }
        }
        
        if (error.response?.status === 403) {
            const forbiddenError = new Error('No tienes permisos para realizar esta acción');
            (forbiddenError as any).statusCode = 403;
            return Promise.reject(forbiddenError);
        }
        
        if (error.response?.status === 404) {
            const notFoundError = new Error('El recurso solicitado no existe');
            (notFoundError as any).statusCode = 404;
            return Promise.reject(notFoundError);
        }
        
        if (error.response?.status === 500) {
            const serverError = new Error('Error interno del servidor. Intenta más tarde.');
            (serverError as any).statusCode = 500;
            return Promise.reject(serverError);
        }
        
        if (error.code === 'ECONNABORTED') {
            const timeoutError = new Error('⚠️ Tiempo de espera agotado. El servidor no responde.');
            (timeoutError as any).statusCode = 408;
            return Promise.reject(timeoutError);
        }
        
        if (!error.response) {
            const networkError = new Error('🔌 Error de conexión. Verifica tu red.');
            (networkError as any).statusCode = 0;
            return Promise.reject(networkError);
        }
        
        if (error.response?.data) {
            const { message, error: errorType, statusCode } = error.response.data;
            let userMessage = '';
            
            if (Array.isArray(message)) {
                userMessage = message.join(', ');
            } else if (typeof message === 'string') {
                userMessage = message;
            } else {
                userMessage = `Error ${statusCode}: ${errorType || 'Error en el servidor'}`;
            }
            
            const formattedError = new Error(userMessage);
            (formattedError as any).statusCode = statusCode;
            (formattedError as any).originalError = error.response.data;
            return Promise.reject(formattedError);
        }
        
        return Promise.reject(error);
    }
);

export default api