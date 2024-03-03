import { Module } from '@nestjs/common';
import { AthleteService } from './service/athlete.service';
import { AthleteController } from './controller/athlete.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AthleteEntity } from './models/athlete.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ TypeOrmModule.forFeature([AthleteEntity])],
  providers: [AthleteService, JwtService],
  controllers: [AthleteController],
  exports: [AthleteService]
})
export class AthleteModule {}
