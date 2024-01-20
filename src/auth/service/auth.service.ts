import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Observable, from, map, switchMap } from 'rxjs';
import { User } from '../models/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../models/user.entity';
import { AthleteService } from 'src/athlete/service/athlete.service';

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(UserEntity) 
    private readonly userRepository: Repository<UserEntity>,
    ) {}

  hashPassword(password: string): Observable<string>{
    return from(bcrypt.hash(password, 12));
  }

  registerNewAccount(user: User): Observable<User>{
    const { email, password, firstName, lastName, role } = user;

    return this.hashPassword(password).pipe(
      switchMap((hashedPassword: string) =>{
            return from( 
              this.userRepository.save({
              email,
              firstName,
              lastName,
              role,
              password: hashedPassword,
            }),
            ).pipe(
                map((user: User) => {
                  delete user.password;
                  return user;
                })
            )    
          })
        );
      };
    
}

