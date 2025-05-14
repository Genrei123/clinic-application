import { authService  } from '../api/authService';
import { Login } from '../types/types';

export function useAuth() {

    const login = async (User: Login) => {
        const response = await authService.login(User);
        if (response.status === 200) {
            const data = await response.data;
            console.log('Login successful:', data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            return data;
        } else {
            throw new Error('Login failed');
        }
    }

    const getUser = () => {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        }
        return null;
    }

    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        return token !== null;
    }

    return { login, isLoggedIn, getUser };
}