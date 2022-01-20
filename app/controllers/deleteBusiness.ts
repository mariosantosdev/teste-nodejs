import { Request, Response } from "express";

import ServiceDeleteBusiness from "../services/ServiceDeleteBusiness";

import { ParseError } from "../../utils/error";

export default async function DeleteBusiness(req: Request, res: Response) {
    try {
        const { cnpj } = req.params;

        await ServiceDeleteBusiness(cnpj);

        res.status(200).send();
    } catch (error: any) {
        const parsedError = ParseError(error);

        if (typeof parsedError === 'string')
            return res.status(500).json({ message: parsedError });

        res.status(parsedError.code).json({ message: parsedError.message });
    }
}