import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";
import { AthleteEntity } from "src/athlete/models/athlete.entity";
import { Athlete } from "src/athlete/models/athlete.interface";

@Entity('user')
export class UserEntity{
  @PrimaryGeneratedColumn( 'uuid')
  id?: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique: true})
  email: string;

  @Column({ select: false })
  password: string;

  @Column({type: 'enum', enum: Role, default: Role.ATHLETE})
  role: Role;

}