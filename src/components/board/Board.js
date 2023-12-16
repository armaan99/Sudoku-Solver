import React, { useState, useRef, useEffect } from "react";
import "./Board.css";

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
    var val = parseInt(e.target.value) || -1;
    var board = getDeepCopy(gameBoard);
    if (val === -1 || (val >= 1 && val <= 9)) board[row][col] = val;
    setGameBoard(board);
  }

  // To check if same number exists in given row
  function checkRow(board, row, num) {
    return board[row].indexOf(num) === -1;
  }

  // To check if same number exists in given column
  function checkCol(board, col, num) {
    return board.map((row) => row[col]).indexOf(num) === -1;
  }

  // To check if same number exists in given box
  function checkBox(board, row, col, num) {
    let box = [];
    let rowStart = row - (row % 3);
    let colStart = col - (col % 3);
    for (let i = 0; i < 3; ++i)
      for (let j = 0; j < 3; ++j) box.push(board[rowStart + i][colStart + j]);
    return box.indexOf(num) === -1;
  }

  // To check if it is a valid cell position for given number
  function checkValid(board, row, col, num) {
    return (
      checkRow(board, row, num) &&
      checkCol(board, col, num) &&
      checkBox(board, row, col, num)
    );
  }

  // To Check if initial Board if a valid state or not
  function isInitialValid(board) {
    for (let i = 0; i < 9; i++)
      for (let j = 0; j < 9; j++)
        if (board[i][j] !== -1 && !checkValid(board, i, j, board[i][j]))
          return false;
    return true;
  }

  // Function returning next cell while backtracking
  function getNext(row, col) {
    return col !== 8 ? [row, col + 1] : row !== 8 ? [row + 1, 0] : [0, 0];
  }

  // Sudoku Solver which actually solves the game by backtracking
  function solver(board, row = 0, col = 0) {
    if (board[row][col] !== -1) {
      let isLast = row >= 8 && col >= 8;
      if (!isLast) {
        let [newRow, newCol] = getNext(row, col);
        return solver(board, newRow, newCol);
      }
    }

    for (let num = 1; num <= 9; ++num)
      if (checkValid(board, row, col, num)) {
        board[row][col] = num;
        let [newRow, newCol] = getNext(row, col);

        if (!newRow && !newCol) return true;
        if (solver(board, newRow, newCol)) return true;
      }

    board[row][col] = -1;
    return false;
  }

  // Sudoku Solver Helper Function
  function solveSudoku() {
    var board = getDeepCopy(gameBoard);

    // Checking if initial game board is in valid state or not
    // if (!isInitialValid(board)) {
    //   alert("The initial state is invalid. Please check your input.");
    //   return;
    // }

    // Turning the cells Grey which are already filled
    for (let i = 0; i < 9; ++i)
      for (let j = 0; j < 9; ++j) {
        const inputCell = document.getElementById(`cell-${i}-${j}`);
        if (board[i][j] !== -1)
          //   inputCell.style.backgroundColor = "rgba(200,200,200,0.9)";
          inputCell.style.backgroundColor = "#3b9cdc";
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
      <div className="board-box">
        <table>
          <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rowIdx) => (
              <tr
                key={rowIdx}
                // className={(row + 1) % 3 === 0 ? "boxBorder-row-wise" : ""}
                className={row === 2 || row === 5 ? "boxGap-row-wise" : ""}
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, colIdx) => (
                  <td
                    key={rowIdx + colIdx}
                    // className={(col + 1) % 3 === 0 ? "boxBorder-col-wise" : ""}
                    className={col === 2 || col === 5 ? "boxGap-col-wise" : ""}
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
  );
}
