import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Match } from './match.entity';
import { Modality } from './modality.entity';
import { StageMode } from './stage-mode.enum';
import { Team } from './team.entity';

@Entity({ name: 'stages' })
export class Stage {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ enum: StageMode, default: StageMode.SingleBracket })
  @ApiProperty({ required: false, enum: StageMode, default: StageMode.SingleBracket })
  mode: StageMode;

  @Column()
  @ApiProperty({ required: false, nullable: true, default: null })
  maxTeams: number;

  @Column({ default: false })
  @ApiProperty({ required: false, default: false })
  started: boolean;

  @Column({ default: false })
  @ApiProperty({ required: false, default: false })
  finished: boolean;

  @Column()
  @Exclude()
  modalityId: number;

  @ManyToOne(() => Modality, modality => modality.teams)
  modality: Modality;

  @ManyToMany(() => Team, team => team.stages)
  @JoinTable({ name: 'stage_teams' })
  @Exclude()
  teams: Team[];

  @OneToMany(() => Match, match => match.stage)
  @Exclude()
  matches: Match[];
}
