import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { AuthGaurd } from 'src/users/user.gaurd';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { IRequest } from 'src/types/generalInterface';
import { Response } from 'express';
import { fetchResponseFunc } from 'src/helper/genralFunction';
import { AuthorizationGaurd } from 'src/users/role.gaurd';
@ApiBearerAuth()
@UseGuards(AuthGaurd)
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

  @UseGuards( AuthorizationGaurd)
  @Get("/submission/allSubmissions")
  async findAll(@Res() res:Response) {
    const data =await this.submissionsService.findAll();
    return fetchResponseFunc(res,data,data.message);
  }
  
  @Get('/users/allSubmissions')
  @ApiCreatedResponse({description:"All submission of user retrived..."})
  @ApiBadRequestResponse({description:"No record found..."})
  @ApiInternalServerErrorResponse({description:"Something went wrong..."})
  async findUserSubmission(@Res() res:Response, @Req() req:IRequest) {
    const user_id = req.user.id;
    const data = await this.submissionsService.findUserSubmission(user_id);
    return fetchResponseFunc(res,data,data.message);
  }
  
  @Get('/users/problems/Submissions/:problem_id')
  @ApiCreatedResponse({description:"All submission of user of particular problem retrived..."})
  @ApiBadRequestResponse({description:"No record found..."})
  @ApiInternalServerErrorResponse({description:"Something went wrong..."})
  @ApiParam({name:"problem_id", type:"number"})
  
  async findUserProblemSubmission(@Param('problem_id') problemId:number, @Res() res:Response, @Req() req:IRequest) {
    const user_id = req.user.id;
    const data = await this.submissionsService.findProblemUserSubmission(user_id,problemId);
    return fetchResponseFunc(res,data,data.message);
  }


}
       