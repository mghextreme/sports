import { ApiProperty } from "@nestjs/swagger";
import { Group } from "src/entities";
import { ICreateDto } from "./create.dto.interface";

export class GroupCreateDto implements ICreateDto<Group> {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  eventId: number;

  @ApiProperty({ required: false, nullable: true, default: null })
  city?: string;

  @ApiProperty({ required: false, nullable: true, default: null })
  logo: string;

  @ApiProperty({ required: false, nullable: true, default: null })
  color1: string;

  @ApiProperty({ required: false, nullable: true, default: null })
  color2: string;
}
