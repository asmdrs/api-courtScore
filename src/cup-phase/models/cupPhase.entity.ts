import { Exclude } from "class-transformer";
import { MatchEntity } from "../../match/models/match.entity";
import { PhaseName } from "../../shared/enums/PhaseName.enum";
import { TournamentEntity } from "../../tournament/models/tournament.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('cupPhase')
export class CupPhaseEntity{
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: 'enum', enum: PhaseName, default: PhaseName.OCT })
  phaseName: PhaseName;

  @OneToMany(() => MatchEntity, match => match.phase, { cascade: true })
  matches: MatchEntity[];

  @ManyToOne(() => TournamentEntity, tournament => tournament.phases)
  @JoinColumn()
  @Exclude()
  tournament: TournamentEntity;
}