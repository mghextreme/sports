import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { PersonCreateDto, PersonUpdateDto, QueryResultDto } from 'src/models';
import { PeopleService } from 'src/services';
import { Person } from 'src/entities';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('people')
@Controller('people')
@UseInterceptors(ClassSerializerInterceptor)
export class PeopleController {

  constructor(private readonly service: PeopleService) {}

  @Get()
  @ApiResponse({ type: Person, isArray: true })
  async findAll(): Promise<Person[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: Person })
  async findOne(@Param('id') id: number): Promise<Person> {
    return this.service.findOne(id);
  }

  @Get('search/:term')
  @ApiResponse({ type: Person, isArray: true })
  async search(@Param('term') term: string): Promise<Person[]> {
    return this.service.search(term);
  }

  @Post()
  @ApiResponse({ type: Person })
  async create(@Body() createDto: PersonCreateDto): Promise<Person> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiResponse({ type: Person })
  update(@Param('id') id: number, @Body() updateDto: PersonUpdateDto): Promise<Person> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({ type: QueryResultDto })
  remove(@Param('id') id: number): Promise<QueryResultDto> {
    return this.service.remove(id);
  }

}
