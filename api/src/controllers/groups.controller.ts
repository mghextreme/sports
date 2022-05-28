import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { GroupCreateDto, GroupMemberAddDto, GroupUpdateDto, QueryResultDto } from 'src/models';
import { GroupsService } from 'src/services';
import { Group, Person } from 'src/entities';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('groups')
@Controller('groups')
@UseInterceptors(ClassSerializerInterceptor)
export class GroupsController {

  constructor(private readonly service: GroupsService) {}

  @Get(':id')
  @ApiResponse({ type: Group })
  async findOne(@Param('id') id: number): Promise<Group> {
    return this.service.findOne(id);
  }

  @Get(':id/members')
  @ApiResponse({ type: Person, isArray: true })
  async findOneMembers(@Param('id') id: number): Promise<Person[]> {
    return this.service.findOneMembers(id);
  }

  @Post()
  @ApiResponse({ type: Group })
  async create(@Body() createDto: GroupCreateDto): Promise<Group> {
    return this.service.create(createDto);
  }

  @Post(':id/members')
  @ApiResponse({ type: QueryResultDto })
  async addMember(@Param('id') id: number, @Body() addDto: GroupMemberAddDto): Promise<QueryResultDto> {
    return this.service.addMember(id, addDto);
  }

  @Put(':id')
  @ApiResponse({ type: Group })
  update(@Param('id') id: number, @Body() updateDto: GroupUpdateDto): Promise<Group> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({ type: QueryResultDto })
  remove(@Param('id') id: number): Promise<QueryResultDto> {
    return this.service.remove(id);
  }

}
