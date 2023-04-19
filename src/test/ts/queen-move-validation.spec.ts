import { Expect, Test, Setup} from "alsatian";
import { Chessboard, createEmptyChessboard, putPiece } from '../../main/ts/chessboard';
import { Move } from '../../main/ts/movements';
import * as isPossible from '../../main/ts/move-validation'
import * as pieces from '../../main/ts/piece'
import * as positions from './predefined-positions';

let chessboard: Chessboard;

export class TestQueenMoves {
    @Setup
    beforeEach() {
        chessboard = createEmptyChessboard();
        putPiece(chessboard, positions.E4, pieces.whiteQueen);
    }

    @Test('A Queen can move diagonally')
    testCanMoveDiagonally() {
        // TODO:
        // Check the following moves are possible:
        // moveE4_A8, moveE4_B1, moveE4_H7, moveE4_H1
        const e4ToA8: Move = { from: positions.E4, to: positions.A8};
        const e4ToB1: Move = { from: positions.E4, to: positions.B1};
        const e4ToH7: Move = { from: positions.E4, to: positions.H7};
        const e4To1H1: Move = { from: positions.E4, to: positions.H1};
        Expect(isPossible.queenMove(chessboard, e4ToA8)).toBeTruthy();
        Expect(isPossible.queenMove(chessboard, e4ToB1)).toBeTruthy();
        Expect(isPossible.queenMove(chessboard, e4ToH7)).toBeTruthy();
        Expect(isPossible.queenMove(chessboard, e4To1H1)).toBeTruthy();
    }

    @Test('A Queen can move horizontally')
    testCanMoveHorizontally() {
        const e4ToH4: Move = { from: positions.E4, to: positions.H4 };
        const e4ToA4: Move = { from: positions.E4, to: positions.A4 };
    
        Expect(isPossible.rookMove(chessboard, e4ToH4)).toBeTruthy();
        Expect(isPossible.rookMove(chessboard, e4ToA4)).toBeTruthy();
    }

    @Test('A Queen can move vertically')
    testCanMoveVertically() {
        const e4ToE1: Move = { from: positions.E4, to: positions.E1 };
        const e4ToE8: Move = { from: positions.E4, to: positions.E8 };
    
        Expect(isPossible.rookMove(chessboard, e4ToE1)).toBeTruthy();
        Expect(isPossible.rookMove(chessboard, e4ToE8)).toBeTruthy();
    }

    @Test('A Queen can only move horizontally, vertically, and diagonally')
    testForbiddenMoves() {
        const e4ToC7: Move = { from: positions.E4, to: positions.C7 };
        const e4ToB2: Move = { from: positions.E4, to: positions.B2 };
    
        Expect(isPossible.rookMove(chessboard, e4ToC7)).not.toBeTruthy();
        Expect(isPossible.rookMove(chessboard, e4ToB2)).not.toBeTruthy();
    }

    @Test('A Queen cannot leap other pieces')
    testCannotLeap() {
        putPiece(chessboard, positions.C6, pieces.whitePawn);
        putPiece(chessboard, positions.F4, pieces.blackPawn);

        const e4ToA8: Move = { from: positions.E4, to: positions.A8 }; 
        const e4ToH4: Move = { from: positions.E4, to: positions.H4 };
    
        Expect(isPossible.rookMove(chessboard, e4ToA8)).not.toBeTruthy();
        Expect(isPossible.rookMove(chessboard, e4ToH4)).not.toBeTruthy();
    }

    @Test('A Queen cannot capure pieces from the same color')
    testCannotCaptureSameColor() {
        putPiece(chessboard, positions.H4, pieces.whitePawn);
        const e4ToH4: Move = { from: positions.E4, to: positions.H4 };
        Expect(isPossible.rookMove(chessboard, e4ToH4)).not.toBeTruthy();
    }

    @Test('A Queen can capure pieces from a different color')
    testCanCaptureDifferentColor() {
        putPiece(chessboard, positions.H4, pieces.blackPawn);
        const e4ToH4: Move = { from: positions.E4, to: positions.H4 };
        Expect(isPossible.rookMove(chessboard, e4ToH4)).toBeTruthy();
    }
}
