import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class BulkCategoryCreate {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
  })
  category: string[];
}
