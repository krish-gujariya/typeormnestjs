import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req } from '@nestjs/common';
import { DiscussionsService } from './discussions.service';
import { CreateDiscussionDto } from './dto/create-discussion.dto';
import { UpdateDiscussionDto } from './dto/update-discussion.dto';
import { AuthGaurd } from 'src/users/user.gaurd';
import { fetchResponseFunc } from 'src/helper/genralFunction';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { IRequest } from 'src/types/generalInterface';
@UseGuards(AuthGaurd)
@ApiBearerAuth()
@Controller('comment')
export class DiscussionsController {
  constructor(private readonly discussionsService: DiscussionsService) {}

  @Post()
  @ApiTags("Comments")
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
    type: CreateDiscussionDto
  })
  async create(@Body() createDiscussionDto: CreateDiscussionDto, @Res() res:Response, @Req() req:IRequest) {
    createDiscussionDto.user_id = req.user.id
     const data = await this.discussionsService.create(createDiscussionDto);
     return fetchResponseFunc(res,data,data.message);
  }

  @Get()
  findAll() {
    return this.discussionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discussionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiscussionDto: UpdateDiscussionDto) {
    return this.discussionsService.update(+id, updateDiscussionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discussionsService.remove(+id);
  }
}
