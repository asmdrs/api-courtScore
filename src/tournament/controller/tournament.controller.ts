import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TournamentService } from '../service/tournament.service';
import { Tournament } from '../models/tournament.interface';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';

@Controller('tournament')
export class TournamentController {
  constructor( 
    private tournamentService: TournamentService,
    private readonly jwtService: JwtService
    ){}

  @UseGuards(JwtGuard)
  @Roles(Role.MANAGER)
  @Post()
  createTournament(@Body(){athleteIds, tournament}:{athleteIds: string[], tournament: Tournament}){
   return this.tournamentService.createTournament(athleteIds, tournament);
  }

  @UseGuards(JwtGuard)
  @Roles(Role.MANAGER)
  @Post('/phase/:id')
  addPhasesToTournament(@Param('id') tournamentId ){
    return this.tournamentService.addPhasesToTournament(tournamentId)
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  getTournamentsById(@Param('id') id: string){
    return this.tournamentService.findTournamentById(id)
  }

  @UseGuards(JwtGuard)
  @Get()
  getAllTournaments(){
    return this.tournamentService.getAllTournaments()
  }

  @UseGuards(JwtGuard)
  @Roles(Role.MANAGER)
  @Put(':id')
  changeTournament(@Param('id') id: string, @Body() tournament:Tournament){
    return this.tournamentService.changeTournament(id, tournament);
  }

  @UseGuards(JwtGuard)
  @Roles(Role.MANAGER)
  @Delete(':id')
  deleteTournament(@Param('id') id: string){
    return this.tournamentService.deleteTournament(id)
  }

}
