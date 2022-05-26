import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "./event.entity";
import { Person } from "./person.entity";
import { Team } from "./team.entity";

@Entity({ name: 'groups' })
export class Group {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ default: null })
  @ApiProperty({ required: false, nullable: true, default: null })
  city: string;

  @Column({ default: null })
  @ApiProperty({ required: false, nullable: true, default: null })
  logo: string;

  @Column({ length: 8, default: null })
  @ApiProperty({ required: false, nullable: true, default: null })
  color1: string;

  @Column({ length: 8, default: null })
  @ApiProperty({ required: false, nullable: true, default: null })
  color2: string;

  @Column()
  @Exclude()
  eventId: number;

  @ManyToOne(() => Event, event => event.groups)
  event: Event;

  @ManyToMany(() => Person, person => person.groups)
  @JoinTable({ name: 'group_members' })
  members: Person[];

  @OneToMany(() => Team, team => team.group)
  teams: Team[];
}
