import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';
import { Modality } from './modality.entity';
import { TeamParticipant } from './team-participant.entity';

@Entity({ name: 'teams' })
export class Team {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: null })
  placing: number;

  @ManyToOne(() => Modality, modality => modality.teams)
  modality: Modality;

  @ManyToOne(() => Group, group => group.teams)
  group: Group;

  @OneToMany(() => TeamParticipant, teamParticipant => teamParticipant.team)
  participants: TeamParticipant[];
}
