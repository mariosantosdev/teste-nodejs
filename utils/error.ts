type CustomError = {
    message: string;
    code: number;
}

export function GenerateError(message: string, code?: number) {
    const error = { message, code: code ? code : 400 };

    return JSON.stringify(error);
}

export function ParseError(error: string): CustomError | string {
    try {
        const objectError: CustomError = JSON.parse(error);

        return objectError;
    } catch (error: any) {
        return error;
    }
}