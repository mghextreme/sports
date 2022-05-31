import { Injectable } from '@nestjs/common';
import { QueryResultDto, TeamCreateDto, TeamUpdateDto } from 'src/models';
import { Team } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TeamsService {

  constructor(
    @InjectRepository(Team) private readonly repository: Repository<Team>) { }

  async findOne(id: number): Promise<Team> {
    return this.repository.findOne(id, {
      relations: ['group', 'modality', 'modality.event']
    });
  }

  async create(createDto: TeamCreateDto): Promise<Team> {
    const creation = this.repository.create(createDto);
    return this.repository.save(creation);
  }

  async update(id: number, updateDto: TeamUpdateDto): Promise<Team> {
    const record = await this.repository.findOne(id);
    this.repository.merge(record, updateDto);
    return this.repository.save(record);
  }

  async remove(id: number): Promise<QueryResultDto> {
    return this.repository.delete(id).then(r => ({ success: r.affected > 0 } as QueryResultDto));
  }

}
