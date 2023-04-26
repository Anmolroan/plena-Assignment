import { ApiProperty } from "@nestjs/swagger";
import {IsEmail,IsString,IsNotEmpty,Length, IsOptional, IsUUID} from "class-validator";


export class CreateUserDto {
    @ApiProperty({
        description: 'The username of the User',
        example: 'aakaroan',
      })
    @IsNotEmpty()
    @IsString()
    public username: string;

    @ApiProperty({
        description: 'The password of the User',
        example: '******',
      })
    @IsNotEmpty()
    @IsString()
    @Length(3,20,{message: "Password should be at between 3 and 20 characters"})
    public password: string;

    @ApiProperty({
        description: 'creation date',
        example: "date in string format",
      })
    @IsOptional()
    public createdAt :string

    @ApiProperty({
        description: 'updation date',
        example: "date in string format",
      })
    @IsOptional()
    public updatedAt :string


}
