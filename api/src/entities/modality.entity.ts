import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from './event.entity';
import { Sport } from './sport.entity';
import { Team } from './team.entity';

@Entity({ name: 'modalities' })
export class Modality {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  finished: boolean;

  @Column()
  maxTeamSize?: number;

  @Column()
  maxTeamsPerGroup: number;

  @ManyToOne(() => Event, event => event.modalities)
  event: Event;

  @ManyToOne(() => Sport, sport => sport.modalities)
  sport: Sport;

  @OneToMany(() => Team, team => team.modality)
  teams: Team[];
}
