import { Injectable } from '@nestjs/common';
import { Board } from './board.model';

@Injectable()
export class BoardsService {
    private boards = [];

    getAllBoards(): Board[] {
        return this.boards;
    }
}
