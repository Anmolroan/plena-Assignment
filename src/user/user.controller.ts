import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';

import { Response, Request } from 'express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.services';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@ApiBearerAuth()
@ApiTags('User Api')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) 
  {}

  @Post('signup')
  @ApiOperation({
    summary: 'create a user',
    description: 'Takes the request body and will create a user',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @Post('signin')
  @ApiOperation({
    summary: 'signin a user',
    description:
      'This will take the email and password and validate it ,After validation it will create a token and return it',
  })
  async signin(
    @Body() req: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = this.userService.signin(req);
    //  const jwt = await this.jwtService.signAsync({username:req.username})
    //  response.cookie('jwt',jwt,{httpOnly:true})
    return user
  }
}
