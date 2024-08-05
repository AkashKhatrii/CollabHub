import { atom } from 'recoil';

export const authState = atom({
    key: 'authState',
    default: {
        token: localStorage.getItem('token') || '',
        isAuthenticated: !!localStorage.getItem('token'),
    }
})