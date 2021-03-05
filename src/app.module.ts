import {MiddlewareConsumer, Module, NestModule, RequestMethod} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {CatsModule} from "./cats/cats.module";


// import {LoggerMiddleware} from "./common/middleware/logger.middleware";
import {logger} from "./common/middleware/logger.middleware"
import {CatsController} from "./cats/cats.controller";
import {APP_FILTER} from "@nestjs/core";
import {HttpExceptionFilter} from "./common/http-exception.filter";
import {AllExceptionsFilter} from "./common/all-exceptions.filter";

@Module({
    imports: [CatsModule],
    controllers: [AppController],
    providers: [AppService, {
        provide: APP_FILTER,
        useClass: HttpExceptionFilter
    }, {
        provide: APP_FILTER,
        useClass: AllExceptionsFilter
    }]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        // { path: "cats", method: RequestMethod.GET }
        // apply(LoggerMiddleware).
        consumer.apply(logger).exclude({path: "cats", method: RequestMethod.GET})
            .forRoutes(CatsController);
    }
}
