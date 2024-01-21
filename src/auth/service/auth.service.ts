import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Observable, from, map, of, switchMap  } from 'rxjs';
import { User } from '../models/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { JwtService } from '@nestjs/jwt';

import { Athlete } from 'src/athlete/models/athlete.interface';
import { AthleteEntity } from 'src/athlete/models/athlete.entity';

@Injectable()
export class AuthService {

  constructor (
    @InjectRepository(UserEntity) 
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    @InjectRepository(AthleteEntity)
    private readonly athleteRepository: Repository<AthleteEntity>,
    ) {}

  hashPassword(password: string): Observable<string>{
    return from(bcrypt.hash(password, 12));
  }

  private mapAthleteEntity(athlete: Athlete): AthleteEntity {
    const { name, groupId, gender } = athlete;
    const athleteEntity = new AthleteEntity();

    athleteEntity.name = name;
    athleteEntity.groupId = groupId;
    athleteEntity.gender = gender;
    
    return athleteEntity 
  }

  // registerNewAccount(user: User, athlete?: Athlete): Observable<User>{
  //   const { email, password, firstName, lastName, role } = user;

  //   return this.hashPassword(password).pipe(
  //     switchMap((hashedPassword: string) =>{
  //           return from( 
  //             this.userRepository.save({
  //             email,
  //             firstName,
  //             lastName,
  //             role,
  //             password: hashedPassword,
  //             athlete: athlete ? this.mapAthleteEntity(athlete) : null
  //           }),
  //           ).pipe(
  //               map((user: User) => {
  //                 delete user.password;
  //                 return user;
  //               })
  //           )    
  //         })
  //       );
  // };

  registerNewAccount(user: User, athlete?: Athlete): Observable<User> {
    const { email, password, firstName, lastName, role } = user;

    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) =>
        from(
          this.userRepository.save({
            email,
            firstName,
            lastName,
            role,
            password: hashedPassword,
          }),
        ).pipe(
          switchMap((savedUser: UserEntity) => {
            if (athlete) {
              const athleteEntity = this.mapAthleteEntity(athlete);
              athleteEntity.user = savedUser; // Associe o usuário ao atleta
              return from(this.athleteRepository.save(athleteEntity));
            } else {
              return of(savedUser);
            }
          }),
        ),
      ),
      map((savedUser: User) => {
        delete savedUser.password;
        return savedUser;
      }),
    );
  }

  async validateUser(email: string, password: string): Promise<User> {
    let user = await this.userRepository.findOneBy({ email }) ;
    if (user) {
      if (!password) {
        throw new UnauthorizedException('Senha não fornecida');
      }
      let isValid:boolean = await bcrypt.compare(password, user.password);
      if (isValid) {
        user.password = undefined;
        return user;
      } else {
        throw new UnauthorizedException();
      }
    }  
  }

  async login(user: User): Promise<string> {
    const { email, password } = user;
    const validUser =  await this.validateUser(email, password);
    const payload = {sub: validUser.id, username: validUser.email}
    return this.jwtService.signAsync(payload)
    }

}

