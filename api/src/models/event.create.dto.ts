import { ICreateDto } from "./create.dto.interface";

export class EventCreateDto implements ICreateDto<Event> {
  name: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  public: boolean;
  logo?: string;
}
