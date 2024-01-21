import { Body, Controller, Post  } from '@nestjs/common';
import { User } from '../models/user.interface';
import { Observable  } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Athlete } from 'src/athlete/models/athlete.interface';


@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('register')
  registerNewUser(@Body() payload: { user: User; athlete?: Athlete }): Observable<User> {
    const { user, athlete } = payload;
    return this.authService.registerNewAccount(user, athlete);
  }

  @Post('login')
  login(@Body() user: User): Promise<string > | null {
    return this.authService.login(user)
  }

}
