import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Sport } from 'src/entities';
import { SportsService } from 'src/services';

@ApiTags('sports')
@Controller('sports')
export class SportsController {

  constructor(private readonly service: SportsService) {}

  @Get()
  async findAll(): Promise<Sport[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Sport> {
    return this.service.findOne(id);
  }

}
