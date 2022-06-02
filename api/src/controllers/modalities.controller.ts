import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ModalityCreateDto, ModalityUpdateDto, QueryResultDto } from 'src/models';
import { ModalitiesService } from 'src/services';
import { Match, Modality, Stage, Team } from 'src/entities';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('modalities')
@Controller('modalities')
@UseInterceptors(ClassSerializerInterceptor)
export class ModalitiesController {

  constructor(private readonly service: ModalitiesService) {}

  @Get(':id')
  @ApiResponse({ type: Modality })
  async findOne(@Param('id') id: number): Promise<Modality> {
    return this.service.findOne(id);
  }

  @Get(':id/stages')
  @ApiResponse({ type: Stage, isArray: true })
  async findOneStages(@Param('id') id: number): Promise<Stage[]> {
    return this.service.findOneStages(id);
  }

  @Get(':id/teams')
  @ApiResponse({ type: Team, isArray: true })
  async findOneTeams(@Param('id') id: number): Promise<Team[]> {
    return this.service.findOneTeams(id);
  }

  @Get(':id/matches')
  @ApiResponse({ type: Match, isArray: true })
  async findOneMatches(@Param('id') id: number): Promise<Match[]> {
    return this.service.findOneMatches(id);
  }

  @Post()
  @ApiResponse({ type: Modality })
  async create(@Body() createDto: ModalityCreateDto): Promise<Modality> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiResponse({ type: Modality })
  update(@Param('id') id: number, @Body() updateDto: ModalityUpdateDto): Promise<Modality> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({ type: QueryResultDto })
  remove(@Param('id') id: number): Promise<QueryResultDto> {
    return this.service.remove(id);
  }

}
