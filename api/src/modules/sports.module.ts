import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sport } from "src/entities";

@Module({
  imports: [TypeOrmModule.forFeature([Sport])],
  providers: [],
  controllers: []
})
export class SportsModule {}