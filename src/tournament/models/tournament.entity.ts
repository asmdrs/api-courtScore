import { AthleteEntity } from "src/athlete/models/athlete.entity";
import { CupPhaseEntity } from "src/cup-phase/models/cupPhase.entity";
import { GroupEntity } from "src/group/models/group.entity";
import { TournamentManagerEntity } from "src/tournament-manager/models/tournamentManager.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tournament')
export class TournamentEntity{
  @PrimaryGeneratedColumn("uuid")
  id:string;

  @Column()
  name: string;

  @OneToMany(() => CupPhaseEntity, cupPhase => cupPhase.tournament)
  phases: CupPhaseEntity[];

  @ManyToMany(() => AthleteEntity, athlete => athlete.tournaments)
  @JoinTable({
    name: 'athlete_tournaments_tournament',
    joinColumn: { name: 'tournamentId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'athleteId', referencedColumnName: 'id' },
  })
  athletes: AthleteEntity[];

  @ManyToOne(() => TournamentManagerEntity, manager => manager.managedTournaments)
  @JoinColumn()
  tournamentManager: TournamentManagerEntity; 

  @ManyToOne(() => GroupEntity, group => group.tournaments)
  @JoinColumn()
  group: GroupEntity;

}