import {Module, Global, forwardRef} from "@nestjs/common";
import {CatsController} from "./cats.controller";
import {CatsService} from "./cats.service";
import {CommonService} from "../common/common.service"
import {ConfigService} from "../config/config.service";
import {ConfigModule} from "../config/config.module";
import {DevConfigService} from "../config/dev.config.service";
import {ProdConfigService} from "../config/prod.config.service";
import {CommonModule} from "../common/common.module";

// @Global()

const configServiceProvider = {
	provide: ConfigService,
	useClass: process.env.NODE_ENV === 'dev' ? DevConfigService : ProdConfigService
}

// @Module({
//     // controllers: [CatsController],
//     providers: [configServiceProvider],
//     exports: []
// })

@Module({
	imports: [forwardRef(() => CommonModule)],
	controllers: [CatsController],
	providers: [CatsService, configServiceProvider, {
		provide: 'TEST',
		useValue: {a: 'b'}
	}],
	exports: [CatsService]
})

export class CatsModule {
}
