import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { QueryResultDto, StageCreateDto, StageStartDto, StageUpdateDto } from 'src/models';
import { StagesService } from 'src/services';
import { Stage } from 'src/entities';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('stages')
@Controller('stages')
@UseInterceptors(ClassSerializerInterceptor)
export class StagesController {

  constructor(private readonly service: StagesService) {}

  @Get(':id')
  @ApiResponse({ type: Stage })
  async findOne(@Param('id') id: number): Promise<Stage> {
    return this.service.findOne(id);
  }

  @Post()
  @ApiResponse({ type: Stage })
  async create(@Body() createDto: StageCreateDto): Promise<Stage> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiResponse({ type: Stage })
  update(@Param('id') id: number, @Body() updateDto: StageUpdateDto): Promise<Stage> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({ type: QueryResultDto })
  remove(@Param('id') id: number): Promise<QueryResultDto> {
    return this.service.remove(id);
  }

  @Post(':id/start')
  @ApiResponse({ type: QueryResultDto })
  async start(@Param('id') id: number, @Body() startDto: StageStartDto): Promise<QueryResultDto> {
    return this.service.start(id, startDto);
  }

}
