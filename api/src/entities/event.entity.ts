import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { Modality } from "./modality.entity";

@Entity()
export class Event {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ default: false })
  public: boolean;

  @Column({ default: null })
  logo?: string;

  @OneToMany(() => Group, group => group.event)
  groups: Group[];

  @OneToMany(() => Modality, modality => modality.event)
  modalities: Modality[];
}
