import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Modality } from './modality.entity';
import { StageMode } from './stage-mode.enum';

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
}
