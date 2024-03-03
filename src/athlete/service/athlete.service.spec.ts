import { Test, TestingModule } from '@nestjs/testing';
import { AthleteService } from './athlete.service';
import { AthleteEntity } from '../models/athlete.entity';
import { Repository, UpdateResult } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Observable, lastValueFrom, of, throwError } from 'rxjs';

describe('AthleteService', () => {
  let service: AthleteService;
  let repository: Repository<AthleteEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AthleteService,
        {
          provide: getRepositoryToken(AthleteEntity),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AthleteService>(AthleteService);
    repository = module.get<Repository<AthleteEntity>>(getRepositoryToken(AthleteEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Athlete CRUD', () => {
    it('should save an athlete', () => {
      const athleteData = {} as AthleteEntity;
      jest.spyOn(repository, 'save').mockReturnValueOnce(lastValueFrom(of(athleteData)));

      const result = service.createAthlete(athleteData);

      expect(result).toBeInstanceOf(Observable);
    });

    it('should find all athletes', () => {
      const athleteData = [] as AthleteEntity[];
      jest.spyOn(repository, 'find').mockReturnValueOnce(lastValueFrom(of(athleteData)));

      const result = service.findAllAthletes();

      expect(result).toBeInstanceOf(Observable);
    });

    it('should find athletes by id', () => {
      const athleteData = {} as AthleteEntity;
      jest.spyOn(repository, 'findOneBy').mockReturnValueOnce(lastValueFrom(of(athleteData)));

      const result = service.findById("123");

      expect(result).toBeInstanceOf(Observable);
    });

    it('should change athletes', () => {
      const athleteData = {} as AthleteEntity;
      jest.spyOn(repository, 'findOneBy').mockReturnValueOnce(lastValueFrom(of(athleteData)));

      const result = service.findById("123");

      expect(result).toBeInstanceOf(Observable);
    });

    it('should return null if user athlete is not found', (done) => {
      jest.spyOn(repository, 'findOne').mockReturnValueOnce(lastValueFrom(of(null)));
  
      service.changeAthlete('athleteId', new AthleteEntity(), 'userId').subscribe((result) => {
        expect(result).toBeNull();
        done();
      });
    });
  
    it('should update athlete if user athlete is found and ID matches', (done) => {
      const athlete = new AthleteEntity();
      athlete.id = 'athleteId';
      jest.spyOn(repository, 'findOne').mockReturnValueOnce(lastValueFrom(of(athlete)));
      jest.spyOn(repository, 'update').mockReturnValueOnce(lastValueFrom(of({} as UpdateResult)));
  
      service.changeAthlete('athleteId', athlete, 'userId').subscribe((result) => {
        expect(result).toEqual({} as UpdateResult);
        done();
      });
    });

  });
});
