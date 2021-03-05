import {PipeTransform, Injectable, ArgumentMetadata, BadRequestException} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, {metatype}: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value)
        const errors = await validate(object)
        console.log('value:', value)
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed')
        }
        return value;
    }


    private toValidate(metatype: Function): Boolean {
        console.log(metatype)
        const types: Function[] = [String, Boolean, Number, Array, Object]
        return !types.includes(metatype)
    }
}