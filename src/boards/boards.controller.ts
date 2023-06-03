import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
private logger = new Logger('BoardController');

    constructor(private boardsService: BoardsService) { }

    /*
        boardsService: BoardsService;
    
        constructor(boardsService: BoardsService) {
            this.boardsService = boardsService;
        }
    
    */

    @Get()
    getAllBoards(
        @GetUser() user: User,
    ): Promise<Board[]> {
        this.logger.verbose(`User ${user.username} trying to get all boards`);
        return this.boardsService.getAllBoards(user);        
    }
    // @Get('/')
    // getBoards(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }
    // /*
    //     좌항 우항에 있는 boardsService는 서로 다른 객체이다. 
    // */

    
    // @Post()
    // @UsePipes(ValidationPipe)
    // createBoard(@Body() createBoardDto :CreateBoardDto): Board {
    //     return this.boardsService.createBoard(createBoardDto);
    // }
    
    @Post()
    @UsePipes(ValidationPipe)
    createBoard(
        @Body() createBoardDto: CreateBoardDto,
        @GetUser() user:User,
        ): Promise<Board> {
        this.logger.verbose(`User "${user.username}" creating a new board.
        Payload: ${JSON.stringify(createBoardDto)}`)
        return this.boardsService.createBoard(createBoardDto, user);
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }
    // @Get('/:id')
    // getBoardById(@Param('id') id: string): Board {
    //     return this.boardsService.getBoardById(id);
    // }

    @Delete('/:id')
    deleteBoardById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
        ): Promise<void> {
        return this.boardsService.deleteBoard(id, user);
    }
    // @Delete('/:id')
    // deleteBoardById(@Param('id') id: string): void {
    //     this.boardsService.deleteBoard(id);
    // }

    @Patch('/:id/status')
    updateBoardStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    ): Promise<Board> {
        return this.boardsService.updateBoardStatus(id, status);
    }



    // @Patch('/:id/status')
    // updateBoardStatus(
    //     @Param('id') id: string, 
    //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
    // ): Board {
    //     return this.boardsService.updateBoardStatus(id, status);
    // }
}
