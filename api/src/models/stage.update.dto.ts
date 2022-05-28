import { ApiProperty } from "@nestjs/swagger";
import { Stage } from "src/entities";
import { StageCreateDto } from "./stage.create.dto";
import { IUpdateDto } from "./update.dto.interface";

export class StageUpdateDto extends StageCreateDto implements IUpdateDto<Stage> {
  @ApiProperty({ required: true })
  id: number;
}
