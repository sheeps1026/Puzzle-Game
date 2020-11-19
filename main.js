"use strict";

// 퍼즐 생성
function createPuzzle() {
  const button = document.querySelector(".buttons");
  const row = document.querySelector(".rows").value;
  const column = document.querySelector(".columns").value;
  // console.log(`row: ${row}, column: ${column} `);

  for (let rowIndex = 0; rowIndex < row; rowIndex++) {
    const rowButton = document.createElement("tr");

    for (let colIndex = 0; colIndex < column; colIndex++) {
      const columnButton = document.createElement("td");
      const buttonNumber = document.createTextNode(`${rowIndex}, ${colIndex}`);

      columnButton.appendChild(buttonNumber);
      rowButton.appendChild(columnButton);
    }
    button.appendChild(rowButton);
  }
}

document.querySelector(".createBtn").addEventListener("click", createPuzzle);
