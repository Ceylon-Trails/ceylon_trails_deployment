import {GlobalErrorHandlerMiddleware} from "../middleWare/GlobalErrorHandler.Middleware";

class DataIntegrityViolationError extends GlobalErrorHandlerMiddleware {
    constructor(message: string, status: number) {
        super(message, status);
    }
}

export default DataIntegrityViolationError