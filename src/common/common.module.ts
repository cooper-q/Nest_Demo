import {Module, Global, forwardRef} from "@nestjs/common";
import {CommonService} from "../common/common.service"
import {CatsModule} from "../cats/cats.module";

@Module({
	imports: [forwardRef(() => CatsModule)],
	providers: [CommonService],
	exports: [CommonService]
})

export class CommonModule {
}
