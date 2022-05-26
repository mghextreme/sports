import { ApiProperty } from "@nestjs/swagger";
import { Person } from "src/entities";
import { Gender } from "src/entities/gender.enum";
import { ICreateDto } from "./create.dto.interface";

export class PersonCreateDto implements ICreateDto<Person> {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ nullable: true, default: null })
  document?: string;

  @ApiProperty({ nullable: true, default: null })
  email?: string;

  @ApiProperty({ nullable: true, default: null })
  dateOfBirth?: Date;

  @ApiProperty({ enum: Gender, default: Gender.Unidentified })
  gender?: Gender;
}
