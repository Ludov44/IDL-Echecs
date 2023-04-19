import { Expect, Test, Setup} from "alsatian";
import { Chessboard, createEmptyChessboard, putPiece } from '../../main/ts/chessboard';
import { Move } from '../../main/ts/movements';
import * as isPossible from '../../main/ts/move-validation'
import * as pieces from '../../main/ts/piece'
import * as positions from './predefined-positions';

let chessboard: Chessboard;

export class TestBishopMoves {
    @Setup
    beforeEach() {
        chessboard = createEmptyChessboard();
        putPiece(chessboard, positions.E4, pieces.blackBishop);
    }

    @Test('A Bishop can move diagonally')
    testCanMoveDiagonally() {
        const e4ToA8: Move = { from: positions.E4, to: positions.A8};
        const e4ToB1: Move = { from: positions.E4, to: positions.B1};
        const e4ToH7: Move = { from: positions.E4, to: positions.H7};
        const e4To1H1: Move = { from: positions.E4, to: positions.H1};
        Expect(isPossible.bishopMove(chessboard, e4ToA8)).toBeTruthy();
        Expect(isPossible.bishopMove(chessboard, e4ToB1)).toBeTruthy();
        Expect(isPossible.bishopMove(chessboard, e4ToH7)).toBeTruthy();
        Expect(isPossible.bishopMove(chessboard, e4To1H1)).toBeTruthy();
    }

    @Test('A Bishop cannot move horizontally')
    testCannotMoveHorizontally() {
        const e4ToA3: Move = { from: positions.E4, to: positions.H4};
        const e4ToA4: Move = { from: positions.E4, to: positions.A4};
        Expect(isPossible.bishopMove(chessboard, e4ToA3)).not.toBeTruthy();
        Expect(isPossible.bishopMove(chessboard, e4ToA4)).not.toBeTruthy();
    }

    @Test('A Bishop cannot move vertically')
    testCannotMoveVertically() {
        const e4ToE1: Move = { from: positions.E4, to: positions.E1};
        const e4ToE8: Move = { from: positions.E4, to: positions.E8};
        Expect(isPossible.bishopMove(chessboard, e4ToE1)).not.toBeTruthy();
        Expect(isPossible.bishopMove(chessboard, e4ToE8)).not.toBeTruthy();
    }

    @Test('A Bishop can capture a piece from another color')
    testCanCaptureDifferentColor() {
        putPiece(chessboard, positions.A8, pieces.whitePawn);

        const e4ToA8: Move = { from: positions.E4, to: positions.E8};
        Expect(isPossible.bishopMove(chessboard, e4ToA8)).toBeTruthy();
    }

    @Test('A Bishop cannot capture a piece from the same color')
    testCannotCaptureSameColor() {
        putPiece(chessboard, positions.A8, pieces.blackPawn);
        const e4ToA8: Move = { from: positions.E4, to: positions.E8};
        Expect(isPossible.bishopMove(chessboard, e4ToA8)).not.toBeTruthy();
    }

    @Test('A Bishop cannot leap other pieces')
    testCannotLeapDiagonally() {
        putPiece(chessboard, positions.C6, pieces.whitePawn);
        const e4ToA8: Move = { from: positions.E4, to: positions.E8};
        Expect(isPossible.bishopMove(chessboard, e4ToA8)).not.toBeTruthy();
    }
}
