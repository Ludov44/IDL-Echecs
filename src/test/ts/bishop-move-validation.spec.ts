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
        // TODO:
        // Initialize an empty chessboard
        // Place a black Bishop on E4
    }

    @Test('A Bishop can move diagonally')
    testCanMoveDiagonally() {
        // TODO:
        // Check the following moves are possible:
        // moveE4_A8, moveE4_B1, moveE4_H7, moveE4_H1
    }

    @Test('A Bishop cannot move horizontally')
    testCannotMoveHorizontally() {
        // TODO:
        // Check the following moves are impossible: moveE4_H4, moveE4_A4
    }

    @Test('A Bishop cannot move vertically')
    testCannotMoveVertically() {
        // TODO:
        // Check the following moves are impossible: moveE4_E1, moveE4_E8
    }

    @Test('A Bishop can capture a piece from another color')
    testCanCaptureDifferentColor() {
        // TODO:
        // Place a white Pawn on A8
        // Check the move moveE4_A8 is possible
    }

    @Test('A Bishop cannot capture a piece from the same color')
    testCannotCaptureSameColor() {
        // TODO:
        // Place a black Pawn on A8
        // Check the move moveE4_A8 is impossible
    }

    @Test('A Bishop cannot leap other pieces')
    testCannotLeapDiagonally() {
        // TODO:
        // Place a white Pawn on C6
        // Check the move moveE4_A8 is impossible
    }
}
