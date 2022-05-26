import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Sport } from 'src/entities';
import { SportsService } from 'src/services';

@ApiTags('sports')
@Controller('sports')
@UseInterceptors(ClassSerializerInterceptor)
export class SportsController {

  constructor(private readonly service: SportsService) {}

  @Get()
  @ApiResponse({ type: Sport, isArray: true })
  async findAll(): Promise<Sport[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: Sport })
  async findOne(@Param('id') id: number): Promise<Sport> {
    return this.service.findOne(id);
  }

}
