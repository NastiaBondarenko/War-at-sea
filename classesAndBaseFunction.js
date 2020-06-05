'use strict';

class Ship {
  constructor(leng, num, player) {
    this.length = leng;
    this.coordinate = [];
    this.number = num;
    this.who = player;
    this.killed = [];
    this.full = false;
  }

  drawShip() {
    for (let i = 0; i < this.coordinate.length; i++) {
      const cord = this.coordinate[i];
      drawRectangle(cord[0], cord[1], this.who, 'blue');
    }
  }
  drawKilled() {
    for (let i = 0; i < this.killed.length; i++) {
      const kill = this.killed[i];
      drawRectangle(kill[0], kill[1], this.who, 'red');
    }
  }

}

class Fields {
  constructor(player, num) {
    this.sea = [];
    for (let i = 0; i < 10; i++) {
      this.sea.push([]);
      for (let j = 0; j < 10; j++) {
        this.sea[i][j] = num;
      }
    }
    this.who = player;

  }
  clean() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        this.sea[i][j] = 0;
      }
    }
  }
  drawMask() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.sea[i][j] === -1) drawPoint(i, j, this.who, 'black');

      }
    }

  }
}


const hiddenArray = array => {
  for (let i = 0; i < array.length; i++) {
    if (document.getElementById(array[i]).hidden === true) {
      document.getElementById(array[i]).hidden = false;
    } else document.getElementById(array[i]).hidden = true;
  }
};

const cleanShips = () => {
  for (let i = Ships.length; i >= 0; i--) {
    Ships.splice(i, 1);
  }
};

const coordinate = (x, y) => {
  let coordinateX;
  let coordinateY;
  let coordinateLeft;

  if (involvedField)  coordinateLeft = COORDINATELEFTPleyer;
  else coordinateLeft = COORDINATELEFTPComputer;
  if (y > COORDINATETOP && y < COORDINATETOP + WIDTH * 10) {
    coordinateY = Math.floor((y - COORDINATETOP) / WIDTH);
    if (x > coordinateLeft && x < coordinateLeft + WIDTH * 10) {
      coordinateX = Math.floor((x - coordinateLeft) / WIDTH);
    } else setTimeout(WhereClick, 10);
    if (involvedField) {
      checkSinglyShip(coordinateY, coordinateX);
      return true;
    } else {
      checkBedingPlayer(coordinateY, coordinateX);
      return true;
    }
  } else {
    setTimeout(WhereClick, 10);
    return false;
  }
};

function CLICK(e) {
  const pageX = e.pageX;
  const pageY = e.pageY;
  coordinate(pageX, pageY);
  window.removeEventListener('click', CLICK, false);
}

const WhereClick = () => {
  window.addEventListener('click', CLICK, false);
  return 0;
};

const recordAroundCell = (i, j, field, num, boolean, number, cell) => {
  const coordinate = [i, j];
  const start = [-1, -1];
  const end = [1, 1];
  for (let k = 0; k < 2; k++) {
    if (coordinate[k] === 0) start[k]++;
    if (coordinate[k] === 9) end[k]--;
  }
  for (let k = start[0]; k <= end[0]; k++) {
    for (let f = start[1]; f <= end[1]; f++) {
      if (boolean) {
        if (field[i + k][j + f] === cell) field[i + k][j + f] = num;
      } else if (k !== f && k !== -f) {
        if (field[i + k][j + f] === cell) field[i + k][j + f] = num;
      }
    }
  }
  field[i][j] = number;
};




