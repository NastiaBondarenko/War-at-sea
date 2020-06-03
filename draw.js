'use strict'

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const drawRectangle = (i, j, player, color) => {
				ctx.beginPath();
				ctx.fillStyle = 'black';
  				ctx.fillRect(player*170.5+ j*12.9, 0+i*15, 13.1, 14.9);
				ctx.fillStyle = color;
  				ctx.fillRect(player*171+ j*12.9, 0.5+i*15, 12.9, 14.7);
  				ctx.fill();
  				ctx.closePath();
}

const drawPoint = (i,j, player, color) =>{

				 ctx.beginPath();
				   ctx.fillStyle = color;
  				   ctx.arc(player*171 +7+ j*13, 8+i*15, 1, 0, Math.PI * 2, false);

				  ctx.fill();
				  ctx.closePath();
}

const clearSea = () => {
	ctx.clearRect(0, 0, 700, 300);
}

const drawShip = (player) =>{
	for(let i = player*10; i < Ships.length - 10 + player*10; i++){
	 Ships[i].draw();
	}
	
}

const drawShips = ()=>{
	drawShip(1);
	drawShip(0);
}
