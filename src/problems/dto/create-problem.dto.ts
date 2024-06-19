import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Difficulty } from "../entities/problem.entity";

export class CreateProblemDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
      required:true
    })
    title: string;
  
    
    @IsNotEmpty()
    @IsString()    
    @ApiProperty({
      required:true
    })
    description: string;
  
    
    @IsNotEmpty()
    @IsString()    
    @ApiProperty({
      required:true
    })
    difficulty: Difficulty;

   
  

}
