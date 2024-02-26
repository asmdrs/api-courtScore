import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AthleteService } from '../service/athlete.service';
import { Athlete } from '../models/athlete.interface';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { AthleteEntity } from '../models/athlete.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('athlete')
export class AthleteController {
  constructor(
    private athleteService: AthleteService,
    private readonly jwtService: JwtService
    ){}

  @UseGuards(JwtGuard)
  @Post()
  createAthlete(@Body() athlete: Athlete): Observable<Athlete> {
    return this.athleteService.createAthlete(athlete);
  }

  @Get()
  findAllAthletes(): Observable<Athlete[]> {
    return this.athleteService.findAllAthletes();
  }
  
  @UseGuards(JwtGuard)
  @Roles(Role.ATHLETE)
  @Put(':id')
  changeAthlete(@Param('id') id: string, @Body() athlete: AthleteEntity, @Request() req): Observable<UpdateResult> {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(token) as { sub: string };
    const userId = decodedToken.sub;

    return this.athleteService.changeAthlete(id, athlete, userId);
  }

  @UseGuards(JwtGuard)
  @Roles(Role.ATHLETE)
  @Put(':id')
  findAllAthletesByGroup(@Request() req): Observable<Athlete[]> {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.decode(token) as { sub: string };
    const userId = decodedToken.sub;

    return this.athleteService.findByGroup(userId);
  }

  @UseGuards(JwtGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  deleteAthlete(@Param('id') id: string): Observable<DeleteResult> {
    return this.athleteService.deleteAthlete(id);
  }

}