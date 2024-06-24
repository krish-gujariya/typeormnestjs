import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, isNotEmpty, IsNumber, IsString } from "class-validator";
import { SubmissionStatus } from "../entities/submission.entity";

export class CreateSubmissionDto {
    @IsNotEmpty()
    @IsNumber()
    user_id: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({required:true, example:1})
    problem_id: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({required:true, example:"JAVA"})
    language: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({required:true, example:"JAVA"})
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({required:true, example:111.1})
    runtime: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({required:true, example:100})
    memory_usage: number;

    @IsNotEmpty()
    @IsEnum({enum:SubmissionStatus})
    @ApiProperty({required:true,type:"enum", enum:SubmissionStatus })
    status: SubmissionStatus;



}
