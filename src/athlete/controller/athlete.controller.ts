import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AthleteService } from '../service/athlete.service';
import { Athlete } from '../models/athlete.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('athlete')
export class AthleteController {
  constructor(private athleteService: AthleteService ){}


  @Post()
  createAthlete(@Body() athlete: Athlete): Observable<Athlete> {
    return this.athleteService.createAthlete(athlete);
  }

  @Get()
  findAllAthletes(): Observable<Athlete[]> {
    return this.athleteService.findAllAthletes();
  }
  
  @UseGuards(JwtGuard)
  @Put(':id')
  changeAthlete(@Param('id') id: string, @Body() athlete: Athlete, @Request() req): Observable<UpdateResult> {
    return this.athleteService.changeAthlete(id, athlete, req);
  }

  @Delete(':id')
  deleteAthlete(@Param('id') id: string): Observable<DeleteResult> {
    return this.athleteService.deleteAthlete(id);
  }

}