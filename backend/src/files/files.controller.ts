import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {FileInterceptor } from '@nestjs/platform-express'
import { Express } from 'express';
import { FilesService } from './files.service';

export class FileDto {
  name: string;
}

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() body: FileDto,
    @UploadedFile() file: Express.Multer.File) {
      console.log("test file ",file.buffer.toString());
      return {
        body,
        file: file.filename,
      };
  }
}


