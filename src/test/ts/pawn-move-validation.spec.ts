import { Expect, Test, Setup } from "alsatian";
import { Chessboard, createEmptyChessboard, putPiece } from '../../main/ts/chessboard';
import { Move } from '../../main/ts/movements';
import * as isPossible from '../../main/ts/move-validation'
import * as pieces from '../../main/ts/piece'
import * as positions from './predefined-positions';



let chessboard: Chessboard;


export class TestBlackPawnMoves {
    chessboard: Chessboard;
    @Setup
    beforeEach() {
        chessboard = createEmptyChessboard();
    }

    @Test('Pawns can move forward')
    testPawnCanMoveForward() {
        putPiece(chessboard, positions.A7, pieces.blackPawn);
        const singleForward: Move = { from: positions.A7, to: positions.A6 };
        Expect(isPossible.blackPawnMove(chessboard, singleForward)).toBeTruthy();
    }

    @Test('Pawns cannot move backward')
    testPawnCannotMoveBackward() {
        putPiece(chessboard, positions.A7, pieces.blackPawn);
        const singleForward: Move = { from: positions.A7, to: positions.A8 };
        Expect(isPossible.blackPawnMove(chessboard, singleForward)).not.toBeTruthy();
    }

    @Test('When in the initial position, paws can move 2 squares forward')
    testPawnInitialMove() {
        putPiece(chessboard, positions.A7, pieces.blackPawn);
        const doubleForward: Move = { from: positions.A7, to: positions.A5 };
        Expect(isPossible.blackPawnMove(chessboard, doubleForward)).toBeTruthy();
    }

    @Test('When a paws has already moved, it cannot move 2 squares forward')
    testCannotMoveTwoSquaresIfAlreadyMoved() {
        putPiece(chessboard, positions.C6, pieces.blackPawn);
        const doubleForward: Move = { from: positions.C6, to: positions.C4 };
        Expect(isPossible.blackPawnMove(chessboard, doubleForward)).not.toBeTruthy();
    }

    @Test('When in the initial position, pawns cannot move 3 squares forward')
    testCannotMoveThreeSquares() {
        putPiece(chessboard, positions.C6, pieces.blackPawn);
        const tripleForward: Move = { from: positions.A7, to: positions.A4 };
        Expect(isPossible.blackPawnMove(chessboard, tripleForward)).not.toBeTruthy();
    }

    @Test('When in face of another piece, pawns cannot move foreward')
    testPawnCannotMoveForwardToFullSquare() {
        putPiece(chessboard, positions.A6, pieces.whitePawn);
        putPiece(chessboard, positions.A7, pieces.blackPawn);
        const singleForward: Move = { from: positions.A7, to: positions.A6 };
        Expect(isPossible.blackPawnMove(chessboard, singleForward)).not.toBeTruthy();
    }

    @Test('Pawns cannot capture an empty square ')
    testPawnCannotCaptureEmptySquare() {
        putPiece(chessboard, positions.A7, pieces.blackPawn);
        const diagonalCapture: Move = { from: positions.A7, to: positions.B6 };
        Expect(isPossible.blackPawnMove(chessboard, diagonalCapture)).not.toBeTruthy();
    }

    @Test('Pawns cannot capture pieces of the same color')
    testPawnCannotCaptureSameColor() {
        putPiece(chessboard, positions.A7, pieces.blackPawn);
        putPiece(chessboard, positions.B6, pieces.blackKing);

        const diagonalCapture: Move = { from: positions.A7, to: positions.B6 };
        Expect(isPossible.blackPawnMove(chessboard, diagonalCapture)).not.toBeTruthy();
    }

    @Test('Pawns can capture pieces of a different color')
    testPawnCanCaptureDifferentColorPieces() {
        putPiece(chessboard, positions.A7, pieces.blackPawn);
        putPiece(chessboard, positions.B6, pieces.whiteQueen);

        const diagonalCapture: Move = { from: positions.A7, to: positions.B6 };
        Expect(isPossible.blackPawnMove(chessboard, diagonalCapture)).toBeTruthy();
    }
}
