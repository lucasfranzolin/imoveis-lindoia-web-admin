import axios from 'axios';

export function getServerInstance() {
    const instance = axios.create({});
    return instance;
}
