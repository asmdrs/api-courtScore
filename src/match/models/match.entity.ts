import { Type } from "class-transformer";
import { AthleteEntity } from "src/athlete/models/athlete.entity";
import { CupPhaseEntity } from "src/cup-phase/models/cupPhase.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('match')
export class MatchEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => AthleteEntity, { nullable: true })
  @JoinColumn()
  athlete1: AthleteEntity;

  @ManyToOne(() => AthleteEntity, { nullable: true })
  @JoinColumn()
  athlete2: AthleteEntity;

  @Column({ type: 'jsonb', nullable: true })
  player1Score?: number[];
  
  @Column({ type: 'jsonb', nullable: true })
  player2Score?: number[];

  @ManyToOne(() => AthleteEntity, { nullable: true })
  @JoinColumn()
  winner?: AthleteEntity;
  
  @Type(() => Date)
  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => CupPhaseEntity, phase => phase.matches)
  @JoinColumn()
  phase: CupPhaseEntity;
  
}