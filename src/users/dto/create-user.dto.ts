import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiBody, ApiProperty } from "@nestjs/swagger";
import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
export class UserDisscussionDto{
    
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({required:true, example:1})
  entity_id: number;

  @IsNotEmpty()
  @IsString()
  entity_type:"Problems"

  @IsNotEmpty()
  @IsString()
  @ApiProperty({required:true, example:"Some string enered here..."})
  content: string;
  
}

export class userList{
  @ApiProperty({required:true})
  data:UserDisscussionDto[]
}

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

  @ApiProperty({required:true, items:{}})
  disscussions: UserDisscussionDto[]
  
}

 