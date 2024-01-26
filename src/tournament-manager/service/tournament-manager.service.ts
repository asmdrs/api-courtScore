import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { TournamentManagerEntity } from '../models/tournamentManager.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TournamentManager } from '../models/tournamentManager.interface';
import { Observable, from } from 'rxjs';

@Injectable()
export class TournamentManagerService {
  constructor(
    @InjectRepository(TournamentManagerEntity)
    private readonly tournamentManagerRepository: Repository<TournamentManagerEntity>
  ) {}

  create(tournamentManager: TournamentManager): Observable<TournamentManager> {
    return from(this.tournamentManagerRepository.save(tournamentManager));
  }

  findById(id: string): Observable<TournamentManager | undefined> {
    return from(this.tournamentManagerRepository.findOneBy({ id }));
  }

  changeTournamentManager(id: string, tournamentManager: TournamentManager): Observable<UpdateResult> {
    return from(this.tournamentManagerRepository.update(id, tournamentManager))
  }

  deleteTournamentManager(id: string): Observable<DeleteResult> {
    return from(this.tournamentManagerRepository.delete(id));
  }
}
