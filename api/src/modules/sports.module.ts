import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SportsController } from "src/controllers";
import { Sport } from "src/entities";
import { SportsService } from "src/services";

@Module({
  imports: [TypeOrmModule.forFeature([Sport])],
  providers: [SportsService],
  controllers: [SportsController]
})
export class SportsModule {}