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
import { CategoryService } from './category.service';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { BulkCategoryCreate } from './dto/category.dto';
import { AuthorizationGaurd } from 'src/users/role.gaurd';

@ApiTags('Problems')
@Controller('problems')
export class ProblemsController {
  constructor(
    private readonly problemsService: ProblemsService,
    private readonly categoryService: CategoryService,
  ) {}

  @UseGuards(AuthGaurd, AuthorizationGaurd)
  @ApiBearerAuth()
  @Post('/create')
  async create(
    @Body() createProblemDto: CreateProblemDto,
    @Res() res: Response,
    @Req() req: IRequest,
  ) {
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

  @ApiParam({ name: 'level', enum: Difficulty })
  @Get('view/difficultywise/:level')
  async findByDifficulty(
    @Param('level') level: Difficulty,
    @Res() res: Response,
  ) {
    const data = await this.problemsService.findByDifficulty(level);
    return fetchResponseFunc(res, data, data.message);
  }

  @Get('view/categories')
  async viewAllCategories(@Res() res: Response) {
    const data = await this.categoryService.viewCategory();
    return fetchResponseFunc(res, data, data.message);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGaurd, AuthorizationGaurd)
  @Post('create/categories')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: BulkCategoryCreate,
  })
  async createCategory(
    @Body('category') categories: string,
    @Res() res: Response,
  ) {
    const category = categories.split(',');
    const data = await this.categoryService.createCategory(category);
    return fetchResponseFunc(res, data, data.message);
  }

  @ApiParam({ name: 'category' })
  @Get('views/categories/problem/:category')
  async findProblemByCategory(
    @Param('category') category: string,
    @Res() res: Response,
  ) {
    const data = await this.categoryService.findProblemByCategory(category);
    return fetchResponseFunc(res, data, data.message);
  }

  @ApiParam({ name: 'id' })
  @Get('views/user/submissions/:id')
  async allUsersSubmission(@Param('id') id: number, @Res() res: Response) {
    const data = await this.problemsService.submissionsOfAllUser(id);
    return fetchResponseFunc(res, data);
  }
}
