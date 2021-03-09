import {Injectable} from "@nestjs/common";
import {Cat} from "./interfaces/cat.interface";
import {ParseIntTest} from "./interfaces/paseInt.interface";

@Injectable()
export class CatsService {

    private readonly cats: Cat[] = [];

    create(cat: Cat) {
        this.cats.push(cat);
    }

    findAll(): Cat[] {
        return this.cats;
    }

    findOne(id: ParseIntTest) {
        return id;
    }
}
