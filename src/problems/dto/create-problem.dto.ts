import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Difficulty } from "../entities/problem.entity";



export class testCasesCreateDto {

  @IsNotEmpty()
  @ApiProperty({required:true, type:"string", example:"input"})
  input:string

  @IsNotEmpty()
  @ApiProperty({required:true, type:"string", example:"output"})
  output:string


  @IsNotEmpty()
  @ApiProperty({required:true, type:"boolean", example:true})
  visibility:boolean
}

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
    @IsNumber()    
    @ApiProperty({
      required:true
    })
    category_id: number;
    
    
    @IsNotEmpty()
    @IsString()    
    @ApiProperty({
      required:true
    })
    difficulty: Difficulty;


    @IsNotEmpty()
    @ApiProperty({required:true})
    testcases: testCasesCreateDto[]
  

}
