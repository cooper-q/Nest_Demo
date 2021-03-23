import {
    Controller,
    Get,
    Post,
    HttpCode,
    Body,
    Res,
    HttpStatus,
    HttpException,
    UseFilters,
    UsePipes, Param, Query, UseGuards, SetMetadata, UseInterceptors
} from "@nestjs/common";

import {Request, Response} from "express";
import {CreateCatDto} from "./create-cat.dto";
import {CatsService} from "./cats.service";
import {Cat} from "./interfaces/cat.interface";
import {ForbiddenException} from "../common/forbidden.exception";
import {HttpExceptionFilter} from "../common/http-exception.filter";
import {JoiValidatePip} from "../common/pip/joi.validate.pip";
import {ValidationPipe} from "../common/pip/validate.pip";
import {get} from "http";
import {ParseIntPip} from "../common/pip/parse-int.pip";
import {RolesGuard} from "../common/guard/roles.guard";
import {Roles} from "../common/decorator/roles.decorator";
import {LoggingInterceptor} from "../common/interceptor/logging.interceptor";
import {User} from "../common/decorator/user.decorator";
import {ConfigService} from "../config/config.service";


@Controller("cats")
@UseGuards(RolesGuard)
// @UseInterceptors(LoggingInterceptor)
// @UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(private readonly catService: CatsService, private readonly configService: ConfigService) {
    }

    @Get()
    // @HttpCode(200)
    async findAll(): Promise<Cat[]> {
        // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
        // throw new HttpException({
        //     status: HttpStatus.FORBIDDEN,
        //     error: 'this is custom message1'
        // }, HttpStatus.FORBIDDEN)
        // throw new ForbiddenException();
        return this.catService.findAll();
    }

    @Post()
    @UseFilters(new HttpExceptionFilter())
    async create(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
        this.catService.create(createCatDto);
        res.status(HttpStatus.OK).send(200);
    }

    @Post('/postFilters')
    @UseFilters(HttpExceptionFilter)
    async postFilters(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
        res.status(HttpStatus.OK).json([]);
        // throw new ForbiddenException();
    }

    @Get("profile")
    async findOne2(@Res() res: Response) {
        res.status(HttpStatus.OK).json([]);
    }

    @Get("currentFilter")
    async currentFilter(@Res() res: Response) {
        throw new ForbiddenException()
    }

    @Post("pip")
    // @UsePipes(new JoiValidatePip(createCatSchema))
    async createPip(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
        this.catService.create(createCatDto)
    }

    @Post('pip2')
    async createPipes2(@Body(new ValidationPipe()) createCatCto: CreateCatDto) {
        this.catService.create(createCatCto)
    }

    @Post("usePipes")
    @UsePipes(ValidationPipe)
    async createUsePipes(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
        console.log('createCatDto:', createCatDto)
        this.catService.create(createCatDto)
        res.status(HttpStatus.OK).json([]);
    }

    @Get('testparseint')
    findOne(@Query('id', new ParseIntPip()) id) {
        return this.catService.findOne(id);
    }

    @Post('roles')
    // @SetMetadata('roles', ['admin'])
    @Roles('admin')
    // @UsePipes(ValidationPipe)
    async createRole(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
        this.catService.create(createCatDto);
        res.status(HttpStatus.OK).json([]);
    }

    @Get('userDec')
    // @UsePipes(ValidationPipe)
    async findOneOne(@User() createCatDto: CreateCatDto) {
        console.log(createCatDto)
    }

    @Get('findone')
    async findOneParam(@User(new ValidationPipe()) createCatDto: CreateCatDto) {
        console.log(createCatDto)
    }

    @Get('config')
    testConfig() {
        const data = this.configService.getConfig()
        console.log('data:', data)
    }
}
