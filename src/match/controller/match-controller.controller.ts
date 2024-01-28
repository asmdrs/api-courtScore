import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { MatchService } from '../service/match-service.service';
import { Match } from '../models/match.interface';
import { Observable } from 'rxjs';

@Controller('match')
export class MatchControllerController {
  constructor(private matchService: MatchService){}

  @Post()
  createMatch(@Body(){ athlete1Id, match, athlete2Id }: { athlete1Id: string, match: Match, athlete2Id: string }): Promise<Observable<Match>> {
    return this.matchService.createMatch(match, athlete1Id, athlete2Id);
  }

  @Get()
  findAllMatches(): Observable<Match[]>{
    return this.matchService.findAllMatches()
  }

  @Get(':id')
  findMatchById(@Param('id') id: string): Observable<Match>{
    return this.matchService.findById(id)
  }

  @Put(':id')
  changeMatch(@Param('id') id: string, @Body() match:Match){
    return this.matchService.changeMatch(id, match);
  }

  @Delete(':id')
  deleteMatch(@Param('id') id: string,){
    return this.matchService.deleteMatch(id);
  }

  @Post('/score/:id')
  addPoints(@Body() { athleteId, pointsOnSet }: { athleteId: string, pointsOnSet: number }, @Param('id') matchId: string){
    return this.matchService.addPlayerScore(athleteId, pointsOnSet, matchId);
  }

  @Get('/winner/:id')
  findMatchWinner(@Param('id') matchId: string){
    return this.matchService.findWinner(matchId);
  }

}
