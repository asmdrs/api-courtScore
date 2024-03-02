import { Module } from '@nestjs/common';
import { MatchControllerController } from './controller/match-controller.controller';
import { MatchService } from './service/match-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchEntity } from './models/match.entity';
import { AthleteEntity } from 'src/athlete/models/athlete.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([MatchEntity, AthleteEntity])],
  controllers: [MatchControllerController],
  providers: [MatchService, JwtService],
  exports: [MatchService]
})
export class MatchModule {}
