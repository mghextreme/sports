import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MatchTeam } from './match-team.entity';
import { Stage } from './stage.entity';

@Entity({ name: 'matches' })
export class Match {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  name: string;

  @Column()
  @Exclude()
  stageId: number;

  @ManyToOne(() => Stage, stage => stage.matches)
  stage: Stage;

  @OneToMany(() => MatchTeam, team => team.match)
  teams: MatchTeam[];
}
