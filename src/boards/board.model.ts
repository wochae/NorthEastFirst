export interface Board {
    id: string;
    title:string;
    descriptoin: string;
    status: BoardStatus;
}

export enum BoardStatus {
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}
