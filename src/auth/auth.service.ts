import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from 'src/boards/board.repository';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(BoardRepository)
        private userRepository: BoardRepository,
    ) { }
}
