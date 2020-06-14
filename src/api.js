import axios from 'axios';

const api = axios.create({
    baseURL: 'https://beckend-elenco.herokuapp.com/',
});

export default api;