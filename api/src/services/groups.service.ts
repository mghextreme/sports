import { Injectable } from '@nestjs/common';
import { GroupCreateDto, GroupMemberAddDto, GroupUpdateDto, QueryResultDto } from 'src/models';
import { Group, Person } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {

  constructor(
    @InjectRepository(Group) private readonly repository: Repository<Group>,
    @InjectRepository(Person) private readonly peopleRepository: Repository<Person>) { }

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

  async remove(id: number): Promise<QueryResultDto> {
    return this.repository.delete(id).then(r => ({ success: r.affected > 0 } as QueryResultDto));
  }

  async findOneMembers(id: number): Promise<Person[]> {
    return this.repository.findOne(id, {
      relations: [ 'members' ]
    }).then(g => g.members);
  }

  async addMember(id: number, addDto: GroupMemberAddDto): Promise<QueryResultDto> {
    const person = this.peopleRepository.findOne(addDto.personId);
    const group = await this.repository.findOne(id, {
      relations: ['members']
    });
    group.members.push(await person);
    return this.repository.save(group).then(g => ({ success: g.id == id } as QueryResultDto));
  }

}
