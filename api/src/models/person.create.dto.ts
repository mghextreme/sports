import { Person } from "src/entities";
import { Gender } from "src/entities/gender.enum";
import { ICreateDto } from "./create.dto.interface";

export class PersonCreateDto implements ICreateDto<Person> {
  name: string;
  document?: string;
  email?: string;
  dateOfBirth?: Date;
  gender?: Gender;
}
