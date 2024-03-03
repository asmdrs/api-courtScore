import { UserEntity } from "../../auth/models/user.entity";
import { GroupEntity } from "../../group/models/group.entity";
import { TournamentEntity } from "../../tournament/models/tournament.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tournamentManager')
export class TournamentManagerEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => GroupEntity)
  @JoinColumn()
  group?: GroupEntity;

  @OneToOne(() => UserEntity, user => user.tournamentManager)
  @JoinColumn()
  user?: UserEntity;

  @ManyToOne(() => TournamentEntity)
  @JoinColumn()
  managedTournaments: TournamentEntity;
}
