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
        // TODO:
        // Initialize an empty chessboard
        // Place a white Queen on E4
    }

    @Test('A Queen can move diagonally')
    testCanMoveDiagonally() {
        // TODO:
        // Check the following moves are possible:
        // moveE4_A8, moveE4_B1, moveE4_H7, moveE4_H1
    }

    @Test('A Queen can move horizontally')
    testCanMoveHorizontally() {
        // TODO:
        // Check the following moves are possible: moveE4_H4, moveE4_A4
    }

    @Test('A Queen can move vertically')
    testCanMoveVertically() {
        // TODO:
        // Check the following moves are possible: moveE4_E1, moveE4_E8
    }

    @Test('A Queen can only move horizontally, vertically, and diagonally')
    testForbiddenMoves() {
        // TODO:
        // Check the following moves are impossible: moveE4_C7, moveE4_B2
    }

    @Test('A Queen cannot leap other pieces')
    testCannotLeap() {
        // TODO:
        // Place a white Pawn on C6 and  a black Pawn on F4
        // Check the moves moveE4_A8 and moveE4_H4 are impossible
    }

    @Test('A Queen cannot capure pieces from the same color')
    testCannotCaptureSameColor() {
        // TODO:
        // Place a white Pawn on H4
        // Check the move moveE4_H4 is impossible
    }

    @Test('A Queen can capure pieces from a different color')
    testCanCaptureDifferentColor() {
        // TODO:
        // Place a black Pawn on H4
        // Check the move moveE4_H4 is possible
    }
}
