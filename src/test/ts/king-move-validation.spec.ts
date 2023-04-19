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
        const e4ToD3: Move = { from: positions.E4, to: positions.D3};
        const e4ToD4: Move = { from: positions.E4, to: positions.D4};
        const e4ToD5: Move = { from: positions.E4, to: positions.D5};
        const e4ToE3: Move = { from: positions.E4, to: positions.E3};
        const e4ToE5: Move = { from: positions.E4, to: positions.E5};
        const e4ToF3: Move = { from: positions.E4, to: positions.F3};
        const e4ToF4: Move = { from: positions.E4, to: positions.F4};
        const e4ToF5: Move = { from: positions.E4, to: positions.F5};
        
        Expect(isPossible.kingMove(chessboard, e4ToD3)).toBeTruthy();
        Expect(isPossible.kingMove(chessboard, e4ToD4)).toBeTruthy();
        Expect(isPossible.kingMove(chessboard, e4ToD5)).toBeTruthy();
        Expect(isPossible.kingMove(chessboard, e4ToE3)).toBeTruthy();
        Expect(isPossible.kingMove(chessboard, e4ToE5)).toBeTruthy();
        Expect(isPossible.kingMove(chessboard, e4ToF3)).toBeTruthy();
        Expect(isPossible.kingMove(chessboard, e4ToF4)).toBeTruthy();
        Expect(isPossible.kingMove(chessboard, e4ToF5)).toBeTruthy();
    }
   
    @Test('A King cannot move more than 1 square')
    testCannotMoveMoreThanOneSquare() {
        const e4ToC2: Move = { from: positions.E4, to: positions.C2};
        const e4ToC3: Move = { from: positions.E4, to: positions.C3};
        const e4ToC4: Move = { from: positions.E4, to: positions.C4};
        const e4ToC6: Move = { from: positions.E4, to: positions.C6};
        const e4ToE2: Move = { from: positions.E4, to: positions.E2};
        const e4ToE6: Move = { from: positions.E4, to: positions.E6};
        const e4ToG2: Move = { from: positions.E4, to: positions.G2};
        const e4ToG4: Move = { from: positions.E4, to: positions.G4};
        const e4ToG6: Move = { from: positions.E4, to: positions.G6};
        
        Expect(isPossible.kingMove(chessboard, e4ToC2)).not.toBeTruthy();
        Expect(isPossible.kingMove(chessboard, e4ToC3)).not.toBeTruthy();
        Expect(isPossible.kingMove(chessboard, e4ToC4)).not.toBeTruthy();
        Expect(isPossible.kingMove(chessboard, e4ToC6)).not.toBeTruthy();
        Expect(isPossible.kingMove(chessboard, e4ToE2)).not.toBeTruthy();
        Expect(isPossible.kingMove(chessboard, e4ToE6)).not.toBeTruthy();
        Expect(isPossible.kingMove(chessboard, e4ToG2)).not.toBeTruthy();
        Expect(isPossible.kingMove(chessboard, e4ToG4)).not.toBeTruthy();
        Expect(isPossible.kingMove(chessboard, e4ToG6)).not.toBeTruthy();
    }

    @Test('A King cannot capure pieces from the same color')
    testCannotCaptureSameColor() {
        putPiece(chessboard, positions.E5, pieces.blackPawn);
        const singleForward: Move = { from: positions.E4, to: positions.E5};

        Expect(isPossible.kingMove(chessboard, singleForward)).not.toBeTruthy();
    }

    @Test('A King can capure pieces from a different color')
    testCanCaptureSameColor() {

        putPiece(chessboard, positions.E5, pieces.whitePawn);
        const singleForward: Move = { from: positions.E4, to: positions.E5};

        Expect(isPossible.kingMove(chessboard, singleForward)).toBeTruthy();
    }
}
