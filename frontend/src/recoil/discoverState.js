import { atom } from "recoil";

export const discoverState = atom({
    key: 'discoverState',
    default: {
        searchTech: '',
        filteredProfiles: []
    }
})