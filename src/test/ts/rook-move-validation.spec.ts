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
        // TODO:
        // Initialize an empty chessboard
        // Place a white Rook on E4
    }

    @Test('An Rook can move horizontally')
    testCanMoveHorizontally() {
        // TODO:
        // Check the following moves are possible: moveE4_H4, moveE4_A4
    }

    @Test('A Rook can move vertically')
    testCanMoveVertically() {
        // TODO:
        // Check the following moves are possible: moveE4_E1, moveE4_E8
    }

    @Test('A Rook cannot move diagonally')
    testCannotMoveDiagonally() {
        // TODO:
        // Check the following moves are impossible:
        // moveE4_A8, moveE4_B1, moveE4_H7, moveE4_H1
    }

    @Test('A Rook can capture a piece from different color')
    testCanCaptureDifferentColor() {
        // TODO:
        // Place a black Pawn on H4
        // Check the move moveE4_H4 is possible
    }

    @Test('A Rook cannot capture a piece from the same color')
    testCannotCaptureSameColor() {
        // TODO:
        // Place a white Pawn on H4
        // Check the move moveE4_H4 is impossible
    }

    @Test('A Rook cannot leap other pieces, when moving horizontally')
    testCannotLeapHorizontally() {
        // TODO:
        // Place a black Pawn on F4
        // Check the move moveE4_H4 is impossible
    }

    @Test('A Rook cannot leap other pieces, when moving vertically')
    testCannotLeapvertically() {
        // TODO:
        // Place a black Pawn on E3
        // Check the move moveE4_E1 is impossible
    }
}
