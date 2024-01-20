import { Body, Controller, Post } from '@nestjs/common';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('register')
  registerNewUser(@Body() user: User): Observable<User> {
    return this.authService.registerNewAccount(user);
  }
}
