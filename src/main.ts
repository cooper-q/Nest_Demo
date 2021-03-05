import {HttpAdapterHost, NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {logger} from "./common/middleware/logger.middleware";
import {HttpExceptionFilter} from "./common/http-exception.filter";
import {AllExceptionsFilter} from "./common/all-exceptions.filter";
import {ValidationPipe} from "./common/pip/validate.pip";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const {httpAdapter} = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter), new HttpExceptionFilter())
    app.use(logger)
    app.useGlobalPipes(new ValidationPipe())
    // app.useGlobalFilters(new HttpExceptionFilter())
    await app.listen(3000);
}

bootstrap();
