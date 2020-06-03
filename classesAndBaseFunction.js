'use strict'


class Ship {
  constructor(leng, num, player) {
    this.length = leng;
    this.coordinate = [];
    this.number = num;
    this.who = player;
    this.delete = [];
    this.full = false;
  }

  draw(){
  	for(let i = 0; i < this.coordinate.length; i++){
  		drawRectangle(this.coordinate[i][0], this.coordinate[i][1], this.who, 'blue');
  	}
  	for(let i = 0; i < this.delete.length; i++){
  		drawRectangle(this.delete[i][0], this.delete[i][1], this.who, 'red');
  	}
  } 
}

class fields {
	constructor(player, num){
		this.sea = [];
		for(let i = 0; i < 10; i++){
			this.sea.push([]);
			for(let j = 0; j < 10; j++){
				this.sea[i][j] = num;
			}
		}
		this.who = player;

	}
	clean(){
		for(let i = 0; i < 10; i++){
			for(let j = 0; j < 10; j++){
				this.sea[i][j] = 0;
			}
		}
	}
	drawMask(){
		console.log(this.sea);
		for(let i = 0; i < 10; i++){
			for(let j = 0; j < 10; j++){
				if(this.sea[i][j] == -1) drawPoint(i,j, this.who, 'black');
				//if(this.see[i][j] == -2) drawRectangle(i,j, this.who, '#E6E6E6');

			}
		}
		
	}
}


const hiddenArray = (array) =>{
	for(let i = 0; i < array.length; i++){
		if(document.getElementById(array[i]).hidden == true){
		 	document.getElementById(array[i]).hidden = false;
		}
		else document.getElementById(array[i]).hidden = true;
	}
}

const cleanShips = () =>{
	for(let i = Ships.length; i >= 0; i--){
		 Ships.splice(i, 1);
	}
}

const coordinate = (x,y) =>{
	let coordinateX;
	let coordinateY;
	let coordinateLeft;
	if(involvedField)  coordinateLeft = COORDINATELEFTPleyer;
	else coordinateLeft = COORDINATELEFTPComputer;
	if(y > COORDINATETOP && y < COORDINATETOP + WIDTH*10){
		coordinateY = Math.floor((y - COORDINATETOP) / WIDTH);
	}else setTimeout(WhereClick, 10);	
	if(x > coordinateLeft && x < coordinateLeft + WIDTH*10){
		coordinateX = Math.floor((x - coordinateLeft) / WIDTH);
	} else setTimeout(WhereClick, 10);	
	if(involvedField) checkSinglyShip(coordinateY, coordinateX);
	else checkBedingPlayer(coordinateY, coordinateX);
}

function CLICK (e) {
	 pageX = e.pageX;
	 pageY = e.pageY;
	 coordinate(pageX, pageY);
	 window.removeEventListener('click', CLICK, false);

}

const WhereClick = () => {
	 window.addEventListener('click', CLICK, false);
	 return 0;

}






