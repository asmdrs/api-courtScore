import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentEntity } from './models/tournament.entity';
import { TournamentController } from './controller/tournament.controller';
import { TournamentService } from './service/tournament.service';
import { AthleteEntity } from 'src/athlete/models/athlete.entity';
import { AthleteService } from 'src/athlete/service/athlete.service';
import { CupPhaseEntity } from 'src/cup-phase/models/cupPhase.entity';
import { MatchEntity } from 'src/match/models/match.entity';
import { GroupEntity } from 'src/group/models/group.entity';
import { TournamentManagerEntity } from 'src/tournament-manager/models/tournamentManager.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ TypeOrmModule.forFeature([TournamentEntity, AthleteEntity, CupPhaseEntity, MatchEntity,GroupEntity, TournamentManagerEntity])],
  controllers: [TournamentController],
  providers: [TournamentService, AthleteService, , JwtService]
})
export class TournamentModule {}
