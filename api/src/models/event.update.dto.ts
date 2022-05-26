import { EventCreateDto } from "./event.create.dto";
import { IUpdateDto } from "./update.dto.interface";
import { Event } from "src/entities";
import { ApiProperty } from "@nestjs/swagger";

export class EventUpdateDto extends EventCreateDto implements IUpdateDto<Event> {
  @ApiProperty({ required: true })
  id: number;
}
