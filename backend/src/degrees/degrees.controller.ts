import { Controller, Get } from '@nestjs/common';
import { DegreesService } from './degrees.service';

@Controller('degrees')
export class DegreesController {
  constructor(private readonly degreesService: DegreesService) {}
  degrees: string[] = [
    "Computer Scinece degree",
    "Philosophy degree",
    "Psychology degree",
    "Ecomomics degree",
];
  @Get()
  findAll(): string[] {
    return this.degrees;
  }
}
