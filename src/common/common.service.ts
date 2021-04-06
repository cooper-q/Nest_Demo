import {forwardRef, Inject, Injectable} from "@nestjs/common";
import {CatsService} from "../cats/cats.service"

@Injectable()
export class CommonService {
	constructor(@Inject(forwardRef(() => CatsService)) private catsService: CatsService) {
	}

	getName() {
		// this.catsService.findAll()
		return {name: 'common'}
	}
}
