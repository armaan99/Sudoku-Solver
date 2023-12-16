import React, { useState } from "react";
import "./Board.css";
import { solver } from "./SudokuSolver";
import { isInitialValid } from "./InitialCheck";
import ninja_left from "./ninja_left.png";
import ninja_right from "./ninja_right.png";

// Initial Game Board (-1 = Empty)
const initial = [
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  [-1, -1, -1, -1, -1, -1, -1, -1, -1],
];

export default function Board() {
  // Current state of Game Board (initially set to Empty)
  const [gameBoard, setGameBoard] = useState(getDeepCopy(initial));

  // Function to create a Deep Copy of Game Board
  function getDeepCopy(board) {
    return JSON.parse(JSON.stringify(board));
  }

  // To take input in every cell
  function onInputChange(e, row, col) {
    var val = parseInt(e.target.value) % 10 || -1;
    var board = getDeepCopy(gameBoard);
    if (val === -1 || (val >= 1 && val <= 9)) board[row][col] = val;

    const inputCell = document.getElementById(`cell-${row}-${col}`);
    if (board[row][col] !== -1) inputCell.style.backgroundColor = "#3b9cdc";
    else inputCell.style.backgroundColor = "#dae1ee";

    setGameBoard(board);
  }

  // Sudoku Solver Helper Function
  function solveSudoku() {
    var board = getDeepCopy(gameBoard);

    // Checking if initial game board is in valid state or not
    if (!isInitialValid(board)) {
      alert("This Initial State is Invalid. Please check your Inputs.");
      return;
    }

    // Turning the cells Grey which are already filled
    for (let i = 0; i < 9; ++i)
      for (let j = 0; j < 9; ++j) {
        const inputCell = document.getElementById(`cell-${i}-${j}`);
        if (board[i][j] !== -1) inputCell.style.backgroundColor = "#3b9cdc";
      }

    // Solving the Sudoku
    solver(board);
    setGameBoard(board);
  }

  // To Clear Game Board
  function clearSudoku() {
    setGameBoard(getDeepCopy(initial));

    // Turning all the cells White
    for (let i = 0; i < 9; ++i)
      for (let j = 0; j < 9; ++j)
        document.getElementById(`cell-${i}-${j}`).style.backgroundColor =
          "#dae1ee";
  }

  return (
    <div className="board">
      <div className="img-left">
        <img src={ninja_left} alt="" />
      </div>
      <div className="center-game-board">
        <div className="board-box">
          <table>
            <tbody>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={row === 2 || row === 5 ? "boxGap-row-wise" : ""}
                >
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, colIdx) => (
                    <td
                      key={rowIdx + colIdx}
                      className={
                        col === 2 || col === 5 ? "boxGap-col-wise" : ""
                      }
                    >
                      <input
                        className="cell"
                        id={"cell-" + rowIdx + "-" + colIdx}
                        value={
                          gameBoard[row][col] === -1 ? "" : gameBoard[row][col]
                        }
                        onChange={(e) => onInputChange(e, row, col)}
                        disabled={initial[row][col] !== -1}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="btns">
          <div className="solve-btn" onClick={solveSudoku}>
            Solve
          </div>
          <div className="clear-btn" onClick={clearSudoku}>
            Clear
          </div>
        </div>
      </div>
      <div className="img-right">
        <img src={ninja_right} alt="" />
      </div>
    </div>
  );
}
