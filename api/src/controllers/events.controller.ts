import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { EventCreateDto, EventUpdateDto, QueryResultDto } from 'src/models';
import { EventsService } from 'src/services';
import { Event, Group, Modality } from 'src/entities';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
@UseInterceptors(ClassSerializerInterceptor)
export class EventsController {

  constructor(private readonly service: EventsService) {}

  @Get()
  @ApiResponse({ type: Event, isArray: true })
  async findAll(): Promise<Event[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: Event })
  async findOne(@Param('id') id: number): Promise<Event> {
    return this.service.findOne(id);
  }

  @Get(':id/groups')
  @ApiResponse({ type: Group, isArray: true })
  async findOneGroups(@Param('id') id: number): Promise<Group[]> {
    return this.service.findOneGroups(id);
  }

  @Get(':id/modalities')
  @ApiResponse({ type: Modality, isArray: true })
  async findOneModalities(@Param('id') id: number): Promise<Modality[]> {
    return this.service.findOneModalities(id);
  }

  @Post()
  @ApiResponse({ type: Event })
  async create(@Body() createDto: EventCreateDto): Promise<Event> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiResponse({ type: Event })
  update(@Param('id') id: number, @Body() updateDto: EventUpdateDto): Promise<Event> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({ type: QueryResultDto })
  remove(@Param('id') id: number): Promise<QueryResultDto> {
    return this.service.remove(id);
  }

}
