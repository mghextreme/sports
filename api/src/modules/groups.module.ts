import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GroupsController } from "src/controllers";
import { Group, Person } from "src/entities";
import { GroupsService } from "src/services";

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  providers: [GroupsService],
  controllers: [GroupsController]
})
export class GroupsModule {}