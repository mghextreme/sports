import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Team, TeamParticipant } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([Team,TeamParticipant])],
  providers: [],
  controllers: []
})
export class SportsModule {}
