import {Injectable, NestMiddleware} from "@nestjs/common";
import {Request, Response, NextFunction} from "express";


// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log("Request");
//     next();
//   }
// }
export function logger(req, res, next) {
    console.log('Request');
    next()
}