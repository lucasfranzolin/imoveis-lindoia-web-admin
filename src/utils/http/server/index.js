import axios from 'axios';

export function getServerInstance() {
    return axios.create({});
}
