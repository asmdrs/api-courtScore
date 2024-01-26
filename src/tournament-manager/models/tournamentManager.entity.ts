import { UserEntity } from "src/auth/models/user.entity";
import { GroupEntity } from "src/group/models/group.entity";
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

}
