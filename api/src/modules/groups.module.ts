import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Group } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  providers: [],
  controllers: []
})
export class GroupsModule {}