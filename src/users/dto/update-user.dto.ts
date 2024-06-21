import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate, IsDateString, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class 
UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({example:"Krish", required:false})
    name?: string;

    @IsEnum(["Male", "Female"])
    @ApiProperty({enum:["Male", "Female"], example:"Male", required:false})
    gender?:"Male"|"Female";

    @IsString()
    @ApiProperty({example:"Bhavnagar", required:false})
    city?:string

    @IsString()
    @ApiProperty({example:"India", required:false})
    country?:string


    @IsDate()
    @ApiProperty({example:"2002-12-12", required:false})
    birthdate?:Date

    @IsString()
    @ApiProperty({example:"Hello i am here.....", required:false})
    summary?:string

    



}


export class profilepicDTO{
    @ApiProperty({type:"file"})
    file:File 
}