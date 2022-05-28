import { Injectable } from '@nestjs/common';
import { PersonCreateDto, PersonUpdateDto, QueryResultDto } from 'src/models';
import { Person } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class PeopleService {

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

  async remove(id: number): Promise<QueryResultDto> {
    return this.repository.delete(id).then(r => ({ success: r.affected > 0 } as QueryResultDto));
  }

  async search(term: string): Promise<Person[]> {
    term = '%' + term + '%';
    return this.repository.find({
      where: [
        { name: ILike(term) },
        { document: ILike(term) },
        { email: ILike(term) }
      ]
    });
  }

}
