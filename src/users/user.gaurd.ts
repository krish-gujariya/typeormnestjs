import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { config } from "dotenv";
import { Request, Response } from "express";
import { catchError } from "src/helper/genralFunction";
import { UsersService } from "./users.service";
config();

@Injectable()
export class AuthGaurd implements CanActivate{
    constructor(
        private jwtService: JwtService,
        private userService: UsersService
        ){}

    private extractToken(req:Request):string|undefined{
        
        const token: string = req.headers.authorization?.split(" ")[1];
        
      return token;
    }

    async canActivate(context: ExecutionContext):Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        if(!token){
             return false;
        }else{
            try {
                const payload =  await this.jwtService.verifyAsync(token,{secret:process.env.TOKEN});                
                const data = await this.userService.findUserByEmail(payload);
                if(data.success){
                    request['user'] = data.result;
                    return true;
                } else{
                    return false;
                }               
                
            } catch (error) {
                catchError(error);                
                return false;
            }
        }
    }
}