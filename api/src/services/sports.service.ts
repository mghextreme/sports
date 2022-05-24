import { Injectable } from '@nestjs/common';
import { Sport } from 'src/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SportsService {

  constructor(
    @InjectRepository(Sport) private readonly repository: Repository<Sport>) { }

  async findAll(): Promise<Sport[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<Sport> {
    return this.repository.findOne(id);
  }

}
