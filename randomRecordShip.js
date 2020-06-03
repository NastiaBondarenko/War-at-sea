'use strict'



const numberPoint = (field) => {
	let count = 0;
	for(let i = 0; i < 10; i++){
		for(let j = 0; j < 10; j++){
			if(field[i][j] > 0) count ++;
		}
	}
	return count;
}

const recordCell = (coordinateX, coordinateY, field, num, boolean, number) =>{ //переписати
	let startX = -1;
	let startY = -1;
	let endX = 1;
	let endY = 1;
	if(coordinateX == 0 ) startX ++;
	if(coordinateY == 0 ) startY ++;
	if(coordinateY == 9) endY --;
	if(coordinateX == 9) endX --;
	for(let i = startX; i <= endX; i++){
		for(let j = startY; j <= endY; j++){
			if(boolean){
				if(field[coordinateX + i][coordinateY + j] <= 0 && field[coordinateX + i][coordinateY + j] >= -2 ){
				 field[coordinateX + i][coordinateY + j] = num;	}
			} else {
				if(i != j && i != -j){
					if(field[coordinateX + i][coordinateY + j] <= 0 && field[coordinateX + i][coordinateY + j] >=-2 ){
					 field[coordinateX + i][coordinateY + j] = num;	}
				} 
			}
		}
	}
	field[coordinateX][coordinateY] = number;
}


const checkShip =  (coordinateX, coordinateY, direction, length, field, number, player) =>{
	let deltaX = 0;
	let deltaY = 0;
	for(let i = 0 ; i < length; i++){
		if(direction) deltaX = i;
		else deltaY = i;
		if(coordinateX + deltaX > 9  || coordinateY+deltaY > 9) return false;
		if(field[coordinateX+deltaX][coordinateY+deltaY] != 0) return false;
	}
	Ships.push(new Ship(length,  number, player));
	Ships[(number-1)+10*player].coordinate.push([coordinateX, coordinateY]);
	recordCell(coordinateX, coordinateY, field, -2, true, number);
	for(let i = 1 ; i < length; i++){
		deltaX = 0;
		deltaY = 0;
		if(direction == true) deltaX = i;
		else deltaY = i;
		Ships[(number-1)+10*player].coordinate.push([coordinateX+deltaX, coordinateY+deltaY]);
		recordCell(coordinateX+deltaX, coordinateY+deltaY, field, -2, true, number);
	}	
	Ships[(number-1)+10*player].full = true;
	return true;
}

const randomRecordShip = (length, field, number, player) =>{
	let direction;
	let coordinateX = Math.floor(Math.random()*10);
	let coordinateY = Math.floor(Math.random()*10);
	if(Math.floor(Math.random()*10) % 2) direction = true;
	else direction = false; 
	if(checkShip(coordinateX, coordinateY, direction, length, field, number, player)) return true;
	else randomRecordShip(length, field, number, player);
   	
}

const randomRecordField = (field, player) =>{
	let number = 1;
	for(let i = 5; i > 0; i--){
		for(let j = 5-i; j > 0; j--){
			randomRecordShip(i, field, number, player);
			number++;
		}
	}
}

const RandomRecordShip  = (num) =>{
	if(num){ hiddenArray(["random", "singly", "myCanvas", "another", "playRandom"]);
	fieldPlayer = new fields(1,0);
	fieldComputer = new fields(0,0);
	}
	else{
		fieldPlayer.clean();
		fieldComputer.clean();
		cleanShips();
	}
	randomRecordField(fieldComputer.sea, 0);
	randomRecordField(fieldPlayer.sea, 1);
	clearSea();
	drawShip(1);
}