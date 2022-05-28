import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventsModule, GroupsModule, ModalitiesModule, PeopleModule, SportsModule, StagesModule } from './modules';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      load: [configuration],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async(configService: ConfigService) => configService.get('database'),
      inject: [ConfigService]
    }),
    EventsModule,
    GroupsModule,
    ModalitiesModule,
    PeopleModule,
    SportsModule,
    StagesModule
  ]
})
export class AppModule {}
