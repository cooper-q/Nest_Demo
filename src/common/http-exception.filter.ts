import {Catch, ExceptionFilter, HttpException, ArgumentsHost} from "@nestjs/common";
import {Request, Response} from "express";
import {stat} from "fs";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): any {
        const ctx = host.switchToHttp();
        // 这里的
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response.status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url,
                test: 1
            })
    }
}