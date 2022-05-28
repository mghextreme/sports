import { Injectable } from '@nestjs/common';
import { EventCreateDto, EventUpdateDto, QueryResultDto } from 'src/models';
import { Event, Group, Modality } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {

  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
    @InjectRepository(Modality) private readonly modalitiesRepository: Repository<Modality>,
    @InjectRepository(Group) private readonly groupsRepository: Repository<Group>) { }

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

  async remove(id: number): Promise<QueryResultDto> {
    return this.repository.delete(id).then(r => ({ success: r.affected > 0 } as QueryResultDto));
  }

  async findOneModalities(id: number): Promise<Modality[]> {
    return this.modalitiesRepository.find({
      where: { eventId: id },
      relations: [ 'sport' ]
    });
  }

  async findOneGroups(id: number): Promise<Group[]> {
    return this.groupsRepository.find({
      where: { eventId: id }
    });
  }

}
