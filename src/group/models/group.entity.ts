import { UserEntity } from "src/auth/models/user.entity";
import { TournamentManagerEntity } from "src/tournament-manager/models/tournamentManager.entity";
import { TournamentEntity } from "src/tournament/models/tournament.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('group')
export class GroupEntity {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @ManyToMany(() => UserEntity, user => user.group)
  athletes?: UserEntity;

  @ManyToOne(()=> TournamentManagerEntity, manager => manager.group)
  @JoinColumn()
  manager?: TournamentManagerEntity;

  @ManyToOne(() => TournamentEntity, tournament => tournament.group)
  @JoinColumn()
  tournaments: TournamentEntity;
}
