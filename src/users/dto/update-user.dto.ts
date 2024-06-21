import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsDate, IsDateString, IsEnum, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class 
UpdateUserDto extends PartialType(CreateUserDto) {

    @ApiProperty({example:"Krish"})
    name?: string;

    @IsEnum(["Male", "Female"])
    @ApiProperty({enum:["Male", "Female"], example:"Male"})
    gender?:"Male"|"Female";

    @IsString()
    @ApiProperty({example:"Bhavnagar"})
    city?:string

    @IsString()
    @ApiProperty({example:"India"})
    country?:string


    @IsDate()
    @ApiProperty({example:"2002-12-12"})
    birthdate?:Date

    @IsString()
    @ApiProperty({example:"Hello i am here....."})
    summary?:string

    



}


export class profilepicDTO{
    @ApiProperty({type:"file"})
    file:File 
}