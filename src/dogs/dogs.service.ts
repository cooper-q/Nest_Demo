import {Injectable} from "@nestjs/common";
import {Dog} from "./interfaces/dog.interface";

@Injectable()
export class DogsService {
    private readonly dogs: Dog[] = []

    findAll(): Dog[] {
        return this.dogs;
    }
}