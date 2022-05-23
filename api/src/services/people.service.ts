import { Injectable } from '@nestjs/common';
import { PersonCreateDto, PersonUpdateDto } from 'src/models';
import { IEntityService } from './entity.service.interface';
import { Person } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class PeopleService implements IEntityService<Person> {

  constructor(
    @InjectRepository(Person) private readonly repository: Repository<Person>) { }

  async findAll(): Promise<Person[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Person> {
    return this.repository.findOne(id);
  }

  async create(createDto: PersonCreateDto): Promise<Person> {
    const creation = this.repository.create(createDto);
    return this.repository.save(creation);
  }

  async update(id: number, updateDto: PersonUpdateDto): Promise<Person> {
    const record = await this.repository.findOne(id);
    this.repository.merge(record, updateDto);
    return this.repository.save(record);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

}
