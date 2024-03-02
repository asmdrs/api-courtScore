import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { GroupService } from '../service/group.service';
import { JwtService } from '@nestjs/jwt';
import { Repository, UpdateResult } from 'typeorm';
import { of } from 'rxjs';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GroupEntity } from '../models/group.entity';

describe('GroupController', () => {
  let controller: GroupController;
  let service: GroupService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [
        JwtService,
        {
          provide: GroupService,
          useClass: GroupService,
          useValue:{
            changeGroup: jest.fn(() => of({} as UpdateResult))
          }
        },
          {
            provide: getRepositoryToken(GroupEntity),
            useClass: Repository
          }
      ]
    }).compile();

    controller = module.get<GroupController>(GroupController);
    service = module.get<GroupService>(GroupService);
    jwtService = module.get<JwtService>(JwtService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create new group', () => {
    const groupData = 
    { 
      id:"123",
      name: 'Group',
    };
    const result = of(groupData);
    jest.spyOn(service, 'createGroup').mockReturnValue(result);

    expect(controller.createGroup(groupData)).toEqual(result);
  });

  it('should find all groups ', () => {
    const groupData = 
    { 
      id:"123",
      name: 'Group',
    };
    const result = of(groupData);
    jest.spyOn(service, 'createGroup').mockReturnValue(result);

    expect(controller.createGroup(groupData)).toEqual(result);
  });
});
