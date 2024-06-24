import { Injectable, NestMiddleware, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NextFunction,Response, } from "express";
import { IRequest } from "src/types/generalInterface";

@Injectable()
export class AuthoriztionMiddleware implements NestMiddleware{
   constructor(
        // @InjectRepository(Repository)
        // private userRepo: Repository<Roles>
    ){}
   async use(req: IRequest, res: Response, next: NextFunction) {
    console.log(req);
    
        
        // const data = await this.userRepo.findOne({where:{id:roleId}});
        // if(data.roles=="ADMIN"){
            next();

        // }else{
            // return res.status(403).json({success:false, message:"Access Denied"})
        // }
    }
}