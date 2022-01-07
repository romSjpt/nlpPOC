import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DegreesModule } from './degrees/degrees.module';
// import { FilesModule } from './files/files.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [DegreesModule, FilesModule/*, FilesModule*/],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
