import { ApiProperty } from "@nestjs/swagger";
import { Team } from "src/entities";
import { TeamCreateDto } from "./team.create.dto";
import { IUpdateDto } from "./update.dto.interface";

export class TeamUpdateDto extends TeamCreateDto implements IUpdateDto<Team> {
  @ApiProperty({ required: true })
  id: number;
}
