import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpUserDTO } from './dto/SignUp.dto';
import { UsersService } from 'src/users/users.service';
import { LoginUserDTO } from './dto/Login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDTO: LoginUserDTO) {
    const user = await this.usersService.findOneByUserName(
      loginUserDTO.username,
    );
    if (
      !user ||
      !(await bcrypt.compare(loginUserDTO.password, user.password))
    ) {
      throw new HttpException('Invalid credentials', 401);
    }
    const payload = {
      username: loginUserDTO.username,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signUpUserDTO: SignUpUserDTO) {
    const userExists = await this.usersService.findOneByUserName(
      signUpUserDTO.username,
    );
    if (userExists) {
      throw new HttpException('User already exists', 409);
    }
    const hashedPassword = await bcrypt.hash(signUpUserDTO.password, 10);
    signUpUserDTO.password = hashedPassword;
    this.usersService.create(signUpUserDTO);
    return {
      access_token: this.jwtService.sign({
        username: signUpUserDTO.username,
      }),
    };
  }
}
