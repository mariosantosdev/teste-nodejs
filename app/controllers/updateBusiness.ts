import { Request, Response } from "express";

import ServiceUpdateBusiness from "../services/ServiceUpdateBusiness";

import { ParseError } from "../../utils/error";

export default async function UpdateBusiness(req: Request, res: Response) {
    try {
        const { cnpj } = req.params;

        const business = await ServiceUpdateBusiness(cnpj, req.body);

        res.status(200).json({ business });
    } catch (error: any) {
        const parsedError = ParseError(error);

        if (typeof parsedError === 'string')
            return res.status(500).json({ message: parsedError });

        res.status(parsedError.code).json({ message: parsedError.message });
    }
}