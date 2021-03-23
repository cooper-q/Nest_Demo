import {Injectable} from "@nestjs/common";

@Injectable()
export class DevConfigService {
    getConfig = () => {
        return {a: 'dev'}
    }
}
