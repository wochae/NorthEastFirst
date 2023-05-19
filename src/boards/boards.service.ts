import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
    getBoards(): string {
        return 'All boards';
    }
}
