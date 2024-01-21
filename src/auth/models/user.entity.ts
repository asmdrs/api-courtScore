import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";
import { AthleteEntity } from "src/athlete/models/athlete.entity";

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

}