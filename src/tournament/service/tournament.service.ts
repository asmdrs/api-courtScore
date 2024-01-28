import { Injectable } from '@nestjs/common';
import { TournamentEntity } from '../models/tournament.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Tournament } from '../models/tournament.interface';
import { AthleteEntity } from 'src/athlete/models/athlete.entity';
import { Observable, from } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { CupPhaseEntity } from 'src/cup-phase/models/cupPhase.entity';
import { PhaseName } from 'src/shared/enums/PhaseName.enum';
import { Athlete } from 'src/athlete/models/athlete.interface';
import { Match } from 'src/match/models/match.interface';
import { MatchEntity } from 'src/match/models/match.entity';


@Injectable()
export class TournamentService {
  
  constructor(
    @InjectRepository(TournamentEntity)
    private readonly tournamentRepository: Repository<TournamentEntity>,
    @InjectRepository(AthleteEntity)
    private readonly athleteRepository: Repository<AthleteEntity>,
    @InjectRepository(CupPhaseEntity)
    private readonly phaseRepository: Repository<CupPhaseEntity>,
    @InjectRepository(MatchEntity)
    private readonly matchRepository: Repository<MatchEntity>,
  ){}

   async createTournament(athleteIds: string[], tournament: Tournament): Promise<Observable<Tournament>> {
    let newTournament = tournament;
    let athletes = [];
  
    let stringId = athleteIds;

    const promises = stringId.map(async (id) => {
      const athlete = await this.athleteRepository.findOneBy({ id: id });
      return athlete;
    });

    athletes = await Promise.all(promises);
    newTournament.athletes = athletes;

    const savedTournament = await this.tournamentRepository.save(newTournament);
    return from([savedTournament])
  }

  getAllTournaments(): Observable<Tournament[]>{
    return from(this.tournamentRepository.find())
  }

  findTournamentById(id: string): Observable<Tournament>{
    return from(this.tournamentRepository.findOne({where: {id},
      relations: ['athletes', 'phases', 'tournamentManager', 'group']
    }));
  }

  deleteTournament(id: string): Observable<DeleteResult> {
    return from(this.tournamentRepository.delete(id));
  }

  changeTournament(id: string, tournament:Tournament):Observable<UpdateResult>{
    return from(this.tournamentRepository.update(id, tournament));
  }

  async addPhasesToTournament(tournamentId: string): Promise<Observable<Tournament>> {
    let tournament: Tournament = await this.tournamentRepository.findOne({where: {id: tournamentId},
      relations: ['athletes', 'phases', 'tournamentManager', 'group']
    });

    let data: Date = new Date()
    if (!tournament.phases.length) {
      tournament.phases = [];
      
      let newPhase = {
        phaseName: PhaseName.OCT,
        matches: await this.matchesGenerator(tournament)
      }

      let phase = await this.phaseRepository.save(newPhase);
      tournament.phases.push(phase);
    } else {

      let lastPhase = tournament.phases[tournament.phases.length - 1].phaseName;
      let newPhaseName: PhaseName;
  
      switch (lastPhase) {
        case PhaseName.OCT:
          newPhaseName = PhaseName.QUART;
          break;
        case PhaseName.QUART:
          newPhaseName = PhaseName.SEMI;
          break;
        case PhaseName.SEMI:
          newPhaseName = PhaseName.FIN;
          break;
        default:
          break;
      }

      let newPhase = {
        phaseName: newPhaseName,
        matches: await this.matchesGenerator(tournament)
      }
      let phase = await this.phaseRepository.save(newPhase);
      tournament.phases.push(phase);
    }
    return from(this.tournamentRepository.save(tournament));
  }


  async matchesGenerator(tournament: Tournament): Promise<Match[]> {
    let randomizedAthletes:  Athlete[] = [];
    let validMatches: Match [] = [];

    if(!tournament.phases.length) {
      let validAthletes: Athlete[] = tournament.athletes;
      randomizedAthletes = this.shuffleArray(validAthletes);
    } 
    else {
      let lastPhase = await this.phaseRepository.findOne({where: {id: tournament.phases[tournament.phases.length - 1].id},
        relations: ['matches']})

      let validPLayers: Athlete[] = [];
      for(let i = 0; i < lastPhase.matches.length; i++){
        let lastPhaseMatch: Match = await this.matchRepository.findOne({where: {id: lastPhase.matches[i].id}, relations: ['winner']});
        validPLayers.push(lastPhaseMatch.winner);
      }
     randomizedAthletes = this.shuffleArray(validPLayers);
    }

    const startDate = new Date();
    for(let i=0; i < randomizedAthletes.length; i+=2) {
      const athlete1 = randomizedAthletes[i];
      const athlete2 = randomizedAthletes[i + 1];

      const newMatch = {
        athlete1: athlete1,
        athlete2: athlete2,
        date: startDate, 
      }

      const savedMatch = await this.matchRepository.save(newMatch);
      validMatches.push(savedMatch);

    }
    return validMatches;   
  }


  private shuffleArray(array: any[]): any[] {
    const shuffledArray = array.slice();
  
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
  
    return shuffledArray;
  }
}
