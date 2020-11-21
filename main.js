"use strict";

let defaultColumn = 0;
let defaultRow = 0;
let defaultSet = 0;

// 배열 array의 내부 값들을 Math.random 함수를 이용하여 랜덤하게 섞는다
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

// 퍼즐 섞기
function puzzleShuffle() {
  // 퍼즐에 사용할 모든 버튼들을 쿼리한다
  let buttons = document.querySelectorAll(".puzzle");
  let numbers = [];

  for (let i = 0; i < buttons.length; i++) {
    // buttons의 길이 값 만큼의 숫자를 numbers 배열에 삽입
    numbers.push(i + 1);
  }

  // shuffle 함수로 numbers의 값을 랜덤하게 재배열
  shuffle(numbers);

  if (defaultSet.length === 0) {
    // 처음에 섞인 값을 slice 함수로 복사하여 defaultSet에 넣는다
    // 나중에 퍼즐 리셋에 사용한다
    defaultSet = numbers.slice();
  }

  for (let i = 0; i < buttons.length; i++) {
    // 각각의 button에 number의 숫자 값들을 넣는다
    buttons[i].innerText = numbers[i];
  }
}

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
      if (columnIndex !== column - 1 || rowIndex !== row - 1) {
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

  // defaultSet은 처음에 생성했던 배열을 저장하기 때문에 초기화를 해준다.
  defaultSet = [];
  defaultColumn = column;
  defaultRow = row;

  // 퍼즐을 랜덤하게 만드는 셔플 함수 만들기
  puzzleShuffle();
}

// move
// 선택한 칸이 있으면 어느 방향이든, 빈 칸이 있는데 거기로 움직여야함

// 퍼즐 리셋
// 퍼즐을 섞지 않고, defaultSet의 값으로 다시 퍼즐(테이블)을 생성한다
function puzzleReset() {
  let buttonTable = document.querySelector(".button__table");
  buttonTable.innerHTML = "";

  for (let columnIndex = 0; columnIndex < defaultColumn; columnIndex++) {
    let columnBtn = document.createElement("tr");

    for (let rowIndex = 0; rowIndex < defaultRow; rowIndex++) {
      let rowBtn = document.createElement("td");
      let btn = document.createElement("button");
      btn.className = "puzzle";
      /* 마찬가지로 move 함수 만들어야 함
      btn.onclick = function () {
        move(this);
      }
      */
      if (columnIndex != defaultColumn - 1 || rowIndex != defaultRow - 1) {
        rowBtn.appendChild(btn);
      } else {
        let span = document.createElement("span");
        span.id = "empty";
        rowBtn.appendChild(span);
      }
      columnBtn.appendChild(rowBtn);
    }
    buttonTable.appendChild(columnBtn);
  }

  let buttons = document.querySelectorAll(".puzzle");
  for (let i = 0; i < defaultSet.length; i++) {
    buttons[i].innerText = defaultSet[i];
  }
}
