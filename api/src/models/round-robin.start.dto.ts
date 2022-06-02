import { ApiProperty } from "@nestjs/swagger";

export class RoundRobinStartDto {
  @ApiProperty({ required: true })
  homeAndAwayGames: boolean;
}
