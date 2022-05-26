import { ApiProperty } from "@nestjs/swagger";
import { ICreateDto } from "./create.dto.interface";
import { Event } from "src/entities";

export class EventCreateDto implements ICreateDto<Event> {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  location?: string;

  @ApiProperty({ required: true })
  startDate: Date;

  @ApiProperty({ nullable: true, default: null })
  endDate?: Date;

  @ApiProperty({ default: false })
  public: boolean;

  @ApiProperty({ nullable: true, default: null })
  logo?: string;
}
