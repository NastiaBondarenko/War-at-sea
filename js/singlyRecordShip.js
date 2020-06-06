'use strict';

const rewritingField = (field, num1, num2) => {
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

const checkWayOnDirection = (I, J, deltaI, deltaJ, length, field, num) => {
  let i = I;
  let j = J;
  let len = -1;
  do {
    len++;
    i += deltaI;
    j += deltaJ;
  } while (i < 10 && i >= 0 && j >= 0 && j < 10 && field[i][j] === num);
  return len;
};

const checkWay = (I, J, deltaI, deltaJ, length, field, num) => {
  let len = checkWayOnDirection(I, J, deltaI, deltaJ, length, field, num);
  len += checkWayOnDirection(I, J, -deltaI, -deltaJ, length, field, num);
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
    recordAroundCell(i, j, field, -3, true, num + 1, -2);
  }
};

const counter = (field, player, bolean) => {
  for (let i = 0;  i < 10; i++) {
    if (!Ships[player][i].full)
      return [Ships[player][i].length, Ships[player][i].coordinate.length, i];
  }
};

const checkSinglyShip = (i, j) => {
  const player = activePlayer;
  const ship = counter(fields[player].sea, player, true);
  const num = ship[2];
  if (fields[player].sea[i][j] === -2) {
    if (ship[1] === 0) {
      if (!checkCellForShip(i, j, ship[0], fields[player].sea)) {
        setTimeout(WhereClick, 10);
        return false;
      }
    }
    Ships[player][num].coordinate.push([i, j]);
    Ships[player][num].coordinate.sort();
    fields[player].sea[i][j] = num + 1;
    if (ship[1] === ship[0] - 1) {
      Ships[player][num].full = true;
      rewritingField(fields[player].sea, 0, -2);
      frameForShip(Ships[player][num].coordinate, fields[player].sea, num);
    } else {
      rewritingField(fields[player].sea, -2, 0);
      MarkCoordinate(Ships[player][num].coordinate, fields[player].sea,  ship[0]);
	 	}
    clickShip(fields[player].sea, player);
  } else setTimeout(WhereClick, 10);
};


const masenge = field => {
  const count = numberPoint(field);
  if (count === 0) hiddenArray(['four']);
  if (count === 4) hiddenArray(['four', 'tree']);
  if (count === 10) hiddenArray(['two', 'tree' ]);
  if (count === 16) hiddenArray(['two', 'one' ]);
  if (count === 20) {
    if (singlyOrTogetherPlay) hiddenArray(['one', 'anotherSinglyForOne',  'playSingly']);
    else if (activePlayer)hiddenArray(['one', 'anotherSinglyForTwo',  'nextForSingly', ]);
    else hiddenArray(['one', 'anotherSinglyForTwo',  'togetherForSingly']);
  }
  return count;
};

const clickShip = (field, player) => {
  const count = masenge(field);
  clearSea(player);
  drawSea(player);
  drawShips(player);
  fields[player].drawMask();
  if (count < 20) setTimeout(WhereClick, 10);
  else rewritingField(field, -2, 0);
};

const recordSinglyShipsToClass = player => {
  let number = 1;
  for (let i = 5; i > 0; i--) {
    for (let j = 5 - i; j > 0; j--) {
      Ships[player].push(new Ship(i, number, player));
      number++;
    }
  }
};

const SinglyRecordShips = (num, active) => {
  playOrRecord = 1;
  if (num) {
    fields[active] = new Fields(activePlayer, -2);
  } else {
    fields[active].clean();
    rewritingField(fields[active].sea, 0, -2);
    cleanShips(active);
  }
  drawSea(active);
  recordSinglyShipsToClass(active);
  clickShip(fields[active].sea, active);
};
