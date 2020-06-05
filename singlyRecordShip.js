'use strict';

const SinglyRecordFieldRecord = (field, num1, num2) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (field[i][j] === num1) field[i][j] = num2;
    }
  }
};

const recordDirection = (coordinate, deltaI, deltaJ, field, emply, num) => {
  const first = coordinate[0];
  const end = coordinate[coordinate.length - 1];
  if (first[0] - deltaI >= 0 && first[1] - deltaJ >= 0) {
    if (field[first[0] - deltaI][first[1] - deltaJ] === emply) {
      field[first[0] - deltaI][first[1] - deltaJ] = num;
    }
  }
  if (end[0] + deltaI < 10 && end[1] + deltaJ < 10) {
    if (field[end[0] + deltaI][end[1] + deltaJ] === emply) {
      field[end[0] + deltaI][end[1] + deltaJ] = num;
    }
  }
};

const MarkCoordinate = (coordinate, field, length) => {
  if (coordinate.length === 1) {
    if (checkWay(coordinate[0][0], coordinate[0][1], 1, 0, length, field, 0)) {
      recordDirection(coordinate, 1, 0, field, 0, -2);
    }
    if (checkWay(coordinate[0][0], coordinate[0][1], 0, 1, length, field, 0)) {
      recordDirection(coordinate, 0, 1, field, 0, -2);
    }
  } else {
    const deltaI = coordinate[1][0] - coordinate[0][0];
    const deltaJ = coordinate[1][1] - coordinate[0][1];
    recordDirection(coordinate, deltaI, deltaJ, field, 0, -2);
  }
};

const checkWay = (I, J, deltaI, deltaJ, length, field, num) => {
  let i = I;
  let j = J;
  let len = -2;
  do {
    len++;
    i += deltaI;
    j += deltaJ;
  } while (i < 10 && j < 10 && field[i][j] === num);
  i = I;
  j = J;
  do {
    len++;
    i -= deltaI;
    j -= deltaJ;
  } while (i >= 0 && j >= 0 && field[i][j] === num);
  if (len >= length - 1) {
    return true;
  } else {
    return false;
  }
};

const checkCellForShip = (i, j, length, field) => {
  if (checkWay(i, j, 1, 0, length, field, -2)) return true;
  else if (checkWay(i, j, 0, 1, length, field, -2)) return true;
  else return false;
};

const frameForShip = (coordinate, field, num) => {
  for (let k = 0; k < coordinate.length; k++) {
    const i = coordinate[k][0];
    const j = coordinate[k][1];
    recordAroundCell(i, j, field, -3, true, num - 9, -2);
  }
};

const checkSinglyShip = (i, j) => {
  const ship = counter(fieldPlayer.sea, true);
  const num = ship[2];
  if (fieldPlayer.sea[i][j] === -2) {
    if (ship[1] === 0) {
      if (!checkCellForShip(i, j, ship[0], fieldPlayer.sea)) {
        setTimeout(WhereClick, 10);
        return false;
      }
    }
    Ships[num].coordinate.push([i, j]);
    Ships[num].coordinate.sort();
    fieldPlayer.sea[i][j] = num - 9;
    if (ship[1] === ship[0] - 1) {
      SinglyRecordFieldRecord(fieldPlayer.sea, 0, -2);
      frameForShip(Ships[num].coordinate, fieldPlayer.sea, num);
    } else {
      SinglyRecordFieldRecord(fieldPlayer.sea, -2, 0);
      MarkCoordinate(Ships[num].coordinate, fieldPlayer.sea,  ship[0]);
	 	}
    clickShip(fieldPlayer.sea);
  } else setTimeout(WhereClick, 10);
};

const counter = (field, bolean) => {
  if (bolean) {
    for (let i = 0;  i < 20; i++) {
      if (Ships[i].coordinate.length < Ships[i].length)
        return [Ships[i].length, Ships[i].coordinate.length, i];
    }
  }
};

const masenge = field => {
  const count = numberPoint(field);
  if (count === 0) hiddenArray(['four']);
  if (count === 4) hiddenArray(['four', 'tree']);
  if (count === 10) hiddenArray(['two', 'tree' ]);
  if (count === 16) hiddenArray(['two', 'one' ]);
  if (count === 20) hiddenArray(['one', 'anoth', 'playSingly']);
  return count;
};

const clickShip = field => {
  const count = masenge(field);
  clearSea();
  drawShips(1);
  fieldPlayer.drawMask();
  if (count < 20) setTimeout(WhereClick, 10);
  else SinglyRecordFieldRecord(field, -2, 0);
};

const recordSinglyShipsToClass = () => {
  let number = 1;
  for (let i = 5; i > 0; i--) {
    for (let j = 5 - i; j > 0; j--) {
      Ships.push(new Ship(i, number, 1));
      number++;
    }
  }
};

const Singly = num => {
  involvedField = true;
  if (num) {
    hiddenArray(['myCanvas', 'random', 'singly']);
    fieldPlayer = new Fields(1, -2);
    fieldComputer = new Fields(0, 0);
  } else {
    hiddenArray([ 'anoth', 'play']);
    fieldPlayer.clean(1);
    fieldComputer.clean(0);
    cleanShips();
  }
  orderRandomRecordShips(fieldComputer.sea, 0);
  recordSinglyShipsToClass();
  clickShip(fieldPlayer.sea);
};
