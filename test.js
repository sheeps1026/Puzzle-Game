"use strict";

let defaultColumn = 0;
let defaultRow = 0;
let defaultSet = 0;

function swapNode(node1, node2) {
  const afterNode2 = node2.nextElementSibling;
  const parent = node2.parentNode;
  node1.replaceWith(node2);
  parent.insertBefore(node1, afterNode2);
}

function puzzleMove(button) {
  let buttonTable = document.querySelector(".button__table");
  let rowBtns = buttonTable.querySelectorAll("td");
  let numbersList = [];
  for (let i = 0; i < rowBtns.length; i++) {
    numbersList.push(rowBtns[i].firstChild.innerText);
  }

  let emptyPosition = numbersList.indexOf("");
  let top = emptyPosition - Number(defaultRow);
  let left = emptyPosition - 1;
  let right = emptyPosition + 1;
  let bottom = emptyPosition + Number(defaultRow);

  if (emptyPosition % defaultRow === 0) {
    left = -1;
  }

  if (emptyPosition % defaultRow === defaultRow - 1) {
    right - 1;
  }

  let nowPosition = numbersList.indexOf(button.innerText);

  if (
    nowPosition === top ||
    nowPosition === left ||
    nowPosition === right ||
    nowPosition === bottom
  ) {
    let empty = document.getElementById("empty");
    swapNode(button, empty);
    puzzleCheck();
  }
}

function puzzleCheck() {
  let buttonTable2 = document.querySelector(".button__table");
  let rowBtns2 = buttonTable2.querySelectorAll("td");
  let numbersList2 = [];

  for (let i = 0; i < rowBtns2.length; i++) {
    numbersList2.push(rowBtns2[i].firstChild.innerText);
  }

  let complete = true;
  for (let i = 0; i < numbersList2.length - 1; i++) {
    if (numbersList2[i] != i + 1) {
      complete = false;
      break;
    }
  }
  if (complete) {
    alert("퍼즐이 완성되었습니다");
  }
}

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function puzzleShuffle() {
  let buttons = document.querySelectorAll(".puzzle");
  let numbers = [];

  for (let i = 0; i < buttons.length; i++) {
    numbers.push(i + 1);
  }

  shuffle(numbers);

  if (defaultSet.length === 0) {
    defaultSet = numbers.slice();
  }

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].innerText = numbers[i];
  }
}

function createPuzzle() {
  let buttonTable = document.querySelector(".button__table");
  buttonTable.innerHTML = "";

  let row = document.querySelector(".row").value;
  let column = document.querySelector(".column").value;

  for (let columnIndex = 0; columnIndex < column; columnIndex++) {
    let columnBtn = document.createElement("tr");

    for (let rowIndex = 0; rowIndex < row; rowIndex++) {
      let rowBtn = document.createElement("td");
      let btn = document.createElement("button");
      btn.className = "puzzle";

      btn.onclick = function () {
        puzzleMove(this);
      };

      if (columnIndex !== column - 1 || rowIndex !== row - 1) {
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

  defaultSet = [];
  defaultColumn = column;
  defaultRow = row;

  puzzleShuffle();
}

function puzzleReset() {
  let buttonTable = document.querySelector(".button__table");
  buttonTable.innerHTML = "";

  for (let columnIndex = 0; columnIndex < defaultColumn; columnIndex++) {
    let columnBtn = document.createElement("tr");

    for (let rowIndex = 0; rowIndex < defaultRow; rowIndex++) {
      let rowBtn = document.createElement("td");
      let btn = document.createElement("button");
      btn.className = "puzzle";

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
