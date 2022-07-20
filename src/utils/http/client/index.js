import axios from 'axios';

export function getClientInstance() {
    return axios.create({});
}
