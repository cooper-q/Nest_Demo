import {ArgumentMetadata, BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {ObjectSchema} from "@hapi/joi";

@Injectable()
export class JoiValidatePip implements PipeTransform {
    constructor(private schema: ObjectSchema) {
    }

    transform(value: any, metadata: ArgumentMetadata): any {
        const {error} = this.schema.validate(value)
        if (error) {
            throw new BadRequestException('Validation Failed')
        }
        return value;
    }
}