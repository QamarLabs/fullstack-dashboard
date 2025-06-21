import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './auth/register.dto';
import { LoginDto } from './auth/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './auth/user.schema';
import { Model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async register(registerDto: RegisterDto) {
    const { email, password, profileImg } = registerDto;

    console.log('password:', password)
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Hash password
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    // Create new user
    const newUser = new this.userModel({
      email,
      password: hashedPassword,
      profileImg,
    });

    // Save user to database
    const user = await newUser.save();

    // Return user data without password
    const { password: _, ...result } = user.toObject();
    return result;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare passwords
    const isPasswordValid = await compare(password, user.password);
    console.log('isPasswordValid');
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Return user data without password
    const { password: _, ...result } = user.toObject();
    return result;
  }
}
