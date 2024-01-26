import { Module } from '@nestjs/common';
import { GroupService } from './service/group.service';
import { GroupController } from './controller/group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from './models/group.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([GroupEntity])],
  providers: [GroupService],
  controllers: [GroupController],
  exports: [GroupService]
})
export class GroupModule {}
