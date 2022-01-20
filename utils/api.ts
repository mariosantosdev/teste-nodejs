import axios from "axios"

export const receitaApi = axios.create({
    baseURL: 'https://www.receitaws.com.br/v1'
});

export const ibgeApi = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v1/localidades'
});