import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MatchService } from '../service/match-service.service';
import { Match } from '../models/match.interface';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';

@Controller('match')
export class MatchControllerController {
  constructor(
    private matchService: MatchService,
    private readonly jwtService: JwtService
    ){}

  @UseGuards(JwtGuard)
  @Roles(Role.ATHLETE || Role.MANAGER)
  @Post()
  createMatch(@Body(){ athlete1Id, match, athlete2Id }: { athlete1Id: string, match: Match, athlete2Id: string }): Promise<Observable<Match>> {
    return this.matchService.createMatch(match, athlete1Id, athlete2Id);
  }

  @UseGuards(JwtGuard)
  @Get()
  findAllMatches(): Observable<Match[]>{
    return this.matchService.findAllMatches()
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findMatchById(@Param('id') id: string): Observable<Match>{
    return this.matchService.findById(id)
  }

  @UseGuards(JwtGuard)
  @Roles(Role.MANAGER)
  @Put(':id')
  changeMatch(@Param('id') id: string, @Body() match:Match){
    return this.matchService.changeMatch(id, match);
  }

  @UseGuards(JwtGuard)
  @Roles(Role.MANAGER)
  @Delete(':id')
  deleteMatch(@Param('id') id: string,){
    return this.matchService.deleteMatch(id);
  }

  @UseGuards(JwtGuard)
  @Roles(Role.MANAGER)
  @Post('/score/:id')
  addPoints(@Body() { athleteId, pointsOnSet }: { athleteId: string, pointsOnSet: number }, @Param('id') matchId: string){
    return this.matchService.addPlayerScore(athleteId, pointsOnSet, matchId);
  }

  @UseGuards(JwtGuard)
  @Roles(Role.MANAGER)
  @Get('/winner/:id')
  findMatchWinner(@Param('id') matchId: string){
    return this.matchService.findWinner(matchId);
  }

}
