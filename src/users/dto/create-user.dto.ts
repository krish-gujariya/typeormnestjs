import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:"fname lname",
    required:true
  })
  name: string;

  
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  
  @ApiProperty({
    example:"test@gmail.com",
    required:true
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:"$rf6%eES4%^",
    required:true
  })
  password: string;
}

export class FindUser {

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  
  @ApiProperty({
    example:"Krish@gmail.com",
    required:true
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example:"Krish",
    required:true
  })
  password: string;
}

