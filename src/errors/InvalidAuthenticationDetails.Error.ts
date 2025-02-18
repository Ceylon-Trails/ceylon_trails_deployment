import {GlobalErrorHandlerMiddleware} from "../middleWare/GlobalErrorHandler.Middleware";

class InvalidAuthenticationDetailsError extends GlobalErrorHandlerMiddleware {
    constructor(message: string, status: number) {
        super(message, status);
    }
}

export default InvalidAuthenticationDetailsError