import { Body, Controller, Post  } from '@nestjs/common';
import { User } from '../models/user.interface';
import { Observable  } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Athlete } from 'src/athlete/models/athlete.interface';
import { TournamentManager } from 'src/tournament-manager/models/tournamentManager.interface';


@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('register-athlete')
  registerNewUserAthlete(@Body() payload: { user: User; athlete?: Athlete; }): Observable<User> {
    const { user, athlete } = payload;
    return this.authService.registerNewAccount(user, athlete);
  }

  @Post('register-manager')
  registerNewUserManager(@Body() payload: { user: User; manager?: TournamentManager; }): Observable<User> {
    const { user, manager } = payload;
    return this.authService.registerNewManagerAccount(user, manager);
  }

  @Post('login')
  login(@Body() user: User): Promise<string > | null {
    return this.authService.login(user)
  }

}
