import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';
export declare class BoardsController {
    private boardsService;
    private logger;
    constructor(boardsService: BoardsService);
    getAllBoards(user: User): Promise<Board[]>;
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>;
    getBoardById(id: number): Promise<Board>;
    deleteBoardById(id: number, user: User): Promise<void>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
}
