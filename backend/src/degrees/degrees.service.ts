import { Injectable } from '@nestjs/common';

@Injectable()
export class DegreesService {
    private degrees: string[] = [
        "Computer Scinece degree",
        "Philosophy degree",
        "Psychology degree",
        "Ecomomics degree",
    ];
    getAll(){
        return this.degrees;
    }
}
