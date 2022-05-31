import { ApiProperty } from "@nestjs/swagger";
import { Team } from "src/entities";
import { ICreateDto } from "./create.dto.interface";

export class TeamCreateDto implements ICreateDto<Team> {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: true })
  groupId: number;
}
