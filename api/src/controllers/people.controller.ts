import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PersonCreateDto, PersonUpdateDto } from 'src/models';
import { PeopleService } from 'src/services';
import { Person } from 'src/entities';
import { DeleteResult } from 'typeorm';

@Controller('people')
export class PeopleController {

  constructor(private readonly service: PeopleService) {}

  @Get()
  async findAll(): Promise<Person[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Person> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() createDto: PersonCreateDto): Promise<Person> {
    return this.service.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDto: PersonUpdateDto): Promise<Person> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.remove(id);
  }

}
