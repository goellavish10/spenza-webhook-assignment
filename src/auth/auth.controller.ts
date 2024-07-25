import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDTO } from './dto/SignUp.dto';
import { LoginUserDTO } from './dto/Login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() signUpUserDTO: SignUpUserDTO) {
    return this.authService.signup(signUpUserDTO);
  }

  @Post('login')
  async login(@Body() loginUserDTO: LoginUserDTO) {
    return this.authService.login(loginUserDTO);
  }
}
