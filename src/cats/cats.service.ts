import {forwardRef, Inject, Injectable, OnModuleInit} from "@nestjs/common";
import {Cat} from "./interfaces/cat.interface";
import {ParseIntTest} from "./interfaces/paseInt.interface";
import {CommonService} from "../common/common.service"
import {ModuleRef} from "@nestjs/core";
import {Service} from "ts-node";

@Injectable()
export class CatsService {

	constructor(@Inject(forwardRef(() => CommonService)) private commonService: CommonService) {

	}

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

	findCommonGetName() {
		return this.commonService.getName()
	}
}
