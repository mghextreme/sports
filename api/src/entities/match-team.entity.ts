import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Match } from './match.entity';
import { Team } from './team.entity';

@Entity({ name: 'match_team' })
export class MatchTeam {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ default: 0 })
  @ApiProperty({ required: false, default: 0 })
  score: number;

  @Column()
  @Exclude()
  teamId: number;

  @ManyToOne(() => Team, team => team.matches)
  team: Team;

  @Column()
  @Exclude()
  matchId: number;

  @ManyToOne(() => Match, match => match.teams)
  match: Match;
}
