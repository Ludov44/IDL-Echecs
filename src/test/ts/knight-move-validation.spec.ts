import { Expect, Test, Setup} from "alsatian";
import { Chessboard, createEmptyChessboard, putPiece } from '../../main/ts/chessboard';
import { Move } from '../../main/ts/movements';
import * as isPossible from '../../main/ts/move-validation'
import * as pieces from '../../main/ts/piece'
import * as positions from './predefined-positions';
import { position } from "../../main/ts/position";

let chessboard: Chessboard;

export class TestKnightMoves {
    @Setup
    beforeEach() {
        chessboard = createEmptyChessboard();
        putPiece(chessboard, positions.E4, pieces.whiteKing);
    }

    @Test('A Knight can move two squares horizontally and one square vertically')
    testCanMoveThreeHorizontalAndOneVertical() {
        const e4ToG3: Move = { from: positions.E4, to: positions.G3 };
        const e4ToG5: Move = { from: positions.E4, to: positions.G5 };
        const e4ToC3: Move = { from: positions.E4, to: positions.C3 };
        const e4ToC5: Move = { from: positions.E4, to: positions.C5 };
    
        Expect(isPossible.knightMove(chessboard, e4ToG3)).toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToG5)).toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToC3)).toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToC5)).toBeTruthy();
    }

    @Test('A Knight can move two squares vertically and one square horizontally')
    testCanMoveThreeVerticalAndOneHorizontal() {
        const e4ToF2: Move = { from: positions.E4, to: positions.F2 };
        const e4ToF6: Move = { from: positions.E4, to: positions.F6 };
        const e4ToD2: Move = { from: positions.E4, to: positions.D2 };
        const e4ToD6: Move = { from: positions.E4, to: positions.D6 };
    
        Expect(isPossible.knightMove(chessboard, e4ToF2)).toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToF6)).toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToF2)).toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToD6)).toBeTruthy();
    }

    @Test('A Knight can leap other pieces')
    testCanLeapOtherPieces() {
        putPiece(chessboard, positions.E5, pieces.whiteKnight);
        putPiece(chessboard, positions.E5, pieces.whiteKnight);
        putPiece(chessboard, positions.F4, pieces.whiteKnight);
        putPiece(chessboard, positions.F3, pieces.whiteKnight);
        const e4ToF6: Move = { from : positions.E4, to:positions.F6};
        const e4ToG3: Move = { from : positions.E4, to:positions.G3};
        Expect(isPossible.knightMove(chessboard, e4ToF6)).toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToG3)).toBeTruthy();
    }

    @Test('A Knight cannot move diagonally')
    testCannotMoveDiagonally() {
        const e4ToF5: Move = { from: positions.E4, to:positions.F5};
        const e4ToG2: Move = { from: positions.E4, to:positions.G2};
        const e4ToD3: Move = { from: positions.E4, to:positions.D3};
        const e4ToC6: Move = { from: positions.E4, to:positions.C6};

        Expect(isPossible.knightMove(chessboard, e4ToF5)).not.toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToG2)).not.toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToD3)).not.toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToC6)).not.toBeTruthy();
    }

    @Test('A Knight cannot move horizontally')
    testCannotMoveHorizontally() {
        const e4ToF4: Move = { from: positions.E4, to:positions.F4};
        const e4ToG4: Move = { from: positions.E4, to:positions.G4};
        const e4ToD4: Move = { from: positions.E4, to:positions.D4};
        const e4ToC4: Move = { from: positions.E4, to:positions.C4};

        Expect(isPossible.knightMove(chessboard, e4ToF4)).not.toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToG4)).not.toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToD4)).not.toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToC4)).not.toBeTruthy();
    }

    @Test('A Knight cannot move vertically')
    testCannotMoveVertically() {
        const e4ToE5: Move = { from: positions.E4, to:positions.E5};
        const e4ToE6: Move = { from: positions.E4, to:positions.E6};
        const e4ToE3: Move = { from: positions.E4, to:positions.E3};
        const e4ToE2: Move = { from: positions.E4, to:positions.E2};

        Expect(isPossible.knightMove(chessboard, e4ToE5)).not.toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToE6)).not.toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToE3)).not.toBeTruthy();
        Expect(isPossible.knightMove(chessboard, e4ToE2)).not.toBeTruthy();
    }

    @Test('A Knight can capture a piece from another color')
    testCanCaptureAnotherColor() {
        putPiece(chessboard, positions.F6, pieces.blackKnight);
        const e4ToF6: Move = { from : positions.E4, to:positions.F6};
        Expect(isPossible.knightMove(chessboard, e4ToF6)).toBeTruthy();
    }

    @Test('A Knight cannot capture a piece from the same color')
    testCannotCaptureSameColor() {
        putPiece(chessboard, positions.F6, pieces.whiteKnight);
        const e4ToF6: Move = { from : positions.E4, to:positions.F6};
        Expect(isPossible.knightMove(chessboard, e4ToF6)).not.toBeTruthy();
    }
}
