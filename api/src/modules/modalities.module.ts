import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModalitiesController } from "src/controllers";
import { Match, Modality, Stage, Team, TeamParticipant } from "src/entities";
import { ModalitiesService } from "src/services";

@Module({
  imports: [TypeOrmModule.forFeature([Modality, Stage, Team, TeamParticipant, Match])],
  providers: [ModalitiesService],
  controllers: [ModalitiesController]
})
export class ModalitiesModule {}
