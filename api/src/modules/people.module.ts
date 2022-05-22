import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [],
  controllers: []
})
export class PeopleModule {}