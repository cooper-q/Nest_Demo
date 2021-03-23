import {ConfigService} from "./config.service";
import {DevConfigService} from "./dev.config.service";
import {ProdConfigService} from "./prod.config.service";
import {Module} from "@nestjs/common";
import {CatsController} from "../cats/cats.controller";
import {CatsService} from "../cats/cats.service";
import {CatsModule} from "../cats/cats.module";

const configServiceProvider = {
    provide: ConfigService,
    useClass: process.env.NODE_ENV === 'dev' ? DevConfigService : ProdConfigService
}

@Module({
    // controllers: [CatsController],
    providers: [configServiceProvider],
    exports: []
})

export class ConfigModule {
}
