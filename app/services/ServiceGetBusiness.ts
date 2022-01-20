import { PrismaClient } from "@prisma/client";

import ServiceCreateBusiness from "./ServiceCreateBusiness";

export default async function ServiceGetBusiness(cnpj: string) {
    try {
        const prisma = new PrismaClient();

        await prisma.$connect();

        const business = await prisma.business.findUnique({
            where: { rawCnpj: cnpj },
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

        if (!business) {
            const createdBusiness = await ServiceCreateBusiness(cnpj);
            return createdBusiness;
        }

        await prisma.$disconnect();

        return business;
    } catch (error: any) {
        console.error(error);
        return error;
    }
}