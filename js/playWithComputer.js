'use strict';

const nextFunction = (player, bolean, time) => {
  if (singlyOrTogetherPlay) {
    if (player == bolean) moveComputer(!bolean, time);
    else movePlayer(!bolean);
  } else if (player == bolean)  movePlayer1(!bolean);
  else movePlayer0(!bolean);
  return 0;
};

const nextMove = (i, j, field, player) => {
  if (field[i][j] !== -1) {
    if (field[i][j] > 0) {
      const num = field[i][j] - 1;
      field[i][j] = -1;
      Ships[player][num].killed.push([i, j]);
      Ships[player][num].killed.sort();
      if (Ships[player][num].coordinate.length === Ships[player][num].killed.length) {
        for (let i = 0; i < Ships[player][num].coordinate.length; i++) {
          const coordinateI = Ships[player][num].coordinate[i][0];
          const coordinateJ = Ships[player][num].coordinate[i][1];
          recordAroundCell(coordinateI, coordinateJ, field, -1, true, -1, 0);
        }
      }
      nextFunction(player, true, 1000);
    } else {
      field[i][j] = -1;
      nextFunction(player, false, 1000);
    }
  } else nextFunction(player, true, 10);
};

const counterForPlay = () => {
  for (let i = 0;  i < 10; i++) {
    if (Ships[1][i].killed.length < Ships[1][i].coordinate.length) {
      if (Ships[1][i].killed.length > 0) return i;
    }
  }
  for (let i = 0;  i < 10; i++) {
    if (Ships[1][i].killed.length < Ships[1][i].coordinate.length) {
      return i;
    }
  }

};

const checkBedingPlayer = (i, j) => {
  if (j === undefined) {
    setTimeout(WhereClick, 10);
    return false;
  }
  nextMove(i, j, fields[activePlayer].sea, activePlayer);
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
  const player = activePlayer;
  let crdn = [];
  const num = counterForPlay();
  const coordinate = Ships[player][num].killed;
  if (coordinate.length === 0) {
    crdn[0] = Math.floor(Math.random() * 10);
    crdn[1] = Math.floor(Math.random() * 10);
  } else if (coordinate.length === 1) {
    const i = coordinate[0][0];
    const j = coordinate[0][1];
    crdn = randomCellForBeing(i, j, fields[player].sea);
  } else {
    crdn = cellForBeing(coordinate, fields[player].sea);
  }
  nextMove(crdn[0], crdn[1], fields[activePlayer].sea, activePlayer);
};

const moveComputer = (bolean, time) => {
  activePlayer = 1;
  drawKilledShipsAndMask();
  if (numberPoint(fields[1].sea) === 0) {
    hiddenArray(['dontVin', 'oneMore', 'moveComputer']);
  } else {
    if (bolean) {
      hiddenArray(['movePlayer', 'moveComputer' ]);
    }
    setTimeout(belingComputer, time);
  }
};

const movePlayer = bolean => {
  activePlayer = 0;
  drawKilledShipsAndMask();
  if (numberPoint(fields[0].sea) === 0){
   hiddenArray(['vin', 'oneMore', 'movePlayer']);}
  else {
    if (bolean) hiddenArray(['moveComputer', 'movePlayer']);
    setTimeout(WhereClick, 10);
  }
};

const rewritingFields = () => {
  rewritingField(fields[1].sea, -2, 0);
  rewritingField(fields[0].sea, -2, 0);
  rewritingField(fields[1].sea, -3, 0);
  rewritingField(fields[0].sea, -3, 0);
};

const playWithComputer = num => {
  activePlayer = 1;
  drawSea(0);
  rewritingFields();
  playOrRecord = 0;
  if (num) hiddenArray(['anotherSinglyForOne', 'playSingly', ]);
  else hiddenArray(['anotherRandomForOne', 'playRandom', ]);
  if (Math.random() > 1 / 2) {
    movePlayer(false);
    hiddenArray(['movePlayer']);
  } else {
    moveComputer(false, 1000);
    hiddenArray(['moveComputer']);
  }
};
