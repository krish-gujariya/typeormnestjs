import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiInternalServerErrorResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGaurd } from 'src/users/user.gaurd';
import { fetchResponseFunc } from 'src/helper/genralFunction';
import { Response } from 'express';
import { IRequest } from 'src/types/generalInterface';

@UseGuards(AuthGaurd)
@ApiBearerAuth()
@Controller('likes')

export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @ApiTags("Users")
  @ApiBody({type: CreateLikeDto})
  @ApiResponse({status:201, description:"Like data added successfully...."})
  @ApiInternalServerErrorResponse()
  async create(@Body() createLikeDto: CreateLikeDto, @Res() res:Response, @Req() req:IRequest) {
    createLikeDto.user_id = req.user.id;
    const data= await this.likesService.create(createLikeDto);
    return fetchResponseFunc(res,data,data.message)
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

}
