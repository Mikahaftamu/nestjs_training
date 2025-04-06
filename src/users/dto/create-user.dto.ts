import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {

    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description: 'The email of the user',
        example: 'john.doe@example.com',
    })
    email: string;

    @IsNotEmpty()
    @IsEnum(Role)
    @ApiProperty({
        description: 'The role of the user',
        example: 'USER',
    })
    role: "ADMIN" | "USER"; 
}
