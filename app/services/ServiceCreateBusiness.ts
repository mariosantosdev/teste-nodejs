import { Prisma, PrismaClient } from "@prisma/client";

import { receitaApi } from "../../utils/api";
import ServiceCreateAddress from "./ServiceCreateAddress";

async function getBusinessInfosFromAPI(cnpj: string) {
    const { data } = await receitaApi.get(`/cnpj/${cnpj}`);

    const businessFromApi = {
        cnpj: data.cnpj,
        razao_social: data.nome,
        nome_fantasia: data.fantasia,
        atividade_principal: data.atividade_principal[0].text,
        data_de_abertura: data.abertura,
        natureza_juridica: data.natureza_juridica,
    };

    const addressFromAPI = {
        cep: data.cep,
        logradouro: data.logradouro,
        cidade: data.municipio,
        estado: data.uf,
        pais: 'Brasil',
    }

    return { businessFromApi, addressFromAPI };
}

const prisma = new PrismaClient();

// If the param @data receive `{}` then nothing will happen
function updateBusinessAfterCreate(cnpj: string, data: Prisma.BusinessUpdateInput) {
    const updateEndereco = data.endereco;
    delete data.endereco;

    const updateBusiness = prisma.business.update({
        where: { rawCnpj: cnpj },
        data: {
            ...data,
            endereco: {
                update: updateEndereco
            }
        },
        select: {
            id: true,
            atividade_principal: true,
            cnpj: true,
            data_de_abertura: true,
            natureza_juridica: true,
            nome_fantasia: true,
            razao_social: true,
            endereco: true,
        }
    });

    return updateBusiness;
}

export default async function ServiceCreateBusiness(cnpj: string, afterCreate: Prisma.BusinessUpdateInput = {}) {
    try {
        const { addressFromAPI, businessFromApi } = await getBusinessInfosFromAPI(cnpj);

        await prisma.$connect();

        const { id: addressId } = await ServiceCreateAddress(addressFromAPI);

        const createBusiness = prisma.business.create({
            data: {
                ...businessFromApi,
                rawCnpj: cnpj,
                enderecoId: addressId,
            },
            select: {
                id: true,
                atividade_principal: true,
                cnpj: true,
                data_de_abertura: true,
                natureza_juridica: true,
                nome_fantasia: true,
                razao_social: true,
                endereco: true,
            }
        });

        const updateBusiness = updateBusinessAfterCreate(cnpj, afterCreate);

        const [business, businessUpdated] = await prisma.$transaction([createBusiness, updateBusiness])

        await prisma.$disconnect();

        return afterCreate === {} ? business : businessUpdated;
    } catch (error: any) {
        console.error(error)
        return error;
    }
}