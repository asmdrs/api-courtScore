import { Test, TestingModule } from '@nestjs/testing';
import { AthleteController } from './athlete.controller';
import { AthleteService } from '../service/athlete.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AthleteEntity } from '../models/athlete.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Observable, of } from 'rxjs';

describe('AthleteController', () => {
  let controller: AthleteController;
  let athleteService: AthleteService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AthleteController],
      providers: [
        JwtService,
        {
          provide: AthleteService,
          useClass: AthleteService,
          useValue:
         { changeAthlete: jest.fn(() => of({} as UpdateResult))},
        },
        {
          provide: getRepositoryToken(AthleteEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AthleteController>(AthleteController);
    athleteService = module.get<AthleteService>(AthleteService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createAthlete', () => {
    it('should create a new athlete', () => {
      const athleteData = 
      { 
        id:"123",
        name: 'John Doe',
        groupId: '12345' 
      };
      const result = of(athleteData);
      jest.spyOn(athleteService, 'createAthlete').mockReturnValue(result);

      expect(controller.createAthlete(athleteData)).toEqual(result);
    });

    it('should find all athletes', () => {
      const athleteData = [ 
      { 
        id:"123",
        name: 'John Doe',
        groupId: '12345' 
      }
    ];
      const result = of(athleteData);
      jest.spyOn(athleteService, 'findAllAthletes').mockReturnValue(result);

      expect(controller.findAllAthletes()).toEqual(result);
    });

    it('should change the athlete', () => {
      const req = { headers: { authorization: 'Bearer valid-token' } };
  
      const decodedToken = { sub: 'user-id' };
  
      jest.spyOn(jwtService, 'decode').mockReturnValue(decodedToken);
  
      const athleteData = {} as AthleteEntity;
  

      const updateResult: UpdateResult = { raw:0, affected: 1, generatedMaps:[] };
      jest.spyOn(athleteService, 'changeAthlete').mockReturnValue(of(updateResult));
  
      const result = controller.changeAthlete('athlete-id', athleteData, req);
  
      expect(result).toBeInstanceOf(Observable);
  
    });

    it('should delete the athlete', () => {

      const deleteResult: DeleteResult = { raw:0, affected: 1 };
      jest.spyOn(athleteService, 'deleteAthlete').mockReturnValue(of(deleteResult));
  
      const result = controller.deleteAthlete('athlete-id');
  
      expect(result).toBeInstanceOf(Observable);
  
    });

  });
});