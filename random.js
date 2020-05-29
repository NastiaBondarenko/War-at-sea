'use strict'

const recordCell = (coordinateX, coordinateY, field, number, boolean) =>{
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
			if(boolean == false) {
				if(i != j && i != -j){
					if(field[coordinateX + i][coordinateY + j] != 1)
				 	field[coordinateX + i][coordinateY + j] = number;
				}	
			}else{
				if(field[coordinateX + i][coordinateY + j] != 1)
				 	field[coordinateX + i][coordinateY + j] = number;
			}
			
		}
	}
	field[coordinateX][coordinateY] = 1;
}

const checkShip =  (coordinateX, coordinateY, direction, length, field) =>{
	for(let i = 0 ; i < length; i++){
		let deltaX = 0;
		let deltaY = 0;
		if(direction == true) deltaX = i;
		else deltaY = i;
		if(coordinateX + deltaX > 9  || coordinateY+deltaY > 9) return false;
		if(field[coordinateX+deltaX][coordinateY+deltaY] != 0) return false;
	}
	for(let i = 0 ; i < length; i++){
		let deltaX = 0;
		let deltaY = 0;
		if(direction == true) deltaX = i;
		else deltaY = i;
		recordCell(coordinateX+deltaX, coordinateY+deltaY, field, 2, true);
	}	
	return true;
}

const randomRecordShip = (length, field) =>{
	let coordinateX = Math.floor(Math.random()*10);
	let coordinateY = Math.floor(Math.random()*10);
	let direction;
	if(Math.floor(Math.random()*10) % 2  == 1) direction = true;
	else direction = false; 
	if(checkShip(coordinateX, coordinateY, direction, length, field) == false) randomRecordShip(length, field);	
    return true;
}

const randomRecordField = (field) =>{
	field = recordField(field,0);
	for(let i = 0; i < 5; i++){
		for(let j = 4; j > i; j --){
			randomRecordShip(j-i, field);
		}
	}	
}

const Random  = () =>{
	ctx.clearRect(0, 0, 700, 300);
	cleanField(fieldPlayer);
	cleanField(fieldComputer);
	document.getElementById("random").hidden = "false";
	document.getElementById("singly").hidden = "false";
	document.getElementById("myCanvas").hidden = "";
	randomRecordField(fieldPlayer);
	randomRecordField(fieldComputer);
	DrawShip(fieldPlayer);
	document.getElementById("another").hidden = "";
	document.getElementById("play").hidden = "";
}