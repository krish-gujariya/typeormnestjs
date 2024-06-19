import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiBody, ApiProperty } from "@nestjs/swagger";


export class FindUser {

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
    example:"test",
    required:true
  })
  password: string;
}


export class CreateUserDto {

  constructor(private findUser: FindUser){}

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
    example:"test",
    required:true
  })
  password: string;

}

  
