import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './person.entity';
import { Team } from './team.entity';

@Entity({ name: 'team_participants' })
export class TeamParticipant {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: number;

  @OneToMany(() => Team, team => team.participants)
  team: Team;

  @OneToMany(() => Person, person => person.teamParticipations)
  person: Person;
}
