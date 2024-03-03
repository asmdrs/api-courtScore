import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";
import { AthleteEntity } from "../../athlete/models/athlete.entity";
import { TournamentManagerEntity } from "../../tournament-manager/models/tournamentManager.entity";
import { GroupEntity } from "../../group/models/group.entity";
import { Group } from "../../group/models/group.interface";

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

  @Column()
  password: string;

  @Column({type: 'enum', enum: Role, default: Role.ATHLETE})
  role: Role;

  @OneToOne(() => AthleteEntity, athlete => athlete.user, { cascade: true })
  @JoinColumn()
  athlete?: AthleteEntity;

  @OneToOne(()=> TournamentManagerEntity, tournamentManager => tournamentManager.user, { cascade: true })
  @JoinColumn()
  tournamentManager?: TournamentManagerEntity;

  @ManyToMany(()=> GroupEntity, group => group.athletes, { cascade: true })
  @JoinColumn()
  group?: Group;
}