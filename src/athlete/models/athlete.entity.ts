import { UserEntity } from '../../auth/models/user.entity';
import { MatchEntity } from '../../match/models/match.entity';
import { Gender } from '../../shared/enums/Gender.enum';
import { TournamentEntity } from '../../tournament/models/tournament.entity';
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('athlete')
export class AthleteEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  matchesPlayed?: number;

	@Column({ nullable: true }) 	
	matchesWon?: number;

	@Column()
	groupId: string;

	@Column({type: 'enum', enum: Gender, default: Gender.NB})
	gender: Gender;

  @OneToOne(() => UserEntity, user => user.athlete)
  @JoinColumn()
  user?: UserEntity;

  @OneToMany(() => MatchEntity, match => match.athlete1)
  matchesAsAthlete1: MatchEntity[];
  
  @OneToMany(() => MatchEntity, match => match.athlete2)
  matchesAsAthlete2: MatchEntity[];
  
  @OneToMany(() => MatchEntity, match => match.winner)
  matchesAsWinner: MatchEntity[];

  @ManyToMany(() => TournamentEntity, tournament => tournament.athletes)
  tournaments: TournamentEntity[];
}
