import {Module, Global} from "@nestjs/common";
import {CatsController} from "./cats.controller";
import {CatsService} from "./cats.service";
import {ConfigService} from "../config/config.service";
import {ConfigModule} from "../config/config.module";
import {DevConfigService} from "../config/dev.config.service";
import {ProdConfigService} from "../config/prod.config.service";

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
    controllers: [CatsController],
    providers: [CatsService, configServiceProvider],
    exports: [CatsService]
})

export class CatsModule {
}
