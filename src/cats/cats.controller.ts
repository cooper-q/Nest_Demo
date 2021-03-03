import { Controller, Get, Post, HttpCode, Body, Res, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { CreateCatDto } from "./create-cat.dto";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";


@Controller("cats")
export class CatsController {
  constructor(private readonly catService: CatsService) {
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<Cat[]> {
    return this.catService.findAll();
  }

  @Post()
  async create(@Body() createCatDto: CreateCatDto, @Res() res: Response) {
    this.catService.create(createCatDto);
    res.send("111");
    // res.status(HttpStatus.OK).send(200);
  }

  @Get("profile")
  async findOne(@Res() res: Response) {
    res.status(HttpStatus.OK).json([]);
  }
}
