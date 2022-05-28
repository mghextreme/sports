import { ApiProperty } from "@nestjs/swagger";
import { Stage, StageMode } from "src/entities";
import { ICreateDto } from "./create.dto.interface";

export class StageCreateDto implements ICreateDto<Stage> {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  modalityId: number;

  @ApiProperty({ required: false, enum: StageMode, default: StageMode.SingleBracket })
  mode?: StageMode;

  @ApiProperty({ required: false, nullable: true, default: null })
  maxTeams?: number;
}
