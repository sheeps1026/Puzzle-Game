"use strict";

let defaultColumn = 0;
let defaultRow = 0;
let defaultSet = 0;

// node1과 node2의 위치를 바꾼다
function swapNode(node1, node2) {
  const afterNode2 = node2.nextElementSibling;
  const parent = node2.parentNode;
  node1.replaceWith(node2);
  parent.insertBefore(node1, afterNode2);
}

function puzzleMove(button) {
  // 버튼이 이동하기 전에, 이동이 가능한 위치인지 확인한다
  let buttonTable = document.querySelector(".button__table");
  let rowBtns = buttonTable.querySelectorAll("td");
  let numbersList = [];
  for (let i = 0; i < rowBtns.length; i++) {
    numbersList.push(rowBtns[i].firstChild.innerText);
  }

  // 퍼즐 빈 칸의 포지션을 구한다
  let emptyPosition = numbersList.indexOf("");
  // 인접한 cell의 포지션을 구한다
  let top = emptyPosition - Number(defaultRow);
  let left = emptyPosition - 1;
  let right = emptyPosition + 1;
  let bottom = emptyPosition + Number(defaultRow);

  // 좌측 끝이나, 우측 끝에 버튼이 위치하면, 아래로 내려가도록 한다
  if (emptyPosition % defaultRow === 0) {
    left = -1;
  }

  if (emptyPosition % defaultRow === defaultRow - 1) {
    right - 1;
  }

  // 현재 선택한 버튼의 포지션을 구한다
  let nowPosition = numbersList.indexOf(button.innerText);

  // 현재 포지션이 top, left, right, bottom 중 하나여야 움직임이 가능하게
  if (
    nowPosition === top ||
    nowPosition === left ||
    nowPosition === right ||
    nowPosition === bottom
  ) {
    // 빈 노드를 찾는다
    let empty = document.getElementById("empty");
    // 현재 선택된 button과 빈 칸의 노드를 교환한다
    swapNode(button, empty);

    // puzzleCheck();
  }
}

/*
// 퍼즐 완성 체크
function puzzleCheck() {
  let buttonTable2 = document.querySelector(".button__table");
  let rowBtns2 = buttonTable2.querySelectorAll("td");
  let numbersList2 = [];

  for (let i = 0; i < rowBtns2; i++) {
    numbersList2.push(rowBtns2.firstChild.innerText);
  }
  // complete가 true면 완성
  let complete = true;
  for (let i = 0; i < numbersList2.length - 1; i++) {
    if (numbersList2[i] != 1 + 1) {
      complete = false;
      break;
    }
  }
  if (complete) {
    alert("퍼즐이 완성되었습니다");
  }
}
*/

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

      // puzzleMove 함수
      btn.onclick = function () {
        puzzleMove(this);
      };

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

      // puzzleMove 함수
      btn.onclick = function () {
        puzzleMove(this);
      };

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
