import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthleteModule } from './athlete/athlete.module';
import { AuthModule } from './auth/auth.module';
import { TournamentManagerModule } from './tournament-manager/tournament-manager.module';
import { GroupModule } from './group/group.module';
import { MatchModule } from './match/match.module';
import { CupPhaseModule } from './cup-phase/cup-phase.module';
import { TournamentModule } from './tournament/tournament.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRE_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AthleteModule,
    AuthModule,
    TournamentManagerModule,
    GroupModule,
    MatchModule,
    CupPhaseModule,
    TournamentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
