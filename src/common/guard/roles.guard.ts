import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {
    }


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true
        }
        const request = context.switchToHttp().getRequest();
        const user = request.body.user;
        if (roles.includes(user)) {
            return true;
        }
        throw new UnauthorizedException();
        // return matchRoles(roles, user, roles)
    }
}