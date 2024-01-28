import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TournamentService } from '../service/tournament.service';
import { Tournament } from '../models/tournament.interface';

@Controller('tournament')
export class TournamentController {
  constructor( private tournamentService: TournamentService){}

  @Post()
  createTournament(@Body(){athleteIds, tournament}:{athleteIds: string[], tournament: Tournament}){
   return this.tournamentService.createTournament(athleteIds, tournament);
  }

  @Post('/phase/:id')
  addPhasesToTournament(@Param('id') tournamentId ){
    return this.tournamentService.addPhasesToTournament(tournamentId)
  }

  @Get(':id')
  getTournamentsById(@Param('id') id: string){
    return this.tournamentService.findTournamentById(id)
  }

  @Get()
  getAllTournaments(){
    return this.tournamentService.getAllTournaments()
  }

  @Put(':id')
  changeTournament(@Param('id') id: string, @Body() tournament:Tournament){
    return this.tournamentService.changeTournament(id, tournament);
  }

  @Delete(':id')
  deleteTournament(@Param('id') id: string){
    return this.tournamentService.deleteTournament(id)
  }

}
