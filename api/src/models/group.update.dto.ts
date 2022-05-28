import { ApiProperty } from "@nestjs/swagger";
import { Group } from "src/entities";
import { GroupCreateDto } from "./group.create.dto";
import { IUpdateDto } from "./update.dto.interface";

export class GroupUpdateDto extends GroupCreateDto implements IUpdateDto<Group> {
  @ApiProperty({ required: true })
  id: number;
}
