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
	UsePipes, Param, Query, UseGuards, SetMetadata, UseInterceptors, Inject
} from "@nestjs/common";

import {Request, Response} from "express";
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
import Connect from "./connect";


@Controller("config")
@UseGuards(RolesGuard)
// @UseInterceptors(LoggingInterceptor)
// @UseFilters(HttpExceptionFilter)
export class ConfigController {
	constructor(private readonly configService: ConfigService, private readonly connect: Connect, @Inject('TEST') private value) {
	}

	@Get('config')
	testConfig() {
		const data = this.configService.getConfig()
		console.log('data:', data)
		console.log('this.value:', this.value)
	}

	@Get('connect')
	testConnect() {
		console.log(this.connect.getConfig());
	}
}
