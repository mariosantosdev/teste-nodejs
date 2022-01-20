import { PrismaClient } from "@prisma/client";

import { ibgeApi } from "../../utils/api";
import { GenerateError } from "../../utils/error";

export interface CreateAddressInput {
    cep: string;
    logradouro: string;
    cidade: string;
    estado: string;
    pais: string;
}

type States = {
    "id": number;
    "sigla": string;
    "nome": string;
}

type City = {
    "id": string;
    "nome": string;
}

async function GetUfID(uf: string) {
    const { data } = await ibgeApi.get<States[]>('/estados');

    const stateObject = data.find(state => state.sigla === uf);
    return stateObject?.id;
}

async function GetCityID(name: string, stateUF: string) {
    const ufID = await GetUfID(stateUF);
    const { data } = await ibgeApi.get<City[]>(`/estados/${ufID}/municipios`);

    const tratedName = name
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase();

    const cityObject = data.find(city => {
        const tratedCityName = city.nome
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase();

        return tratedName === tratedCityName;
    });

    return cityObject?.id;
}

export default async function ServiceCreateAddress(input: CreateAddressInput) {
    try {
        const prisma = new PrismaClient();

        const ibgeId = await GetCityID(input.cidade, input.estado);

        if (!ibgeId)
            throw GenerateError('Código do IBGE não encontrado.', 502);

        await prisma.$connect();

        const address = await prisma.address.create({
            data: {
                ...input,
                codigo_do_ibge: ibgeId
            },
        });

        await prisma.$disconnect();

        return address;
    } catch (error: any) {
        console.error(error);
        return error;
    }
}