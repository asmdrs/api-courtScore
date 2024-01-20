import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { AthleteEntity } from '../models/athlete.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Athlete } from '../models/athlete.interface';
import { Observable, from } from 'rxjs';

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

    changeAthlete(id: string, athlete: Athlete): Observable<UpdateResult> {
      return from(this.athleteRepository.update(id, athlete))
    }

    deleteAthlete(id:string): Observable<DeleteResult>{
      return from(this.athleteRepository.delete(id));
    }
}
