import {ArgumentMetadata, BadRequestException, ForbiddenException, Injectable, PipeTransform} from "@nestjs/common";

@Injectable()
export class ParseIntPip implements PipeTransform<string, number> {
    transform(value: string, metadata: ArgumentMetadata): number {
        const val = parseInt(value, 10);
        console.log('val:', val)
        if (isNaN(val)) {
            throw new BadRequestException('Validation failed')
        }
        return val;
    }
}