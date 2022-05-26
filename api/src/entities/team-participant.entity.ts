import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Person } from './person.entity';
import { Team } from './team.entity';

@Entity({ name: 'team_participants' })
export class TeamParticipant {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  number: number;

  @OneToMany(() => Team, team => team.participants)
  team: Team;

  @OneToMany(() => Person, person => person.teamParticipations)
  person: Person;
}
