import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()
export const authState = atom({
    key: 'authState',
    default: {
        token: localStorage.getItem('token') || '',
        isAuthenticated: !!localStorage.getItem('token'),
        loggedInUser: null,
        loggedInUserName: '',
    },
    effects_UNSTABLE: [persistAtom],
})