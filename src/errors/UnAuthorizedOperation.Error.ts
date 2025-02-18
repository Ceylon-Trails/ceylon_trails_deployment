import {GlobalErrorHandlerMiddleware} from "../middleWare/GlobalErrorHandler.Middleware";

class UnAuthorizedOperationError extends GlobalErrorHandlerMiddleware {
    constructor(message: string, status: number) {
        super(message, status);
    }
}

export default UnAuthorizedOperationError