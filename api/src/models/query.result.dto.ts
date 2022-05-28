import { ApiProperty } from "@nestjs/swagger";

export class QueryResultDto {
  @ApiProperty()
  success: boolean;
}
