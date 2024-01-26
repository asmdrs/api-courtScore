import { Module } from '@nestjs/common';
import { TournamentManagerService } from './service/tournament-manager.service';
import { TournamentManagerController } from './controller/tournament-manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentManagerEntity } from './models/tournamentManager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentManagerEntity])],
  providers: [TournamentManagerService],
  controllers: [TournamentManagerController],
  exports: [TournamentManagerService]
})
export class TournamentManagerModule {}
