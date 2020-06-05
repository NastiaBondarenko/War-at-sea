'use strict';

const nextMove = (i, j, field, bolean) => {
  if (field[i][j] !== -1) {
    if (field[i][j] > 0) {
      let num = field[i][j] - 1;
      if (!bolean) num += 10;
      field[i][j] = -1;
      Ships[num].killed.push([i, j]);
      Ships[num].killed.sort();
      if (Ships[num].coordinate.length === Ships[num].killed.length) {
        for (let i = 0; i < Ships[num].coordinate.length; i++) {
          const coordinateI = Ships[num].coordinate[i][0];
          const coordinateJ = Ships[num].coordinate[i][1];
          recordAroundCell(coordinateI, coordinateJ, field, -1, true, -1, 0);
        }
      }
      if (bolean) movePlayer(false);
      else moveComputer(false, 1000);
    } else {
      field[i][j] = -1;
      if (bolean)moveComputer(true, 1000);
      else movePlayer(true);
    }
  } else if (bolean) movePlayer(false);
  else moveComputer(false, 10);
};

const counterForPlay = () => {
  for (let i = 10;  i < 20; i++) {
    if (Ships[i].killed.length < Ships[i].coordinate.length) {
      if (Ships[i].killed.length > 0) return i;
    }
  }
  for (let i = 10;  i < 20; i++) {
    if (Ships[i].killed.length < Ships[i].coordinate.length) {
      return i;
    }
  }

};

const checkBedingPlayer = (i, j) => {
  nextMove(i, j, fieldComputer.sea, true);
};

const randomCellForBeing = (i, j, field) => {
  const random  = Math.random() * 20;
  if (random < 5) {
    if (i + 1 < 10 && field[i + 1][j] !== -1) return [i + 1, j];
  }
  if (random < 10) {
    if (i - 1 >= 0 && field[i - 1][j] !== -1) return [i - 1, j];
  }
  if (random < 15) {
    if (j - 1 >= 0 && field[i][j - 1] !== -1) return [i, j - 1];
  }
  if (j + 1 < 10 && field[i][j + 1] !== -1) return [i, j + 1];
  if (j - 1 >= 0 && field[i][j - 1] !== -1) return [i, j - 1];
  if (i - 1 >= 0 && field[i - 1][j] !== -1) return [i - 1, j];
  if (i + 1 < 10 && field[i + 1][j] !== -1) return [i + 1, j];

};

const cellForBeing = (coordinate, field) => {
  const deltaI = coordinate[1][0] - coordinate[0][0];
  const deltaJ = coordinate[1][1] - coordinate[0][1];
  const random = Math.random() * 10;
  const first = coordinate[0];
  const end = coordinate[coordinate.length - 1];
  if (random < 5) {
    if (first[0] - deltaI >= 0 && first[1] - deltaJ) {
      if (field[first[0] - deltaI][first[1] - deltaJ] !== -1) {
        return [first[0] - deltaI, first[1] - deltaJ];
      } else return [end[0] + deltaI, end[1] + deltaJ];
    } else return [end[0] + deltaI, end[1] + deltaJ];
  } else if (end[0] + deltaI < 10 && end[1] + deltaJ < 10) {
    if (field[end[0] + deltaI][end[1] + deltaJ] !== -1) {
      return [end[0] + deltaI, end[1] + deltaJ];
    } return [first[0] - deltaI, first[1] - deltaJ];
  } else return [first[0] - deltaI, first[1] - deltaJ];
};

const belingComputer = () => {
  let crdn = [];
  const num = counterForPlay();
  const coordinate = Ships[num].killed;
  if (coordinate.length === 0) {
    crdn[0] = Math.floor(Math.random() * 10);
    crdn[1] = Math.floor(Math.random() * 10);
  } else if (coordinate.length === 1) {
    const i = coordinate[0][0];
    const j = coordinate[0][1];
    crdn = randomCellForBeing(i, j, fieldPlayer.sea);
  } else {
    crdn = cellForBeing(coordinate, fieldPlayer.sea);
  }
  nextMove(crdn[0], crdn[1], fieldPlayer.sea, false);
};

const moveComputer = (bolean, time) => {
  drawKilledShipsAndMask();
  if (numberPoint(fieldPlayer.sea) === 0) {
    hiddenArray(['dontVin', 'moveComputer']);
  } else {
    if (bolean) {
      hiddenArray(['movePlayer', 'moveComputer' ]);
    }
    setTimeout(belingComputer, time);
  }
};

const movePlayer = bolean => {
  drawKilledShipsAndMask();
  if (numberPoint(fieldComputer.sea) === 0) hiddenArray(['vin', 'movePlayer']);
  else {
    if (bolean) hiddenArray(['moveComputer', 'movePlayer']);
    setTimeout(WhereClick, 10);
  }
};

const Play = num => {
  drawSea(0);
  SinglyRecordFieldRecord(fieldPlayer.sea, -2, 0);
  SinglyRecordFieldRecord(fieldComputer.sea, -2, 0);
  SinglyRecordFieldRecord(fieldPlayer.sea, -3, 0);
  involvedField = false;
  if (num) hiddenArray(['anoth', 'playSingly',]);
  else hiddenArray(['another', 'playRandom', ]);
  if (Math.random() > 1 / 2) {
    movePlayer(false);
    hiddenArray(['movePlayer']);
  } else {
    moveComputer(false, 1000);
    hiddenArray(['moveComputer']);
  }
};
