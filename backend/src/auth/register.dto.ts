// src/auth/dto/register.dto.ts
import { IsEmail, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class RegisterDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsOptional()
    profileImg?: string;
}