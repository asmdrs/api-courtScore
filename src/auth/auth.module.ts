import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guard/jwt.guard';
import { JwtStrategy } from './guard/jwt.strategy';
import { config } from 'dotenv';
import { AthleteModule } from 'src/athlete/athlete.module';
import { AthleteEntity } from 'src/athlete/models/athlete.entity';
import { TournamentManagerEntity } from 'src/tournament-manager/models/tournamentManager.entity';
config();
@Module({
  imports: [
    JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '10800s'},
    }),
     TypeOrmModule.forFeature([UserEntity]),
     TypeOrmModule.forFeature([AthleteEntity]),
     TypeOrmModule.forFeature([TournamentManagerEntity]),
    AthleteModule
    ],
  providers: [AuthService, JwtGuard, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
