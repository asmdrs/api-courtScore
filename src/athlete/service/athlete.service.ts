import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AthleteEntity } from '../models/athlete.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Athlete } from '../models/athlete.interface';
import { Observable, from, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class AthleteService {
  constructor (
    @InjectRepository(AthleteEntity)
    private readonly athleteRepository: Repository<AthleteEntity>
    ) {}

    createAthlete(athlete: Athlete): Observable<Athlete> {
      return from(this.athleteRepository.save(athlete));
    }

    findAllAthletes(): Observable<Athlete[]> {
      return from(this.athleteRepository.find())
    }

    findById(id: string): Observable<Athlete | undefined> {
      return from(this.athleteRepository.findOneBy({ id }));    
    }

    findByGroup(userId: string): Observable<Athlete[] | undefined> {
      return from(this.athleteRepository.findOne({ where: { user: { id: userId } } })).pipe(
        switchMap(userAthlete => {
          if (!userAthlete) {
            return of(null);
          } else {
            return from(this.athleteRepository.find({where: {groupId: userAthlete.groupId}}));
          }
        })
      );
    }

    changeAthlete(id: string, athlete: AthleteEntity, userId: string): Observable<UpdateResult> {
      return from(this.athleteRepository.findOne({ where: { user: { id: userId } } })).pipe(
        switchMap(userAthlete => {
          if (!userAthlete || userAthlete.id !== id) {
            return of(null);
          } else {
            return from(this.athleteRepository.update(id, athlete));
          }
        })
      );
    }
    
    deleteAthlete(id:string): Observable<DeleteResult>{
      return from(this.athleteRepository.delete(id));
    }
}
