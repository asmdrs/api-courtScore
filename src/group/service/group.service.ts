import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { GroupEntity } from '../models/group.entity';
import { Group } from '../models/group.interface';
import { Observable, from } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupService {
  constructor (
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>
    ) {}

    createGroup(group: Group): Observable<Group> {
      return from(this.groupRepository.save(group));
    }

    findAllGroups(): Observable<Group[]> {
      return from(this.groupRepository.find())
    }

    findById(id: string): Observable<Group | undefined> {
      return from(this.groupRepository.findOneBy({ id }));
      
    }

    changeGroup(id: string, group: Group): Observable<UpdateResult> {
      return from(this.groupRepository.update(id, group))
    }

    deleteGroup(id:string): Observable<DeleteResult>{
      return from(this.groupRepository.delete(id));
    }
}
