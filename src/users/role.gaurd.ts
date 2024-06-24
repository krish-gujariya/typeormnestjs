import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { IRequest } from "src/types/generalInterface";
import { catchError, fetchResponseFunc } from "src/helper/genralFunction";

@Injectable()

export class AuthorizationGaurd implements CanActivate  {
    constructor( private userService: UsersService
        ){}

    async canActivate(context: ExecutionContext){
        const response = context.switchToHttp().getResponse();
        try {
            const request:IRequest = context.switchToHttp().getRequest();
            const roleId = request.user.role_id;
            const roles =await this.userService.findRole(roleId);
            if(roles.success){
                if(roles.result =="ADMIN"){
                    return true;
                }else{
                    response.status(403).json({success:false, message:"Access Denied"})
                    return false;
                }
            }else{
                return false;
            }
            
        } catch (error) {
           const data =  catchError(error)
           fetchResponseFunc(response,data, data.message);
            return false
        }
    }
    }

    