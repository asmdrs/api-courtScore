import { Module } from '@nestjs/common';
import { CupPhaseEntity } from './models/cupPhase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CupPhaseEntity])],
})
export class CupPhaseModule {

}
