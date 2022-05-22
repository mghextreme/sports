import { Injectable } from '@nestjs/common';
import { EventCreateDto, EventUpdateDto } from 'src/models';
import { IEntityService } from './entity.service.interface';
import { Event } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class EventsService implements IEntityService<Event> {

  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>) { }

  async findAll(): Promise<Event[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Event> {
    return this.repository.findOne(id);
  }

  async create(createDto: EventCreateDto): Promise<Event> {
    const creation = this.repository.create(createDto);
    return this.repository.save(creation);
  }

  async update(id: number, updateDto: EventUpdateDto): Promise<Event> {
    const record = await this.repository.findOne(id);
    this.repository.merge(record, updateDto);
    return this.repository.save(record);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

}
