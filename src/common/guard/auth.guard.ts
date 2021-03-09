import {CanActivate, ExecutionContext, Injectable, Type} from "@nestjs/common";
import {Observable} from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();

        // 下面这个方法验证request请求
        // return validateRequest(request)
        return request;
    }

    getClass<T = any>(): any {

    };
}