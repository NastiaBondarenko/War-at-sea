'use strict'
const drawRectangle = (i, j, player, color) => {
				ctx.beginPath();
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

const drawShip = (player) =>{
	for(let i = 0; i < Ships.length; i++){
		if(Ships[i].who == player) Ships[i].draw();
	}
	
}
