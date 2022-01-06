import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DegreesModule } from './degrees/degrees.module';

@Module({
  imports: [DegreesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
