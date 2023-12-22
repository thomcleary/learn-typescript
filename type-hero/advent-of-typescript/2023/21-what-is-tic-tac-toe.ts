// What is Tic Tac Toe?
// Tic-Tac-Toe is a two-player game where players alternate marking ❌s and ⭕s in a 3x3 grid, aiming to get three in a row.

// fun fact: Did you know that tic tac toe is widely considered to be the first computer video game ever created?!
// That's right!
// A S Douglas implemented it all the way back in 1952, the same year as the coronation of Queen Elizabeth II.

// Solving Tic Tac Toe
// Your goal for this challenge is to use TypeScript types to encode the game logic of Tic Tac Toe.
// Eventually, every game will end with one of the players winning or a draw.

// Tests
import { Equal, Expect } from "type-testing";

type test_move1_actual = TicTacToe<NewGame, "top-center">;
//   ^?
// prettier-ignore
type test_move1_expected = {
  board: [
    [ '  ', '❌', '  ' ],
    [ '  ', '  ', '  ' ],
    [ '  ', '  ', '  ' ]
  ];
  state: '⭕';
};
type test_move1 = Expect<Equal<test_move1_actual, test_move1_expected>>;

type test_move2_actual = TicTacToe<test_move1_actual, "top-left">;
//   ^?
// prettier-ignore
type test_move2_expected = {
  board: [
    ['⭕', '❌', '  '], 
    ['  ', '  ', '  '], 
    ['  ', '  ', '  ']];
  state: '❌';
}
type test_move2 = Expect<Equal<test_move2_actual, test_move2_expected>>;

type test_move3_actual = TicTacToe<test_move2_actual, "middle-center">;
//   ^?
// prettier-ignore
type test_move3_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '  ', '  ', '  ' ]
  ];
  state: '⭕';
};
type test_move3 = Expect<Equal<test_move3_actual, test_move3_expected>>;

type test_move4_actual = TicTacToe<test_move3_actual, "bottom-left">;
//   ^?
// prettier-ignore
type test_move4_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '⭕', '  ', '  ' ]
  ];
  state: '❌';
};
type test_move4 = Expect<Equal<test_move4_actual, test_move4_expected>>;

type test_x_win_actual = TicTacToe<test_move4_actual, "bottom-center">;
//   ^?
// prettier-ignore
type test_x_win_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '⭕', '❌', '  ' ]
  ];
  state: '❌ Won';
};
type test_x_win = Expect<Equal<test_x_win_actual, test_x_win_expected>>;

type type_move5_actual = TicTacToe<test_move4_actual, "bottom-right">;
//   ^?
// prettier-ignore
type type_move5_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '⭕', '  ', '❌' ]
  ];
  state: '⭕';
};
type test_move5 = Expect<Equal<type_move5_actual, type_move5_expected>>;

type test_o_win_actual = TicTacToe<type_move5_actual, "middle-left">;
//   ^?
// prettier-ignore
type test_o_win_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '⭕', '❌', '  ' ],
    [ '⭕', '  ', '❌' ]
  ];
  state: '⭕ Won';
};
type test_o_win = Expect<Equal<test_o_win_actual, test_o_win_expected>>;

// invalid move don't change the board and state
type test_invalid_actual = TicTacToe<test_move1_actual, "top-center">;
//   ^?
// prettier-ignore
type test_invalid_expected = {
  board: [
    [ '  ', '❌', '  ' ],
    [ '  ', '  ', '  ' ],
    [ '  ', '  ', '  ' ]
  ];
  state: '⭕';
};
type test_invalid = Expect<Equal<test_invalid_actual, test_invalid_expected>>;

// prettier-ignore
type test_before_draw = {
  board: [
    ['⭕', '❌', '⭕'], 
    ['⭕', '❌', '❌'], 
    ['❌', '⭕', '  ']];
  state: '⭕';
}
type test_draw_actual = TicTacToe<test_before_draw, "bottom-right">;
//   ^?
// prettier-ignore
type test_draw_expected = {
  board: [
    ['⭕', '❌', '⭕'], 
    ['⭕', '❌', '❌'], 
    ['❌', '⭕', '⭕']];
  state: 'Draw';
}
type test_draw = Expect<Equal<test_draw_actual, test_draw_expected>>;

// Additional Tests
type test_left_to_right_diagonal_win_actual = TicTacToe<
  //   ^?
  { board: [["  ", "❌", "  "], ["⭕", "❌", "  "], ["⭕", "  ", "❌"]]; state: "❌" },
  "top-left"
>;
type test_left_to_right_diagonal_win_expected = {
  board: [["❌", "❌", "  "], ["⭕", "❌", "  "], ["⭕", "  ", "❌"]];
  state: "❌ Won";
};
type test_left_to_right_diagonal_win = Expect<
  Equal<test_left_to_right_diagonal_win_actual, test_left_to_right_diagonal_win_expected>
>;

type test_right_to_left_diagonal_win_actual = TicTacToe<
  //   ^?
  { board: [["  ", "❌", "⭕"], ["⭕", "  ", "  "], ["⭕", "  ", "❌"]]; state: "⭕" },
  "middle-center"
>;
type test_right_to_left_diagonal_win_expected = {
  board: [["  ", "❌", "⭕"], ["⭕", "⭕", "  "], ["⭕", "  ", "❌"]];
  state: "⭕ Won";
};
type test_right_to_left_diagonal_win = Expect<
  Equal<test_right_to_left_diagonal_win_actual, test_right_to_left_diagonal_win_expected>
>;

// Answer
type TicTacToeChip = "❌" | "⭕";
type TicTacToeEndState = "❌ Won" | "⭕ Won" | "Draw";
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = "  ";
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = "top" | "middle" | "bottom";
type TicTacToeXPositions = "left" | "center" | "right";
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTacToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTacToeBoard;
  state: TicTacToeState;
};

// prettier-ignore
type EmptyBoard = [
  ["  ", "  ", "  "], 
  ["  ", "  ", "  "], 
  ["  ", "  ", "  "]
];

type NewGame = {
  board: EmptyBoard;
  state: "❌";
};

type BoardRow = { top: 0; middle: 1; bottom: 2 };
type BoardColumn = { left: 0; center: 1; right: 2 };
type BoardMove = { row: BoardRow[keyof BoardRow]; column: BoardColumn[keyof BoardColumn] };
type Win<Chip extends TicTacToeChip> = `${Chip} Won`;

type TicTacToe<
  Game extends TicTacToeGame,
  Move extends TicTacToePositions
> = Move extends `${infer Row extends TicTacToeYPositions}-${infer Column extends TicTacToeXPositions}`
  ? Game["board"][BoardRow[Row]][BoardColumn[Column]] extends TicTacToeChip
    ? Game
    : Game["state"] extends TicTacToeEndState
    ? Game
    : NextState<{ board: MarkChip<Game, { row: BoardRow[Row]; column: BoardColumn[Column] }>; state: Game["state"] }>
  : never;

type MarkChip<
  Game extends TicTacToeGame,
  Move extends BoardMove,
  RowAcc extends "+"[] = [],
  NextGame extends TicTacToeCell[][] = []
> = NextGame["length"] extends Game["board"]["length"]
  ? NextGame
  : MarkChip<
      Game,
      Move,
      [...RowAcc, "+"],
      [
        ...NextGame,
        RowAcc["length"] extends Move["row"]
          ? MarkBoardRow<Game["board"][RowAcc["length"]], Exclude<Game["state"], TicTacToeEndState>, Move["column"]>
          : Game["board"][RowAcc["length"]]
      ]
    >;

type MarkBoardRow<
  BoardRow extends TicTacToeCell[],
  Chip extends TicTacToeChip,
  ColumnToMark extends BoardMove["column"],
  ColumnAcc extends "+"[] = [],
  NextRow extends TicTacToeCell[] = []
> = NextRow["length"] extends BoardRow["length"]
  ? NextRow
  : MarkBoardRow<
      BoardRow,
      Chip,
      ColumnToMark,
      [...ColumnAcc, "+"],
      [...NextRow, ColumnToMark extends ColumnAcc["length"] ? Chip : BoardRow[ColumnAcc["length"]]]
    >;

type NextState<Game extends TicTacToeGame> = {
  board: Game["board"];
  state: State<Game["board"], Exclude<Game["state"], TicTacToeEndState>>;
};

type State<Board extends TicTacToeBoard, Chip extends TicTacToeChip> = HasFullRow<Board, Chip> extends true
  ? Win<Chip>
  : HasFullColumn<Board, Chip> extends true
  ? Win<Chip>
  : HasFullDiagonal<Board, Chip> extends true
  ? Win<Chip>
  : IsFull<Board> extends true
  ? "Draw"
  : Exclude<TicTacToeChip, Chip>;

type HasFullRow<Board extends TicTacToeBoard, Chip extends TicTacToeChip> = Board extends [
  infer First extends TicTacToeCell[],
  ...infer Rest extends TicTacToeBoard
]
  ? First[number] extends Chip
    ? true
    : HasFullRow<Rest, Chip>
  : false;

type HasFullColumn<
  Board extends TicTacToeBoard,
  Chip extends TicTacToeChip,
  ColAcc extends "+"[] = []
> = ColAcc["length"] extends Board[number]["length"]
  ? false
  : Board[number][ColAcc["length"]] extends Chip
  ? true
  : HasFullColumn<Board, Chip, [...ColAcc, "+"]>;

type HasFullDiagonal<Board extends TicTacToeBoard, Chip extends TicTacToeChip> =
  | Board[0][0]
  | Board[1][1]
  | Board[2][2] extends Chip
  ? true
  : Board[0][2] | Board[1][1] | Board[2][0] extends Chip
  ? true
  : false;

type IsFull<Board extends TicTacToeBoard> = Board[number][number] extends TicTacToeChip ? true : false;
