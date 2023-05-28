import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board, BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) { }

    /*
        boardsService: BoardsService;
    
        constructor(boardsService: BoardsService) {
            this.boardsService = boardsService;
        }
    
    */
    @Get('/')
    getBoards(): Board[] {
        return this.boardsService.getAllBoards();
    }
    /*
        좌항 우항에 있는 boardsService는 서로 다른 객체이다. 
    */

    @Post()
    createBoard(
        @Body() createBoardDto :CreateBoardDto
        
    ): Board {
        return this.boardsService.createBoard(createBoardDto);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id);
    }

    @Delete('/:id')
    deleteBoardById(@Param('id') id: string): void {
        this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id') id: string, 
        @Body('status') status: BoardStatus
    )   {
        return this.boardsService.updateBoardStatus(id, status);
    }
}
