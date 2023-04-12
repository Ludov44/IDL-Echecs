import { Expect, Test, Setup} from "alsatian";
import { Chessboard, createEmptyChessboard, putPiece } from '../../main/ts/chessboard';
import { Move } from '../../main/ts/movements';
import * as isPossible from '../../main/ts/move-validation'
import * as pieces from '../../main/ts/piece'
import * as positions from './predefined-positions';

let chessboard: Chessboard;

export class TestRookMoves {
    @Setup
    beforeEach() {
        chessboard = createEmptyChessboard();
        putPiece(chessboard, positions.E4, pieces.whiteRook);
    }

    @Test('An Rook can move horizontally')
    testCanMoveHorizontally() {
        const e4ToH4: Move = { from: positions.E4, to: positions.H4 };
        const e4TOA4: Move = { from: positions.E4, to: positions.A4 };
    
        Expect(isPossible.rookMove(chessboard, e4ToH4)).toBeTruthy();
        Expect(isPossible.rookMove(chessboard, e4TOA4)).toBeTruthy();
    }

    @Test('A Rook can move vertically')
    testCanMoveVertically() {
        const e4ToE1: Move = { from: positions.E4, to: positions.E1 };
        const e4TOE8: Move = { from: positions.E4, to: positions.E8 };
    
        Expect(isPossible.rookMove(chessboard, e4ToE1)).toBeTruthy();
        Expect(isPossible.rookMove(chessboard, e4TOE8)).toBeTruthy();
    }

    @Test('A Rook cannot move diagonally')
    testCannotMoveDiagonally() {
        const e4ToA8: Move = { from: positions.E4, to:positions.A8};
        const e4ToB1: Move = { from: positions.E4, to:positions.B1};
        const e4ToH7: Move = { from: positions.E4, to:positions.H7};
        const e4ToH1: Move = { from: positions.E4, to:positions.H1};

        Expect(isPossible.rookMove(chessboard, e4ToA8)).not.toBeTruthy();
        Expect(isPossible.rookMove(chessboard, e4ToB1)).not.toBeTruthy();
        Expect(isPossible.rookMove(chessboard, e4ToH7)).not.toBeTruthy();
        Expect(isPossible.rookMove(chessboard, e4ToH1)).not.toBeTruthy();
    }

    @Test('A Rook can capture a piece from different color')
    testCanCaptureDifferentColor() {
        putPiece(chessboard, positions.H4, pieces.blackKnight);
        const e4ToH4: Move = { from : positions.E4, to:positions.H4};
        Expect(isPossible.rookMove(chessboard, e4ToH4)).toBeTruthy();
    }

    @Test('A Rook cannot capture a piece from the same color')
    testCannotCaptureSameColor() {
        putPiece(chessboard, positions.H4, pieces.whiteKnight);
        const e4ToH4: Move = { from : positions.E4, to:positions.H4};
        Expect(isPossible.rookMove(chessboard, e4ToH4)).not.toBeTruthy();
    }

    @Test('A Rook cannot leap other pieces, when moving horizontally')
    testCannotLeapHorizontally() {
        //check right movement
        putPiece(chessboard, positions.F4, pieces.blackPawn);
        const e4ToH4: Move = { from : positions.E4, to:positions.H4};
        Expect(isPossible.rookMove(chessboard, e4ToH4)).not.toBeTruthy();
        //check left movement
        putPiece(chessboard, positions.C4, pieces.blackPawn);
        const e4ToA4: Move = { from : positions.E4, to:positions.A4};
        Expect(isPossible.rookMove(chessboard, e4ToA4)).not.toBeTruthy();
    }

    @Test('A Rook cannot leap other pieces, when moving vertically')
    testCannotLeapvertically() {
        //check top movement
        putPiece(chessboard, positions.E3, pieces.blackPawn);
        const e4ToE1: Move = { from : positions.E4, to:positions.E1};
        Expect(isPossible.rookMove(chessboard, e4ToE1)).not.toBeTruthy();
        //check bottom movement
        putPiece(chessboard, positions.E6, pieces.blackPawn);
        const e4ToE8: Move = { from : positions.E4, to:positions.A4};
        Expect(isPossible.rookMove(chessboard, e4ToE8)).not.toBeTruthy();
    }
}
