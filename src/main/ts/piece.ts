
export type Piece = {
    symbol    : string,  
    isWhite   : boolean,
    name      : string,
}

export const NULL_PIECE: Piece = { symbol: '', name: 'Null', isWhite: false };

export const whitePawn     : Piece = {symbol : "♙", name: "White Pawn", isWhite : true};
export const whiteKing     : Piece = {symbol : "♔", name: "White Pawn", isWhite : true};
export const whiteQueen    : Piece = {symbol : "♕", name: "White Pawn", isWhite : true};
export const whiteRook    : Piece = {symbol : "♖", name: "White Pawn", isWhite : true};
export const whiteKnight   : Piece = {symbol : "♘", name: "White Pawn", isWhite : true};
export const whiteBishop   : Piece = {symbol : "♗", name: "White Pawn", isWhite : true};

export const blackPawn     : Piece = {symbol : "♟", name: "Black Pawn", isWhite : false};
export const blackKing     : Piece = {symbol : "♚", name: "Black Pawn", isWhite : false};
export const blackQueen    : Piece = {symbol : "♛", name: "Black Pawn", isWhite : false};
export const blackRook    : Piece = {symbol : "♜", name: "Black Pawn", isWhite : false};
export const blackKnight   : Piece = {symbol : "♞", name: "Black Pawn", isWhite : false};
export const blackBishop   : Piece = {symbol : "♝", name: "Black Pawn", isWhite : false};