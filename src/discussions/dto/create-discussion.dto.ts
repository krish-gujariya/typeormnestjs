import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDiscussionDto {
     
    @IsNotEmpty()
    @IsNumber()
    user_id: number;
    
     
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({required:true})
    entity_id: number;

    @IsNotEmpty()
    @IsString()
    entity_type:"Problems"

    @IsNotEmpty()
    @IsString()
    @ApiProperty({required:true})
    content: string;
    
    
}
