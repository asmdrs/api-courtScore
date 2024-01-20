import { UserEntity } from 'src/auth/models/user.entity';
import { User } from 'src/auth/models/user.interface';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('athlete')
export class AthleteEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  matchesPlayed: number;

	@Column() 	
	matchesWon?: number;

	@Column()
	groupId: string;

	@Column()
	gender: Gender;

  @OneToOne(() => UserEntity, (user) => user.id)
  user: User | null;
}
