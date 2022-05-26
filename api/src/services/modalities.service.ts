import { Injectable } from '@nestjs/common';
import { ModalityCreateDto, ModalityUpdateDto } from 'src/models';
import { Modality } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ModalitiesService {

  constructor(
    @InjectRepository(Modality) private readonly repository: Repository<Modality>) { }

  async findOne(id: number): Promise<Modality> {
    return this.repository.findOne(id, {
      relations: ['sport']
    });
  }

  async create(createDto: ModalityCreateDto): Promise<Modality> {
    const creation = this.repository.create(createDto);
    return this.repository.save(creation);
  }

  async update(id: number, updateDto: ModalityUpdateDto): Promise<Modality> {
    const record = await this.repository.findOne(id);
    this.repository.merge(record, updateDto);
    return this.repository.save(record);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

}
