import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { Modality } from "./modality.entity";

@Entity()
export class Event {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty({ required: false })
  location: string;

  @Column()
  @ApiProperty()
  startDate: Date;

  @Column({ nullable: true, default: null })
  @ApiProperty({ required: false, nullable: true, default: null })
  endDate: Date;

  @Column({ default: false })
  @ApiProperty({ required: false, default: false })
  public: boolean;

  @Column({ nullable: true, default: null })
  @ApiProperty({ required: false, nullable: true, default: null })
  logo?: string;

  @OneToMany(() => Group, group => group.event)
  groups: Group[];

  @OneToMany(() => Modality, modality => modality.event)
  modalities: Modality[];
}
