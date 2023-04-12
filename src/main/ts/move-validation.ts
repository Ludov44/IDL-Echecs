import { Chessboard, isEmpty, Square, squareAtPosition } from './chessboard';
import { Move } from './movements';
import { equals, left, right, top, bottom, Position } from './position';


/**
 * Checks whether the color of the depart position and the color of the piece 
 * at destination matches to capture it or if the square is empty.
 * @param board The chessboard of the current game
 * @param move The move to check
 * @returns The validity of the move
 */

function isMovePossible(board: Chessboard, move: Move): boolean{
    let isDestinationWhite: boolean = squareAtPosition(board, move.to).piece.isWhite;
    let isPosDepartWhite: boolean = squareAtPosition(board, move.from).piece.isWhite;
    return(isEmpty(board, move.to) || isDestinationWhite != isPosDepartWhite);
}




/**
 * Checks whether a Black Pawn can perform a given move.
 * A pawn can move forward to the unoccupied square immediately in front of
 * it on the same file, or on its first move it can advance two squares along
 * the same file, provided both squares are unoccupied (black dots in the
 * diagram); or the pawn can capture an opponent's piece on a square diagonally
 * in front of it on an adjacent file, by moving to that square (black "x"s).
 *
 *
 * @param board The chessboard of the current game
 * @param move
 */
export function blackPawnMove(board: Chessboard, move: Move): boolean {
    if (equals(move.to, bottom(move.from))) {
        //console.log("Single forward");
        return isEmpty(board, move.to);
    }

    if (move.from.rank == 6 && equals(move.to, bottom(bottom(move.from)))) {
        //console.log("Double forward");
        return isEmpty(board, bottom(move.from)) && isEmpty(board, move.to);
    }

    if (equals(move.to, left(bottom(move.from))) || equals(move.to, right(bottom(move.from)))) {
        const destination: Square = squareAtPosition(board, move.to);
        return !(destination.isEmpty || !destination.piece.isWhite);
    }

    return false;
}

/**
 * A pawn can move forward to the unoccupied square immediately in front of
 * it on the same file, or on its first move it can advance two squares along
 * the same file, provided both squares are unoccupied (black dots in
 * the diagram); or the pawn can capture an opponent's piece on a square diagonally
 * in front of it on an adjacent file, by moving to that square (black "x"s).
 *
 *
 * @param board The chessboard of the current game
 * @param move
 */
export function whitePawnMove(board: Chessboard, move: Move): boolean {
    if (equals(move.to, top(move.from))) {
        return isEmpty(board, move.to);
    }

    if (move.from.rank == 1 && equals(move.to, top(top(move.from)))) {
        return isEmpty(board, top(move.from)) && isEmpty(board, move.to);
    }

    if (equals(move.to, left(top(move.from))) || equals(move.to, right(top(move.from)))) {
        const destination: Square = squareAtPosition(board, move.to);
        return !(destination.isEmpty || destination.piece.isWhite);
    }

    return false;
}

/**
 * Checks whether a King can perform a given move.
 * The king moves one square in any direction.
 *
 * @param board The chessboard of the current game
 * @param move
 */
export function kingMove(board: Chessboard, move: Move): boolean {

    let movePossible : boolean = isMovePossible(board, move);
    if(!movePossible) return false;
    
    if (equals(move.to, top(move.from))) {
        return movePossible;
    }
    if (equals(move.to, top(left(move.from)))) {
        return movePossible;
    }
    if (equals(move.to, top(right(move.from)))) {
        return movePossible;
    }
    if (equals(move.to, right(move.from))) {
        return movePossible;
    }
    if (equals(move.to, left(move.from))) {
        return movePossible;
    }
    if (equals(move.to, bottom(move.from))) {
        return movePossible;
    }
    if (equals(move.to, bottom(left(move.from)))) {
        return movePossible;
    }
    if (equals(move.to, bottom(right(move.from)))) {
        return movePossible;
    }
    return false;
}

/**
 * Checks whether a Rook can perform a given move.
 * An Rook can move any number of squares along a rank or file,
 * but cannot leap over other pieces.
 * 
 * @param board The chessboard of the current game
 * @param move
 */
export function rookMove(board: Chessboard, move: Move): boolean {
    // #TODO: Implement this function
    let movePossible : boolean = isMovePossible(board, move);
    if(!movePossible) return false;

    let rankDifference : number = move.to.rank - move.from.rank;
    let fileDifference : number = move.to.file - move.from.file;
    let endingPos : Position = move.from;

    if(rankDifference > 0 && fileDifference == 0){
        for(let i : number = 1; i < rankDifference ; i++){
                endingPos.rank = move.from.rank + i;
                if (!isEmpty(board, endingPos)) return false;
        }
    }
    if(rankDifference < 0 && fileDifference == 0){
        for(let i : number = -1; i > rankDifference ; i--){
                endingPos.rank = move.from.rank + i;
                if (!isEmpty(board, endingPos)) return false;
        }
    }
    if(fileDifference > 0 && rankDifference == 0){
        for(let i : number = 1; i < fileDifference ; i++){
                endingPos.file = move.from.file + i;
                if (!isEmpty(board, endingPos)) return false;
        }
    }
    if(fileDifference < 0 && rankDifference == 0){
        for(let i : number = -1; i > fileDifference ; i--){
                endingPos.file = move.from.file + i;
                if (!isEmpty(board, endingPos)) return false;
        }
    }

    return movePossible;
}

/**
 * Checks whether a Bishop can perform a given move.
 * A Bishop can move any number of squares diagonally,
 * but cannot leap over other pieces.
 *
 * @param board The chessboard of the current game
 * @param move
 */
export function bishopMove(board: Chessboard, move: Move): boolean {
    let movePossible : boolean = isMovePossible(board, move);
    if(!movePossible) return false;

    let rankDifference : number = move.to.rank - move.from.rank;
    let fileDifference : number = move.to.file - move.from.file;
    //If diagonal, difference between file and rank should be equal because move can be assimilate to a square
    if(Math.abs(rankDifference) != Math.abs(fileDifference)){
        return false;
    }
    if(rankDifference < 0 && fileDifference < 0){
        let moveInc : Position = move.from;
        for(let i = rankDifference; i < move.from.rank; i++){
            moveInc.rank = move.from.rank + i;
            moveInc.file = move.from.file - i;
            if(!isEmpty(board, moveInc)) return false;
        }
    }
    if(rankDifference > 0 && fileDifference < 0){
        let moveInc : Position = move.from;
        for(let i = rankDifference; i < move.from.rank; i++){
            moveInc.rank = move.from.rank - i;
            moveInc.file = move.from.file - i;
            if(!isEmpty(board, moveInc)) return false;
        }
    }
    if(rankDifference < 0 && fileDifference > 0){
        let moveInc : Position = move.from;
        for(let i = rankDifference; i < move.from.rank; i++){
            moveInc.rank = move.from.rank - i;
            moveInc.file = move.from.file + i;
            if(!isEmpty(board, moveInc)) return false;
        }
    }
    if(rankDifference > 0 && fileDifference > 0){
        let moveInc : Position = move.from;
        for(let i = rankDifference; i < move.from.rank; i++){
            moveInc.rank = move.from.rank + i;
            moveInc.file = move.from.file + i;
            if(!isEmpty(board, moveInc)) return false;
        }
    }
    return movePossible;
}

/**
 * Checks whether a Knight can perform a given move.
 * The Knight move forms an "L"-shape:
 * two squares vertically and one square horizontally, or two
 * squares horizontally and one square vertically.)
 *
 * The Knight can leap over other pieces.
 *
 * @param board The chessboard of the current game
 * @param move
 */
export function knightMove(board: Chessboard, move: Move): boolean {
    // #TODO: Implement this function
    
    let movePossible : boolean = isMovePossible(board, move);
    if(!movePossible) return false;

    if (equals(move.to, top(top(left(move.from))))) {
        return movePossible;
    }
    if (equals(move.to, top(top(right(move.from))))) {
        return movePossible;
    }
    if (equals(move.to, left(left(top(move.from))))) {
        return movePossible;
    }
    if (equals(move.to, left(left(bottom(move.from))))) {
        return movePossible;
    }
    if (equals(move.to, right(right(bottom(move.from))))) {
        return movePossible;
    }
    if (equals(move.to, right(right(top(move.from))))) {
        return movePossible;
    }
    if (equals(move.to, bottom(bottom(left(move.from))))) {
        return movePossible;
    }
    if (equals(move.to, bottom(bottom(right(move.from))))) {
        return movePossible;
    }
    return false;
}


/**
 * Checks whether a Queen can perform a given move.
 * The queen combines the power of a rook and bishop and can move any
 * number of squares along a rank, file, or diagonal, but cannot leap over other pieces.
 *
 * @param board The chessboard of the current game
 * @param move
 */
export function queenMove(board: Chessboard, move: Move): boolean {
    // #TODO: Implement this function
    let movePossible : boolean = isMovePossible(board, move);
    if(!movePossible) return false;

    if((rookMove(board, move))||(bishopMove(board,move))) return true;
    
    return false;
}