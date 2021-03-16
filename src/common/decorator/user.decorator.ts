import {createParamDecorator, ExecutionContext} from "@nestjs/common";

export const User = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const body = request.body;
        return data ? body && body[data] : body
    }
)