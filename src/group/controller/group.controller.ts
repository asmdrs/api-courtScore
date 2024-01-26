import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Group } from '../models/group.interface';
import { GroupService } from '../service/group.service';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService ){}

  @Post()
  createGroup(@Body() group: Group): Observable<Group> {
    return this.groupService.createGroup(group);
  }

  @Get()
  findAllGroups(): Observable<Group[]> {
    return this.groupService.findAllGroups();
  }
  
  @Put(':id')
  changeGroup(@Param('id') id: string, @Body() group: Group): Observable<UpdateResult> {
    return this.groupService.changeGroup(id, group);
  }

  @Delete(':id')
  deleteGroup(@Param('id') id: string): Observable<DeleteResult> {
    return this.groupService.deleteGroup(id);
  }
}
