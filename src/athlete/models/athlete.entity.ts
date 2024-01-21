import { UserEntity } from 'src/auth/models/user.entity';
import { Gender } from 'src/shared/enums/Gender.enum';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

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
}
