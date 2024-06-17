import { Logger } from "@nestjs/common";
import { hash } from "argon2"

export const genPassword =async(data:string)=>{
    try {
        return await hash(data);
    } catch (error) {
        Logger.error(error);
    }
}