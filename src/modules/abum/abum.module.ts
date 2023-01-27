import { Module } from '@nestjs/common';
import { AbumService } from './abum.service';
import { AbumController } from './abum.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abum } from './entities/abum.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Abum])],
  controllers: [AbumController],
  providers: [AbumService]
})
export class AbumModule {}
