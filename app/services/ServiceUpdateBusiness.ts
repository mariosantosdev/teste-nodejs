import { Prisma, PrismaClient } from "@prisma/client";

import ServiceCreateBusiness from "./ServiceCreateBusiness";

const prisma = new PrismaClient();

async function alreadyExistBusiness(rawCnpj: string) {
    const business = await prisma.business.findUnique({
        where: { rawCnpj },
        select: { id: true }
    });

    return Boolean(business);
}

export default async function ServiceUpdateBusiness(cnpj: string, data: Prisma.BusinessUpdateInput) {
    try {
        await prisma.$connect();

        if (!await alreadyExistBusiness(cnpj)) {
            const createdBusiness = await ServiceCreateBusiness(cnpj, data);
            return createdBusiness;
        }

        const updateEndereco = data.endereco;
        delete data.endereco

        const business = await prisma.business.update({
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
            },
        });

        await prisma.$disconnect();

        return business;
    } catch (error: any) {
        console.error(error);
        return error;
    }
}