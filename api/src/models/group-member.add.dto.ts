import { ApiProperty } from "@nestjs/swagger";

export class GroupMemberAddDto {
  @ApiProperty({ required: true })
  personId: number;
}
