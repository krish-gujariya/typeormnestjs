import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGaurd } from "./user.gaurd";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "./users.service";
import { IRequest } from "src/types/generalInterface";
import { NextFunction , Response} from "express";
import { catchError } from "src/helper/genralFunction";

@Injectable()

export class AuthorizationGaurd implements CanActivate  {
    constructor( private userService: UsersService
        ){}

    async canActivate(context: ExecutionContext){
        try {
            const request:IRequest = context.switchToHttp().getRequest();
            const roleId = request.user.role_id;
            const roles =await this.userService.findRole(roleId);
            if(roles.success){
                if(roles.result =="ADMIN"){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
            
        } catch (error) {
            catchError(error)
            return false
        }
    }
    }

    