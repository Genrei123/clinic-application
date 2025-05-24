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
        const data = localStorage.getItem('token');
        if (user && data) {
            return JSON.parse(user);
        } else {
            console.log('Illegal User, How do you get our URL? Hacker MAN! >:)');
            console.log('Go back to Nine Realm, you hacker!');
            
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.href = '/login#/login';
            webkitURL.createObjectURL(new Blob(["alert('You have been Rickrolled!');"]));
            window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
            return true;
        }
        return null;
    }   

    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        return token !== null;
    }

    return { login, isLoggedIn, getUser };
}