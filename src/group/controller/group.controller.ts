import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Group } from '../models/group.interface';
import { GroupService } from '../service/group.service';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from '../../auth/guard/jwt.guard';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../auth/models/role.enum';

@Controller('group')
export class GroupController {
  constructor(
    private groupService: GroupService,
    private readonly jwtService: JwtService
     ){}

  @UseGuards(JwtGuard)
  @Roles(Role.MANAGER || Role.ADMIN)
  @Post()
  createGroup(@Body() group: Group): Observable<Group> {
    return this.groupService.createGroup(group);
  }

  @UseGuards(JwtGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAllGroups(): Observable<Group[]> {
    return this.groupService.findAllGroups();
  }
  
  @UseGuards(JwtGuard)
  @Roles(Role.MANAGER || Role.ADMIN)
  @Put(':id')
  changeGroup(@Param('id') id: string, @Body() group: Group): Observable<UpdateResult> {
    return this.groupService.changeGroup(id, group);
  }

  @UseGuards(JwtGuard)
  @Roles(Role.MANAGER || Role.ADMIN)
  @Delete(':id')
  deleteGroup(@Param('id') id: string): Observable<DeleteResult> {
    return this.groupService.deleteGroup(id);
  }
}
