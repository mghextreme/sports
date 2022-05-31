import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeamsController } from "src/controllers";
import { Team, TeamParticipant } from "src/entities";
import { TeamsService } from "src/services";

@Module({
  imports: [TypeOrmModule.forFeature([Team,TeamParticipant])],
  providers: [TeamsService],
  controllers: [TeamsController]
})
export class TeamsModule {}
