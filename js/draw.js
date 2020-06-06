'use strict';

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const drawRectangle = (i, j, player, color) => {
  ctx.beginPath();
  ctx.fillStyle = 'black';
  ctx.fillRect(player * 170.5 + j * 12.9, 0 + i * 15, 13.1, 14.9);
  ctx.fillStyle = color;
  ctx.fillRect(0.5 + player * 171 + j * 12.9, 0.5 + i * 15, 11.5, 13.5);
  ctx.fill();
  ctx.closePath();
};

const drawPoint = (i, j, player, color) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(player * 171 + 7 + j * 13, 8 + i * 15, 1, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.closePath();
};

const drawSea = player => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      drawRectangle(i, j, player, 'white');
    }
  }
};

const clearSea = () => {
  ctx.clearRect(0, 0, 700, 300);
};

const drawShips = player => {
  for (let i = 0; i < 10; i++) {
    Ships[player][i].drawShip();
  }
};

const drawKilledShipsAndMask = () => {
  fields[0].drawMask();
  fields[1].drawMask();
  for (let i = 0; i < 10; i++) {
    Ships[0][i].drawKilled();
    Ships[1][i].drawKilled();
  }

};

