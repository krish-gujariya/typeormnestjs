import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Response,Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto, FindUser } from './dto/create-user.dto';
import { generalResponse } from 'src/helper/generalResponseFunction';
import { fetchResponseFunc } from 'src/helper/genralFunction';
import { JwtService } from '@nestjs/jwt';
import { AuthGaurd } from './user.gaurd';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IRequest, tempI } from 'src/types/generalInterface';
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}


  @ApiTags('User')
  @Post('registration')
  // @ApiConsumes('application/x-www-form-urlencoded')
  @ApiCreatedResponse()
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    type: CreateUserDto,
  })
  async findOne(@Body() userData: CreateUserDto, @Res() res: Response) {
    console.log(userData);
    
    const data = await this.usersService.create(userData);
    fetchResponseFunc(res, data, data.message);
  }

  @ApiTags("User")
  @Post('login')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({status:201, description:'User logged in successfully'})
  async login(@Body() userdata: FindUser, @Res() response: Response) {
      
    const data = await this.usersService.verifyUser(userdata);
        
    if (data.success) {
      
      const token = await this.jwtService.signAsync(userdata.email);
      return response
        .status(201)
        .json({
          success: true,
          message: `User login successfully...`,
          token: token,
        });
    } else {
      return generalResponse(
        response,
        data.statusCode,
        false,
        data.message,
        data.result,
      );
    }
  }

  @UseGuards(AuthGaurd)
  @ApiTags("User")
  @Get()
  async userProfile(@Req() req:IRequest, @Res() res:Response) {
    const data = await this.usersService.getUserProfile(req.user.id);
    return fetchResponseFunc(res,data,data.message)
  }




}
