import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLikeDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'Disscussion' })
  entity_type: 'Disscussion' | 'Problem';

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ required: true, example: 1 })
  entity_id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, example: 'LIKE' })
  like: 'LIKE' | 'DISLIKE';
}
