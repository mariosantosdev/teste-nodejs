import { Request, Response } from "express";

import ServiceGetBusiness from "../services/ServiceGetBusiness";

import { ParseError } from "../../utils/error";

export default async function GetBusiness(req: Request, res: Response) {
    try {
        const { cnpj } = req.params;

        const business = await ServiceGetBusiness(cnpj);

        res.status(200).json({ business });
    } catch (error: any) {
        const parsedError = ParseError(error);

        if (typeof parsedError === 'string')
            return res.status(500).json({ message: parsedError });

        res.status(parsedError.code).json({ message: parsedError.message });
    }
}