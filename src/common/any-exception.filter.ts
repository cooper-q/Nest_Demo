import {Catch, ExceptionFilter, HttpException, HttpStatus, ArgumentsHost} from "@nestjs/common"

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
            statsCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            demo: 1
        })
    }
}