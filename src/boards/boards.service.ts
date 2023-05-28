import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';

@Injectable()
export class BoardsService {
    private boards = [];

    getAllBoards(): Board[] {
        return this.boards;
    }

    createBoard(title: string, description: string): Board {
        const board: Board = {
            id: Date.now().toString(),
            title,
            description,
            status: BoardStatus.PUBLIC
        };
        this.boards.push(board);
        return board;
    }
}
