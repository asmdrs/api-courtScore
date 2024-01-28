import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { MatchEntity } from '../models/match.entity';
import { Observable, catchError, from, switchMap, throwError } from 'rxjs';
import { Match } from '../models/match.interface';
import { AthleteEntity } from 'src/athlete/models/athlete.entity';


@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(MatchEntity)
    private readonly matchRepository: Repository<MatchEntity>,
    @InjectRepository(AthleteEntity)
    private readonly athleteRepository: Repository<AthleteEntity>
  ){}

  async createMatch(match: Match, athlete1Id: string, athlete2Id: string): Promise<Observable<Match>> {
    let athlete1 = await this.athleteRepository.findOneBy({id: athlete1Id})
    let athlete2 = await this.athleteRepository.findOneBy({id: athlete2Id})
    match.athlete1 = athlete1;
    match.athlete2 = athlete2;
    const newMatch = this.matchRepository.create(match);
    return from(this.matchRepository.save(newMatch));
  }

  findAllMatches(): Observable<Match[]> {
    return from(this.matchRepository.find())
  }

  findById(id: string): Observable<Match | undefined> {
   return from(this.matchRepository.findOneOrFail( {where: { id }, relations: ['athlete1', 'athlete2']})).pipe(
    catchError((error) => {
      if (error.name === 'EntityNotFound'){
        return [undefined]
      }
      throw error;
    })
   )
  }

  changeMatch(id: string, match: Match): Observable<UpdateResult> {
    return from(this.matchRepository.update(id, match))
  }

  deleteMatch(id:string): Observable<DeleteResult>{
    return from(this.matchRepository.delete(id));
  }

  addPlayerScore(athleteId: string, pointsOnSet: number, matchId: string): Observable<MatchEntity> {
    return this.findById(matchId).pipe(
      switchMap((currentMatch) => {
        if (!currentMatch) {
          throw new NotFoundException(`Match with ID ${matchId} not found`);
        }
      
        if (!currentMatch.athlete1 || !currentMatch.athlete2) {
          throw new NotFoundException(`Athletes not found for the match with ID ${matchId}`);
        }
      
        currentMatch.player1Score = currentMatch.player1Score || [];
        currentMatch.player2Score = currentMatch.player2Score || [];
      
        if (currentMatch.athlete1.id === athleteId) {
          currentMatch.player1Score.push(pointsOnSet);
        } else if (currentMatch.athlete2.id === athleteId) {
          currentMatch.player2Score.push(pointsOnSet);
        } else {
          throw new NotFoundException(`Athlete with ID ${athleteId} not found in the match`);
        }
      
        currentMatch.player1Score = [...currentMatch.player1Score];
        currentMatch.player2Score = [...currentMatch.player2Score];
      
        return from(this.matchRepository.save(currentMatch));
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    );
  }
  
  findWinner(matchId: string): Observable<Match>{
    return this.findById(matchId).pipe(
      switchMap((currentMatch) =>{
        if(!currentMatch){
          return throwError(new NotFoundException(`Match with ID ${matchId} not found`));
        }
        let sets1Won = 0
        let sets2Won = 0
        for(let i = 0; i < currentMatch.player1Score.length; i++){
          currentMatch.player1Score[i] > currentMatch.player2Score[i] ? sets1Won++ : sets2Won++;
        }
        if(sets1Won > sets2Won) {
          currentMatch.winner = currentMatch.athlete1
        } else {
          currentMatch.winner = currentMatch.athlete2
        }
        return from (this.matchRepository.save(currentMatch));
      })
    )
  }
}
