import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
  Patch,
  UseInterceptors,
  UploadedFile,
  Logger,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto, FindUser } from './dto/create-user.dto';
import { generalResponse } from 'src/helper/generalResponseFunction';
import { fetchResponseFunc } from 'src/helper/genralFunction';
import { JwtService } from '@nestjs/jwt';
import { AuthGaurd } from './user.gaurd';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IRequest, tempI } from 'src/types/generalInterface';
import { profilepicDTO, UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/file.validator';

@ApiTags("User")
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  @Post('registration')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiCreatedResponse()
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBody({
    type: CreateUserDto,
  })
  async register(@Body() userData: CreateUserDto, @Res() res: Response) {
    const data = await this.usersService.create(userData);
    fetchResponseFunc(res, data, data.message);
  }

  @Post('login')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({ status: 201, description: 'User logged in successfully' })
  async login(@Body() userdata: FindUser, @Res() response: Response) {
    const data = await this.usersService.verifyUser(userdata);

    if (data.success) {
      const token = await this.jwtService.signAsync(userdata.email);
      return response.status(201).json({
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

  @ApiBearerAuth()
  @UseGuards(AuthGaurd)
  @Get('profile')
  async userProfile(@Req() req: IRequest, @Res() res: Response) {
    const data = await this.usersService.getUserProfile(req.user.id);
    return fetchResponseFunc(res, data, data.message);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGaurd)
  @Patch('profile/update')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({ status: 201, description: 'User updated in successfully' })
  async updateProfile(
    @Req() req: IRequest,
    @Res() res: Response,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const id = req.user.id;
    const data = await this.usersService.update(id, updateUserDto);
    return fetchResponseFunc(res, data, data.message);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGaurd)
  @Post('profile/pic')
  @ApiBody({type: profilepicDTO})
  @ApiConsumes('multipart/form-data')

  @UseInterceptors(FileInterceptor('file', multerOptions("profilePic")))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req:IRequest, @Res() res:Response) {
    const id = req.user.id
    const data =await this.usersService.profilePicUpload(file.path,id )
    return fetchResponseFunc(res,data, data.message);
  }
}
