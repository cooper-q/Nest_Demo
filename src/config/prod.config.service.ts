import {Injectable} from "@nestjs/common";

@Injectable()
export class ProdConfigService {
    getConfig = () => {
        return {a: 'prod'}
    }
}

