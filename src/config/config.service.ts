import {Injectable} from "@nestjs/common";

@Injectable()
export class ConfigService {
    getConfig = () => {
        return {a: 'config'}
    }
}
