import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';
import { MatchTeam } from './match-team.entity';
import { Match } from './match.entity';
import { Modality } from './modality.entity';
import { Stage } from './stage.entity';
import { TeamParticipant } from './team-participant.entity';

@Entity({ name: 'teams' })
export class Team {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ default: null })
  @ApiProperty({ required: false, nullable: true, default: null })
  placing: number;

  @Column()
  @Exclude()
  modalityId: number;

  @ManyToOne(() => Modality, modality => modality.teams)
  modality: Modality;

  @Column()
  @Exclude()
  groupId: number;

  @ManyToOne(() => Group, group => group.teams)
  group: Group;

  @OneToMany(() => TeamParticipant, teamParticipant => teamParticipant.team)
  participants: TeamParticipant[];

  @ManyToMany(() => Stage, stage => stage.teams)
  stages: Stage[];

  @OneToMany(() => MatchTeam, match => match.team)
  matches: MatchTeam[];
}
