import { BadRequestException, Injectable } from '@nestjs/common';
import { GroupCreateDto, GroupMemberAddDto, GroupUpdateDto, QueryResultDto } from 'src/models';
import { Group, Person } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import * as _ from 'lodash';

@Injectable()
export class GroupsService {

  constructor(
    @InjectRepository(Group) private readonly repository: Repository<Group>,
    @InjectRepository(Person) private readonly peopleRepository: Repository<Person>) { }

  async findOne(id: number): Promise<Group> {
    return this.repository.findOne(id, {
      relations: ['event']
    });
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
      relations: ['members']
    }).then(g => g.members);
  }

  async searchAvailablePeople(id: number, term: string): Promise<Person[]> {
    const groupPromise = this.repository.findOne(id);

    term = '%' + term + '%';
    const people = this.peopleRepository.find({
      where: [
        { name: ILike(term) },
        { document: ILike(term) },
        { email: ILike(term) }
      ],
      relations: ['groups']
    });

    const group = await groupPromise;
    return people.then(p => p.filter(p => _.every(p.groups, g => g.eventId !== group.eventId)));
  }

  async addMember(id: number, addDto: GroupMemberAddDto): Promise<QueryResultDto> {
    const person = await this.peopleRepository.findOne(addDto.personId, {
      relations: ['groups']
    });
    const group = await this.repository.findOne(id, {
      relations: ['members']
    });

    if (this.personBelongsToOtherGroupAtEvent(person, group.eventId)) {
      throw new BadRequestException(`Person '${person.id}' is already a member of another group at event '${group.eventId}'.`);
    }

    group.members.push(person);
    return this.repository.save(group).then(g => ({ success: g.id == id } as QueryResultDto));
  }

  async removeMember(id: number, personId: number): Promise<QueryResultDto> {
    const group = await this.repository.findOne(id, {
      relations: ['members']
    });
    group.members = group.members.filter(p => p.id != personId);
    return this.repository.save(group).then(g => ({ success: g.id == id } as QueryResultDto));
  }

  private personBelongsToOtherGroupAtEvent(person: Person, eventId: number): boolean {
    return _.some(person.groups, g => g.eventId == eventId);
  }

}
