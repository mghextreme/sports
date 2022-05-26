import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from './gender.enum';
import { Group } from './group.entity';
import { TeamParticipant } from './team-participant.entity';

@Entity({ name: 'people' })
export class Person {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ default: null })
  @ApiProperty({ required: false, nullable: true, default: null })
  document: string;

  @Column({ default: null })
  @ApiProperty({ required: false, nullable: true, default: null })
  email: string;

  @Column({ default: null })
  @ApiProperty({ required: false, nullable: true, default: null })
  dateOfBirth: Date;

  @Column({ enum: Gender, default: Gender.Unidentified })
  @ApiProperty({ required: false, enum: Gender, default: Gender.Unidentified })
  gender: Gender;

  @ManyToMany(() => Group, person => person.members)
  groups: Group[];

  @ManyToOne(() => TeamParticipant, teamParticipant => teamParticipant.person)
  teamParticipations: TeamParticipant[];
}
