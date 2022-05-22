import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from './gender.enum';
import { Group } from './group.entity';
import { TeamParticipant } from './team-participant.entity';

@Entity({ name: 'people' })
export class Person {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: null })
  document: string;

  @Column({ default: null })
  email: string;

  @Column({ default: null })
  dateOfBirth: Date;

  @Column({ enum: Gender, default: Gender.Unidentified })
  gender: Gender;

  @ManyToMany(() => Group, person => person.members)
  groups: Group[];

  @ManyToOne(() => TeamParticipant, teamParticipant => teamParticipant.person)
  teamParticipations: TeamParticipant[];
}
