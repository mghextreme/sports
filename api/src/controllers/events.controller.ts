import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventCreateDto, EventUpdateDto } from 'src/models';
import { EventsService } from 'src/services';
import { Event } from 'src/entities';
import { DeleteResult } from 'typeorm';

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
