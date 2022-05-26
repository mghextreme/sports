import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventCreateDto, EventUpdateDto } from 'src/models';
import { EventsService } from 'src/services';
import { Event, Group, Modality } from 'src/entities';
import { DeleteResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventsController {

  constructor(private readonly service: EventsService) {}

  @Get()
  async findAll(): Promise<Event[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Event> {
    return this.service.findOne(id);
  }

  @Get(':id/groups')
  async findOneGroups(@Param('id') id: number): Promise<Group[]> {
    return this.service.findOneGroups(id);
  }

  @Get(':id/modalities')
  async findOneModalities(@Param('id') id: number): Promise<Modality[]> {
    return this.service.findOneModalities(id);
  }

  @Post()
  async create(@Body() createDto: EventCreateDto): Promise<Event> {
    return this.service.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDto: EventUpdateDto): Promise<Event> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.remove(id);
  }

}
