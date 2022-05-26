import { ApiProperty } from "@nestjs/swagger";
import { Modality } from "src/entities";
import { ICreateDto } from "./create.dto.interface";

export class ModalityCreateDto implements ICreateDto<Modality> {
  @ApiProperty()
  name: string;

  @ApiProperty({ required: true })
  sportId: number;

  @ApiProperty({ required: true })
  eventId: number;

  @ApiProperty({ default: false })
  finished?: boolean;

  @ApiProperty({ nullable: true, default: null })
  maxTeamSize?: number;

  @ApiProperty({ default: 1 })
  maxTeamsPerGroup?: number;
}
