import { Expect, Test, Setup} from "alsatian";
import { Chessboard, createEmptyChessboard, putPiece } from '../../main/ts/chessboard';
import { Move } from '../../main/ts/movements';
import * as isPossible from '../../main/ts/move-validation'
import * as pieces from '../../main/ts/piece'
import * as positions from './predefined-positions';

let chessboard: Chessboard;

export class TestKingMoves {
    @Setup
    beforeEach() {
        // TODO:
        // Initialize an empty chessboard
        // Place a black King on E4
        chessboard = createEmptyChessboard();
        putPiece(chessboard, positions.E4, pieces.blackKing);
    }

    @Test('A King can move 1 square in all directions')
    testCanMoveOneSquare() {
        // TODO:
        // Check it can move to squares D3, D4, D5, E3, E5, F3, F4, and F5
        const singleBackward: Move = { from: positions.E4, to: positions.E3 };
        Expect(isPossible.blackPawnMove(chessboard, singleBackward)).toBeTruthy();
        
    }

    @Test('A King cannot move more than 1 square')
    testCannotMoveMoreThanOneSquare() {
        // TODO:
        // Check it cannot move to squares C2, C3, C4, C6, E2, E6, G2, G4, and G6
    }

    @Test('A King cannot capure pieces from the same color')
    testCannotCaptureSameColor() {
        // TODO:
        // Place a black Pawn on E5
        // Check the King cannot move to E5.
    }

    @Test('A King can capure pieces from a different color')
    testCanCaptureSameColor() {
        // TODO:
        // Place a white Pawn on E5
        // Check the King can move to E5.
    }
}
