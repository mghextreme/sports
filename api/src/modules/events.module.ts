import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EventsController } from "src/controllers";
import { Event, Group, Modality } from "src/entities";
import { EventsService } from "src/services";

@Module({
  imports: [TypeOrmModule.forFeature([Event, Modality, Group])],
  providers: [EventsService],
  controllers: [EventsController]
})
export class EventsModule {}
