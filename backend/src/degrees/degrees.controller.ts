import { Controller, Get } from '@nestjs/common';
import { DegreesService } from './degrees.service';

@Controller('degrees')
export class DegreesController {
  constructor(private readonly degreesService: DegreesService) {}
 
  @Get()
  findAll(): string[] {
    return this.degreesService.getAll();
    
  }
}
