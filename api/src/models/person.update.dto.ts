import { Person } from "src/entities";
import { PersonCreateDto } from "./person.create.dto";
import { IUpdateDto } from "./update.dto.interface";

export class PersonUpdateDto extends PersonCreateDto implements IUpdateDto<Person> {
  id: number;
}
