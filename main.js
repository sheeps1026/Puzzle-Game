"use strict";

// 퍼즐 생성
function createPuzzle() {
  // body의 table 태그를 가져와서 안의 값을 리셋
  let buttonTable = document.querySelector(".button__table");
  buttonTable.innerHTML = "";

  // 행과 열에 해당 tag에 해당하는 value의 값들을 가져온다
  let column = document.querySelector(".column").value || 0;
  let row = document.querySelector(".row").value || 0;

  for (let columnIndex = 0; columnIndex < column; columnIndex++) {
    // column의 개수만큼 테이블의 열(tr)을 생성
    let columnBtn = document.createElement("tr");

    for (let rowIndex = 0; rowIndex < row; rowIndex++) {
      // row의 개수만큼 테이블의 행(td)을 생성
      // 행(tr)의 태그(tr)에 넣는다
      let rowBtn = document.createElement("td");
      let btn = document.createElement("button");
      btn.className = "puzzle";
      /* // move 함수 만들어야 함
      btn.onclick = function () {
        move(this);
      };
      */
      if (columnIndex != column - 1 || rowIndex != row - 1) {
        //  마지막 칸이 아닌 경우에는 테이블에 버튼을
        rowBtn.appendChild(btn);
      } else {
        // 마지막 칸은 빈 칸으로 있어야 하기에 button 대신에 span 태그를 넣는다.
        // 빈 칸을 의미힌다
        let span = document.createElement("span");
        span.id = "empty";
        rowBtn.appendChild(span);
      }
      columnBtn.appendChild(rowBtn);
    }
    buttonTable.appendChild(columnBtn);
  }

  // 퍼즐을 랜덤하게 만드는 셔플 함수 만들기
  // shufflePuzzle();
}

// move
// 선택한 칸이 있으면 어느 방향이든, 빈 칸이 있는데 거기로 움직여야함
