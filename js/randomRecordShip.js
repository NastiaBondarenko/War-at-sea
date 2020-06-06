'use strict';


const recordRandomShip = (i, j, direction, length, field, number, player) => {
  Ships[player].push(new Ship(length,  number, player));
  recordAroundCell(i, j, field, -2, true, number, 0);
  let deltaI = 0;
  let deltaJ = 0;
  for (let k = 0; k < length; k++) {
    if (direction) deltaI = k;
    else deltaJ = k;
    Ships[player][(number - 1) ].coordinate.push([i + deltaI, j + deltaJ]);
    recordAroundCell(i + deltaI, j + deltaJ, field, -2, true, number, 0);
  }
  Ships[player][(number - 1)].full = true;
  return true;
};

const checkRandomShip = (i, j, direction, length, field, number, player) => {
  let deltaI = 0;
  let deltaJ = 0;
  for (let k = 0; k < length; k++) {
    if (direction) deltaI = k;
    else deltaJ = k;
    if (i + deltaI > 9  || j + deltaJ > 9) return false;
    if (field[i + deltaI][j + deltaJ] !== 0) return false;
  }
  recordRandomShip(i, j, direction, length, field, number, player);
  return true;
};

const randomEachShip = (length, field, number, player) => {
  let direction;
  const i = Math.floor(Math.random() * 10);
  const j = Math.floor(Math.random() * 10);
  if (Math.floor(Math.random() * 10) % 2) direction = true;
  else direction = false;
  if (checkRandomShip(i, j, direction, length, field, number, player)) {
    return true;
  } else randomEachShip(length, field, number, player);
  return false;
};

const orderRandomRecordShips = (field, player) => {
  let number = 1;
  for (let i = 5; i > 0; i--) {
    for (let j = 5 - i; j > 0; j--) {
      randomEachShip(i, field, number, player);
      number++;
    }
  }
};

const RandomRecordShips  = (num, active) => {
  if (num) {
    fields[active] = new Fields(active, 0);
  } else {
    fields[active].clean();
    cleanShips(active);
  }
  orderRandomRecordShips(fields[active].sea, active);
  clearSea();
  drawSea(activePlayer);
  drawShips(activePlayer);
};
