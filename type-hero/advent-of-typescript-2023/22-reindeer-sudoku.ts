// Reindeer Sudoku
// Santa's reindeer sure do like to cause trouble!
// This time they've decided to make a game out of arranging themselves into a Sudoku board.

// Before arranging themselves in this configuration, the reindeer left Santa a foreboding message:

// SaNtA.... yOu MuSt ImPleMeNt ThE Validate TyPe To DeTerMinE WhEThEr OuR SuDokU ConFiGuRaTiOn Is vALid

// Oh.. and what's that... also Vixen seems to have left a separate note

// make sure Validate is a predicate

// - Vixen

// Well that's sorta condescending.
// Vixen seems to be assuming we already know that a "predicate" is just a fancy computer science term for a function that returns true or false.
// Oh well.
// That's Vixen for you.

// What is Sudoku

// If you're not already familiar: Sudoku is a logic-based number placement puzzle.
// Here are the basic rules:
// - Grid Structure: The game is played on a 9x9 grid, divided into nine 3x3 subgrids or "regions."
// - Number Placement: The objective is to fill the grid with numbers from 1 to 9.
// - Row Constraint: Every row must contain each number from 1 to 9 without repeating.
// - Column Constraint: Every column must also contain each number from 1 to 9 without repeating.
// - Region Constraint: Each of the nine 3x3 regions must contain each number from 1 to 9, again without repetition.

// Normally you solve the puzzle by logically deducing the numbers for the empty cells, ensuring that all rows, columns, and 3x3 regions have numbers from 1 to 9 according to the rules.
// However, in this case the cells are all already filled in and your mission is to instead determine whether the configuration follows the rules of Sudoku.

// Tests
import { Equal, Expect } from "type-testing";

type test_sudoku_1_actual = Validate<
  //   ^?
  [
    [["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"]],
    [["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"]],
    [["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"]],
    [["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"], ["🔴", "🌩️", "🌟"]],
    [["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"]],
    [["⚡", "☄️", "❤️"], ["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"]],
    [["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"], ["🌩️", "🔴", "⚡"]],
    [["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"]],
    [["❤️", "🌟", "☄️"], ["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"]]
  ]
>;
type test_sudoku_1 = Expect<Equal<test_sudoku_1_actual, true>>;

type test_sudoku_2_actual = Validate<
  //   ^?
  [
    [["🌩️", "💨", "☄️"], ["🌟", "🦌", "⚡"], ["❤️", "🔴", "💃"]],
    [["🌟", "⚡", "❤️"], ["🔴", "💃", "☄️"], ["🌩️", "💨", "🦌"]],
    [["🔴", "🦌", "💃"], ["💨", "❤️", "🌩️"], ["🌟", "⚡", "☄️"]],
    [["❤️", "☄️", "🌩️"], ["💃", "⚡", "🔴"], ["💨", "🦌", "🌟"]],
    [["🦌", "💃", "⚡"], ["🌩️", "🌟", "💨"], ["🔴", "☄️", "❤️"]],
    [["💨", "🌟", "🔴"], ["🦌", "☄️", "❤️"], ["⚡", "💃", "🌩️"]],
    [["☄️", "🔴", "💨"], ["❤️", "🌩️", "🦌"], ["💃", "🌟", "⚡"]],
    [["💃", "❤️", "🦌"], ["⚡", "🔴", "🌟"], ["☄️", "🌩️", "💨"]],
    [["⚡", "🌩️", "🌟"], ["☄️", "💨", "💃"], ["🦌", "❤️", "🔴"]]
  ]
>;
type test_sudoku_2 = Expect<Equal<test_sudoku_2_actual, true>>;

type test_sudoku_3_actual = Validate<
  //   ^?
  [
    [["🦌", "🔴", "💃"], ["🌩️", "☄️", "💨"], ["⚡", "❤️", "🌟"]],
    [["🌟", "⚡", "💨"], ["❤️", "💃", "🔴"], ["☄️", "🌩️", "🦌"]],
    [["☄️", "🌩️", "❤️"], ["⚡", "🌟", "🦌"], ["💃", "🔴", "💨"]],
    [["🌩️", "💃", "🔴"], ["🦌", "💨", "⚡"], ["🌟", "☄️", "❤️"]],
    [["❤️", "☄️", "⚡"], ["💃", "🌩️", "🌟"], ["🦌", "💨", "🔴"]],
    [["💨", "🌟", "🦌"], ["☄️", "🔴", "❤️"], ["🌩️", "💃", "⚡"]],
    [["💃", "💨", "🌟"], ["🔴", "🦌", "☄️"], ["❤️", "⚡", "🌩️"]],
    [["🔴", "❤️", "☄️"], ["🌟", "⚡", "🌩️"], ["💨", "🦌", "💃"]],
    [["⚡", "🦌", "🌩️"], ["💨", "❤️", "💃"], ["🔴", "🌟", "☄️"]]
  ]
>;
type test_sudoku_3 = Expect<Equal<test_sudoku_3_actual, true>>;

type test_sudoku_4_actual = Validate<
  //   ^?
  [
    [["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"]],
    [["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"]],
    [["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"]],
    [["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"], ["🔴", "🌩️", "🌟"]],
    [["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"]],
    [["⚡", "☄️", "❤️"], ["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"]],
    [["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"], ["⚡", "🔴", "🌟"]],
    [["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"]],
    [["❤️", "🌟", "☄️"], ["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"]]
  ]
>;
type test_sudoku_4 = Expect<Equal<test_sudoku_4_actual, false>>;

type test_sudoku_5_actual = Validate<
  //   ^?
  [
    [["🌩️", "💨", "☄️"], ["🌟", "🦌", "⚡"], ["❤️", "🔴", "💃"]],
    [["🌟", "⚡", "❤️"], ["🔴", "💃", "☄️"], ["🌩️", "💨", "🦌"]],
    [["🔴", "🦌", "💃"], ["💨", "❤️", "🌩️"], ["🌟", "⚡", "☄️"]],
    [["❤️", "☄️", "🌩️"], ["💃", "⚡", "🔴"], ["💨", "🦌", "🌟"]],
    [["🦌", "💃", "⚡"], ["🌩️", "🌟", "💨"], ["🔴", "☄️", "❤️"]],
    [["💨", "🌟", "🔴"], ["🦌", "☄️", "❤️"], ["⚡", "💃", "🌩️"]],
    [["☄️", "🔴", "💨"], ["❤️", "💃", "🦌"], ["💃", "🌟", "⚡"]],
    [["💃", "❤️", "🦌"], ["⚡", "🔴", "🌟"], ["☄️", "🌩️", "💨"]],
    [["⚡", "🌩️", "🌟"], ["☄️", "💨", "💃"], ["🦌", "❤️", "🔴"]]
  ]
>;
type test_sudoku_5 = Expect<Equal<test_sudoku_5_actual, false>>;

type test_sudoku_6_actual = Validate<
  //   ^?
  [
    [["⚡", "🔴", "🌩️"], ["🦌", "❤️", "💨"], ["💨", "🌟", "☄️"]],
    [["❤️", "🦌", "🌟"], ["💨", "🌟", "🔴"], ["💃", "⚡", "🌩️"]],
    [["💨", "💃", "🌟"], ["☄️", "⚡", "🌩️"], ["🔴", "❤️", "🦌"]],
    [["🦌", "⚡", "🔴"], ["❤️", "💃", "💨"], ["☄️", "🌩️", "🌟"]],
    [["🌟", "🌩️", "💃"], ["⚡", "🔴", "☄️"], ["❤️", "🦌", "💨"]],
    [["☄️", "💨", "❤️"], ["🌟", "🌩️", "🦌"], ["⚡", "💃", "🔴"]],
    [["🌩️", "☄️", "💨"], ["💃", "🦌", "⚡"], ["🌟", "🔴", "❤️"]],
    [["🔴", "❤️", "⚡"], ["🌩️", "☄️", "🌟"], ["🦌", "💨", "💃"]],
    [["💃", "🌟", "🦌"], ["🔴", "💨", "❤️"], ["🌩️", "☄️", "⚡"]]
  ]
>;
type test_sudoku_6 = Expect<Equal<test_sudoku_6_actual, false>>;

// Additional Tests
type TestValid = Expect<
  Equal<
    Validate<
      [
        [["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"]],
        [["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"]],
        [["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"]],
        [["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"], ["🔴", "🌩️", "🌟"]],
        [["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"]],
        [["⚡", "☄️", "❤️"], ["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"]],
        [["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"], ["🌩️", "🔴", "⚡"]],
        [["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"]],
        [["❤️", "🌟", "☄️"], ["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"]]
      ]
    >,
    true
  >
>;

type TestInvalidRow = Expect<
  Equal<
    Validate<
      [
        [["💨", "💃", "🔴"], ["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"]], // Swapped Prancer on Row0Col2 with Rudolph on Row1Col2
        [["🌟", "⚡", "🦌"], ["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"]],
        [["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"]],
        [["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"], ["🔴", "🌩️", "🌟"]],
        [["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"]],
        [["⚡", "☄️", "❤️"], ["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"]],
        [["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"], ["🌩️", "🔴", "⚡"]],
        [["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"]],
        [["❤️", "🌟", "☄️"], ["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"]]
      ]
    >,
    false
  >
>;

type TestInvalidColumn = Expect<
  Equal<
    Validate<
      [
        [["💨", "💃", "🔴"], ["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🦌"]], // Swapped Prancer on Row0Col2 with Rudolph on Row0Col8
        [["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"], ["☄️", "❤️", "🌩️"]],
        [["☄️", "❤️", "🌩️"], ["🌟", "⚡", "🔴"], ["💨", "💃", "🦌"]],
        [["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"], ["🔴", "🌩️", "🌟"]],
        [["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"], ["⚡", "☄️", "❤️"]],
        [["⚡", "☄️", "❤️"], ["🌩️", "🔴", "🌟"], ["🦌", "💨", "💃"]],
        [["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"], ["🌩️", "🔴", "⚡"]],
        [["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"], ["❤️", "🌟", "☄️"]],
        [["❤️", "🌟", "☄️"], ["🔴", "🌩️", "⚡"], ["💃", "🦌", "💨"]]
      ]
    >,
    false
  >
>;

type TestInvalidRegion = Expect<
  Equal<
    Validate<
      [
        [["💨", "💃", "🦌"], ["🌟", "☄️", "❤️"], ["🌩️", "⚡", "🔴"]],
        [["🔴", "💨", "💃"], ["🦌", "🌟", "☄️"], ["❤️", "🌩️", "⚡"]],
        [["⚡", "🔴", "💨"], ["💃", "🦌", "🌟"], ["☄️", "❤️", "🌩️"]],
        [["🌩️", "⚡", "🔴"], ["💨", "💃", "🦌"], ["🌟", "☄️", "❤️"]],
        [["❤️", "🌩️", "⚡"], ["🔴", "💨", "💃"], ["🦌", "🌟", "☄️"]],
        [["☄️", "❤️", "🌩️"], ["⚡", "🔴", "💨"], ["💃", "🦌", "🌟"]],
        [["🌟", "☄️", "❤️"], ["🌩️", "⚡", "🔴"], ["💨", "💃", "🦌"]],
        [["🦌", "🌟", "☄️"], ["❤️", "🌩️", "⚡"], ["🔴", "💨", "💃"]],
        [["💃", "🦌", "🌟"], ["☄️", "❤️", "🌩️"], ["⚡", "🔴", "💨"]]
      ]
    >,
    false
  >
>;

// Setup
/** because "dashing" implies speed */
type Dasher = "💨";

/** representing dancing or grace */
type Dancer = "💃";

/** a deer, prancing */
type Prancer = "🦌";

/** a star for the dazzling, slightly mischievous Vixen */
type Vixen = "🌟";

/** for the celestial body that shares its name */
type Comet = "☄️";

/** symbolizing love, as Cupid is the god of love */
type Cupid = "❤️";

/** representing thunder, as "Donner" means thunder in German */
type Donner = "🌩️";

/** meaning lightning in German, hence the lightning bolt */
type Blitzen = "⚡";

/** for his famous red nose */
type Rudolph = "🔴";

type Reindeer = Dasher | Dancer | Prancer | Vixen | Comet | Cupid | Donner | Blitzen | Rudolph;

// Answer
type Sudoku = Reindeer[][][];
type Rows<S extends Sudoku> = S[number];

type Validate<S extends Sudoku> = ValidateRows<Rows<S>> | ValidateColumns<Rows<S>> | ValidateRegions<S> extends true
  ? true
  : false;

type ValidateRows<Rows extends Sudoku[number]> = Rows extends unknown
  ? Reindeer extends Rows[number][number]
    ? true
    : false
  : never;

type ValidateColumns<
  Rows extends Sudoku[number],
  RegionAcc extends "+"[] = [],
  ColumnAcc extends "+"[] = [],
  Valid extends boolean = true
> = RegionAcc["length"] extends Rows["length"]
  ? Valid
  : ColumnAcc["length"] extends Rows[number]["length"]
  ? ValidateColumns<Rows, [...RegionAcc, "+"], [], Valid>
  : ValidateColumns<
      Rows,
      RegionAcc,
      [...ColumnAcc, "+"],
      Valid | (Reindeer extends Rows[RegionAcc["length"]][ColumnAcc["length"]] ? true : false)
    >;

type ValidateRegions<S extends Sudoku, Valid extends boolean = true> = S extends [
  infer First extends Sudoku[number],
  infer Second extends Sudoku[number],
  infer Third extends Sudoku[number],
  ...infer Rest extends Sudoku
]
  ? ValidateRegions<Rest, Valid | ValidateRegionByRow<[First, Second, Third]>>
  : Valid;

type ValidateRegionByRow<Rows extends [Sudoku[number], Sudoku[number], Sudoku[number]]> =
  Reindeer extends Rows[number][0][number] & Rows[number][1][number] & Rows[number][2][number] ? true : false;
