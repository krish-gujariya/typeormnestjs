import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { UpdateProblemDto } from './dto/update-problem.dto';
import { fetchResponseFunc } from 'src/helper/genralFunction';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGaurd } from 'src/users/user.gaurd';
import { IRequest } from 'src/types/generalInterface';
import { Difficulty } from './entities/problem.entity';

@ApiTags('Problems')
@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService) {}

  @UseGuards(AuthGaurd)
  @ApiBearerAuth()
  @ApiBody({ type: CreateProblemDto })
  @Post('createQuestion')
  async create(
    @Body() createProblemDto: CreateProblemDto,
    @Res() res: Response,
    @Req() req: IRequest,
  ) {
    console.log(createProblemDto);
    const data = await this.problemsService.create(createProblemDto);
    return fetchResponseFunc(res, data, data.message);
  }

  @ApiResponse({
    status: 201,
    description: 'Problem list retrived successfully...',
  })
  @Get('view')
  async findAll(@Res() res: Response) {
    const data = await this.problemsService.findAll();
    return fetchResponseFunc(res, data, data.message);
  }

  @ApiParam({ name: 'level', enum:Difficulty})
  @Get('view/difficultywise')
  async findByDifficulty(@Param('level') level:Difficulty, @Res() res: Response) {

    const data = await this.problemsService.findByDifficulty(level);
    return fetchResponseFunc(res, data, data.message);
  }
}
