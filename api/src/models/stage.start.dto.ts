import { ApiProperty } from "@nestjs/swagger";
import { RoundRobinStartDto } from "./round-robin.start.dto";

export class StageStartDto {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true, description: "Order of teams will be used for seeding." })
  teamIds: number[];

  @ApiProperty({ required: false, description: "Required when stage is in Round Robin mode." })
  roundRobin: RoundRobinStartDto;
}
