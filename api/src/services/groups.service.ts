import { Injectable } from '@nestjs/common';
import { GroupCreateDto, GroupUpdateDto } from 'src/models';
import { Group, Person } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class GroupsService {

  constructor(
    @InjectRepository(Group) private readonly repository: Repository<Group>) { }

  async findOne(id: number): Promise<Group> {
    return this.repository.findOne(id);
  }

  async create(createDto: GroupCreateDto): Promise<Group> {
    const creation = this.repository.create(createDto);
    return this.repository.save(creation);
  }

  async update(id: number, updateDto: GroupUpdateDto): Promise<Group> {
    const record = await this.repository.findOne(id);
    this.repository.merge(record, updateDto);
    return this.repository.save(record);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.repository.delete(id);
  }

  async findOneMembers(id: number): Promise<Person[]> {
    return this.repository.findOne(id, {
      relations: [ 'members' ]
    }).then(g => g.members);
  }

}
