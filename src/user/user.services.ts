import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    try{
      const uniqueRecords: any = await this.prisma.user.findMany({
        where: {
          username: username,
        },
        distinct: ['username'],
      });
      console.log(uniqueRecords);
      if (uniqueRecords.length>0) {
        throw new HttpException('User is already present for the specific class', HttpStatus.CONFLICT)
      }
      const {password,...restProps} = await this.prisma.user.create({
        data: { ...createUserDto,updatedAt:new Date().toISOString(),createdAt:new Date().toISOString()},
      });
      

      return restProps;
    }catch(err){
      throw new HttpException(err.response, err.status)
    }
    }
 


  // async findOne(id: string) {
  //   const teacher = await this.prisma.teacher.findUnique({
  //     where: {
  //       teacher_id: id,
  //     },
  //   });
  //   if (!teacher) {
  //     throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
      
  //   }
  //   return teacher;
  // }

  async signin(req:any) {
    const {username, password} =req
    const user= await this.prisma.user.findMany({
      where: {
        username: username,
        password: password,
      },
    });
    if (!user) {
      throw new HttpException('Teacher not found', HttpStatus.NOT_FOUND);
      
    }
    // const user ={email,password:hash_password}
    const token = jwt.sign({ user_id: user[0].id }, process.env.JWT_SECRET);
    return{ user:user[0],token};

  }




}
