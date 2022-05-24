import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ModalityCreateDto, ModalityUpdateDto } from 'src/models';
import { ModalitiesService } from 'src/services';
import { Modality } from 'src/entities';
import { DeleteResult } from 'typeorm';

@Controller('modalities')
export class ModalitiesController {

  constructor(private readonly service: ModalitiesService) {}

  @Get()
  async findAll(): Promise<Modality[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Modality> {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() createDto: ModalityCreateDto): Promise<Modality> {
    return this.service.create(createDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateDto: ModalityUpdateDto): Promise<Modality> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<DeleteResult> {
    return this.service.remove(id);
  }

}
