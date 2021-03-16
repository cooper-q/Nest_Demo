import {HttpAdapterHost, NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {logger} from "./common/middleware/logger.middleware";
import {HttpExceptionFilter} from "./common/http-exception.filter";
import {AllExceptionsFilter} from "./common/all-exceptions.filter";
import {ValidationPipe} from "./common/pip/validate.pip";
import {RolesGuard} from "./common/guard/roles.guard";
import {LoggingInterceptor} from "./common/interceptor/logging.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const {httpAdapter} = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter), new HttpExceptionFilter())
    app.use(logger)
    // app.useGlobalPipes(new ValidationPipe())
    // app.useGlobalGuards(new RolesGuard())
    // app.useGlobalFilters(new HttpExceptionFilter())
    // app.useGlobalInterceptors(new LoggingInterceptor());
    await app.listen(3000);
}

bootstrap();
