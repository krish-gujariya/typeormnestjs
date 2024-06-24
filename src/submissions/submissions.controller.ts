import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { AuthGaurd } from 'src/users/user.gaurd';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiTags } from '@nestjs/swagger';
import { IRequest } from 'src/types/generalInterface';
import { Response } from 'express';
import { fetchResponseFunc } from 'src/helper/genralFunction';
@UseGuards(AuthGaurd)
@ApiBearerAuth()
@Controller()
@ApiTags("Submissions")
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post("/problem/submission")
  @ApiCreatedResponse({status:201, description:"Problem's sollution submitted successfully"})
  @ApiForbiddenResponse({description:"Forbidden"})
  @ApiInternalServerErrorResponse({description:"Internal server error"})
  async create(@Body() createSubmissionDto: CreateSubmissionDto, @Req() req:IRequest, @Res() res:Response) {
    createSubmissionDto.user_id = req.user.id;
    const data = await this.submissionsService.create(createSubmissionDto);
    return fetchResponseFunc(res,data, data.message);
  }

  @Get("/submission/allSubmissions")
  async findAll(@Res() res:Response) {
    const data =await this.submissionsService.findAll();
    return fetchResponseFunc(res,data,data.message);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submissionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto) {
    return this.submissionsService.update(+id, updateSubmissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submissionsService.remove(+id);
  }
}
