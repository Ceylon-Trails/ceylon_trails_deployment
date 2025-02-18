import {NextFunction, Request, Response} from "express";

class GlobalErrorHandlerMiddleware extends Error {
    private readonly _status: number;
    private readonly _timestamp: Date;

    constructor(message: string, status: number) {
        super(message);
        this._status = status;
        this._timestamp = new Date();
    }

    get status(): number {
        return this._status;
    }

    get timestamp(): Date {
        return this._timestamp;
    }
}

function errorHandler(err: GlobalErrorHandlerMiddleware, req: Request, res: Response, next: NextFunction): void {
    console.error(err);

    res.status(err.status).json({
        message: err.message,
        status: err.status,
        timestamp: err.timestamp,
    });
}

export {errorHandler, GlobalErrorHandlerMiddleware}
