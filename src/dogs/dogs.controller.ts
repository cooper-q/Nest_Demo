import {Controller, Get} from "@nestjs/common";
import {DogsService} from "./dogs.service";
import {Dog} from "./interfaces/dog.interface";

@Controller('dogs')
export class DogsController {
    constructor(private readonly dogsService: DogsService) {

    }

    @Get('findall')
    async findAll(): Promise<Dog[]> {
        return this.dogsService.findAll()
    }
}