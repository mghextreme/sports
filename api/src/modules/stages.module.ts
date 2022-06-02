import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StagesController } from "src/controllers";
import { Match, MatchTeam, Stage, Team } from "src/entities";
import { StagesService } from "src/services";

@Module({
  imports: [TypeOrmModule.forFeature([Stage, Team, Match, MatchTeam])],
  providers: [StagesService],
  controllers: [StagesController]
})
export class StagesModule {}
