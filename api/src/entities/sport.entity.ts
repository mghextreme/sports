import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Modality } from './modality.entity';

@Entity({ name: 'sports' })
export class Sport {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 40 })
  @ApiProperty({ maxLength: 40 })
  code: string;

  @OneToMany(() => Modality, modality => modality.event)
  modalities: Modality[];
}
