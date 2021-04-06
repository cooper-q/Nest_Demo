import {forwardRef, MiddlewareConsumer, Module, NestModule, RequestMethod} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {CatsModule} from "./cats/cats.module";
import {logger} from "./common/middleware/logger.middleware"
import {CatsController} from "./cats/cats.controller";
import {ConfigModule} from "./config/config.module";
import {ConfigService} from "./config/config.service";
import {CommonModule} from "./common/common.module";

@Module({
	// 循环依赖这里也需要forwardRef
	imports: [forwardRef(() => CatsModule), forwardRef(() => CommonModule)],
	controllers: [AppController],
	providers: [AppService, ConfigService]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		// { path: "cats", method: RequestMethod.GET }
		// apply(LoggerMiddleware).
		consumer.apply(logger).exclude({path: "cats", method: RequestMethod.GET})
		.forRoutes(CatsController);
	}
}
