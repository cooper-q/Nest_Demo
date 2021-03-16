import {BadGatewayException, CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            catchError(err => throwError(new BadGatewayException()))
        );
    }
}