import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Modality, Team, TeamParticipant } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([Modality,Team,TeamParticipant])],
  providers: [],
  controllers: []
})
export class ModalitiesModule {}
