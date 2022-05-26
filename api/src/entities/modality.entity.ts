import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';
import { Sport } from './sport.entity';
import { Team } from './team.entity';

@Entity({ name: 'modalities' })
export class Modality {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ default: false })
  @ApiProperty({ required: false, default: false })
  finished: boolean;

  @Column({ default: null })
  @ApiProperty({ required: false, default: null })
  maxTeamSize: number;

  @Column({ default: 1 })
  @ApiProperty({ required: false, default: 1 })
  maxTeamsPerGroup: number;

  @Column()
  @Exclude()
  eventId: number;

  @ManyToOne(() => Event, event => event.modalities)
  event: Event;

  @Column()
  @Exclude()
  sportId: number;

  @ManyToOne(() => Sport, sport => sport.modalities)
  @ApiProperty()
  sport: Sport;

  @OneToMany(() => Team, team => team.modality)
  teams: Team[];
}
