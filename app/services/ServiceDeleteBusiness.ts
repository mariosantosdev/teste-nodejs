import { PrismaClient } from "@prisma/client";

export default async function ServiceDeleteBusiness(cnpj: string) {
    try {
        const prisma = new PrismaClient();

        await prisma.address.deleteMany({
            where: { Business: { rawCnpj: cnpj } }
        });

        await prisma.business.delete({
            where: { rawCnpj: cnpj },
        });

        return;
    } catch (error: any) {
        console.error(error);
        return error;
    }
}