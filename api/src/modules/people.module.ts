import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PeopleController } from "src/controllers";
import { Person } from "src/entities";
import { PeopleService } from "src/services";

@Module({
  imports: [TypeOrmModule.forFeature([Person])],
  providers: [PeopleService],
  controllers: [PeopleController]
})
export class PeopleModule {}