import React, { useEffect } from "react";
import "./GameBoard.css";

export default function GameBoard() {
  const rows = 9;
  const cols = 9;
  const board = new Array(rows);
  for (let i = 0; i < rows; ++i) {
    board[i] = new Array(cols);
  }

  return (
    <div className="board">
      <table>
        {[1, 2, 3].map((col_grp, col_grp_idx) => (
          <colgroup key={col_grp_idx}>
            <col></col>
            <col></col>
            <col></col>
          </colgroup>
        ))}
        {[1, 2, 3].map((row_grp, row_grp_idx) => (
          <tbody key={row_grp_idx}>
            {[1, 2, 3].map((row, row_idx) => (
              <tr key={row_idx}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((col, col_idx) => (
                  <td
                    key={col_idx}
                    className="cell"
                    contentEditable="true"
                  ></td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
      <div className="btns">
        <div className="solve-btn">Solve</div>
        <div className="clear-btn">Clear Board</div>
      </div>
    </div>
  );
}
