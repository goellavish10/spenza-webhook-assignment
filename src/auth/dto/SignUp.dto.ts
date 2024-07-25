import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpUserDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
