import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TournamentManagerService } from '../service/tournament-manager.service';
import { TournamentManager } from '../models/tournamentManager.interface';
import { Observable } from 'rxjs';
import { DeleteResult } from 'typeorm';

@Controller('tournament-manager')
export class TournamentManagerController {
  constructor(private tournamentManagerService: TournamentManagerService) {}

  @Post()
  create(@Body() tournamentManager: TournamentManager): Observable<TournamentManager> {
    return this.tournamentManagerService.create(tournamentManager);
  }

  @Get(':id')
  findById(@Param('id') id: string): Observable<TournamentManager> {
    return this.tournamentManagerService.findById(id)
  }

  @Delete(':id')
  deleteTounamentManager(@Param('id') id:string): Observable<DeleteResult> {
    return this.tournamentManagerService.deleteTournamentManager(id);
  }

  @Put(':id')
  changeTournamentManager(@Param('id') id: string, @Body() tournamentManager: TournamentManager) {
    return this.tournamentManagerService.changeTournamentManager(id, tournamentManager);
  }

}
