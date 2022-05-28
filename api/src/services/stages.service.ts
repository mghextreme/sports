import { Injectable } from '@nestjs/common';
import { QueryResultDto, StageCreateDto, StageUpdateDto } from 'src/models';
import { Stage } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class StagesService {

  constructor(
    @InjectRepository(Stage) private readonly repository: Repository<Stage>) { }

  async findOne(id: number): Promise<Stage> {
    return this.repository.findOne(id);
  }

  async create(createDto: StageCreateDto): Promise<Stage> {
    const creation = this.repository.create(createDto);
    return this.repository.save(creation);
  }

  async update(id: number, updateDto: StageUpdateDto): Promise<Stage> {
    const record = await this.repository.findOne(id);
    this.repository.merge(record, updateDto);
    return this.repository.save(record);
  }

  async remove(id: number): Promise<QueryResultDto> {
    return this.repository.delete(id).then(r => ({ success: r.affected > 0 } as QueryResultDto));
  }

}
