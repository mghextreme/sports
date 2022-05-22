import { Injectable } from '@nestjs/common';
import { EventCreateDto, EventUpdateDto } from 'src/models';
import { IEntityService } from './entity.service.interface';
import { Event } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService implements IEntityService<Event> {

  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>) { }

  async findAll(): Promise<Event[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Event | null> {
    // TODO: Return null if doesn't exist
    return this.repository.findOne(id);
  }

  async create(createDto: EventCreateDto): Promise<Event> {
    // TODO
    return new Event();
  }

  async update(updateDto: EventUpdateDto): Promise<Event> {
    // TODO
    return new Event();
  }

  async remove(id: number): Promise<void> {
    // TODO
    return;
  }

}
