import { EventCreateDto } from "./event.create.dto";
import { IUpdateDto } from "./update.dto.interface";

export class EventUpdateDto extends EventCreateDto implements IUpdateDto {
  id: number;
}
