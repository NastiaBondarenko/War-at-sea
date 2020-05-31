'use strict'

const recordCell = (coordinateX, coordinateY, field, num, boolean, number) =>{
	//console.log(number);
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
					if(field[coordinateX + i][coordinateY + j] <= 0 )
				 	field[coordinateX + i][coordinateY + j] = num;
				}	
			}else{
				if(field[coordinateX + i][coordinateY + j] <= 0 )
				 	field[coordinateX + i][coordinateY + j] = num;
			}
		}
	}
	field[coordinateX][coordinateY] = number;
}


const checkShip =  (coordinateX, coordinateY, direction, length, field, number, player) =>{
	for(let i = 0 ; i < length; i++){
		let deltaX = 0;
		let deltaY = 0;
		if(direction == true) deltaX = i;
		else deltaY = i;
		if(coordinateX + deltaX > 9  || coordinateY+deltaY > 9) return false;
		if(field[coordinateX+deltaX][coordinateY+deltaY] != 0) return false;
	}
	Ships.push(new Ship(length, coordinateX, coordinateY, number, player));
	recordCell(coordinateX, coordinateY, field, -2, true, number);
	field[coordinateX][coordinateY] = number;
	for(let i = 1 ; i < length; i++){
		let deltaX = 0;
		let deltaY = 0;
		if(direction == true) deltaX = i;
		else deltaY = i;
		Ships[(number-1)+10*player].coordinate.push([coordinateX+deltaX, coordinateY+deltaY]);
		recordCell(coordinateX+deltaX, coordinateY+deltaY, field, -2, true, number);
	}	
	return true;
}

const randomRecordShip = (length, field, number, player) =>{
	let coordinateX = Math.floor(Math.random()*10);
	let coordinateY = Math.floor(Math.random()*10);
	let direction;

	if(Math.floor(Math.random()*10) % 2  == 1) direction = true;
	else direction = false; 
	//console.log(coordinateX, coordinateY, direction, length, number, player)
	if(checkShip(coordinateX, coordinateY, direction, length, field, number, player) == false){

		//console.log(coordinateX,coordinateY, number);
		//console.log(fieldPlayer);
	 randomRecordShip(length, field, number, player);}	
    return true;
}

const randomRecordField = (field, player) =>{
	let number = 1;
	recordField(field,0);
	for(let i = 5; i > 0; i--){
		for(let j = 5-i; j > 0; j--){
			randomRecordShip(i, field, number, player);
			//console.log(i,  number, player);
			number++;
		}
	}
}

const Random  = () =>{
	ctx.clearRect(0, 0, 700, 300);
	cleanField(fieldPlayer);
	cleanField(fieldComputer);
	cleanShips(1);
	cleanShips(0);
	document.getElementById("random").hidden = "false";
	document.getElementById("singly").hidden = "false";
	document.getElementById("myCanvas").hidden = "";
	document.getElementById("another").hidden = "";
	document.getElementById("play").hidden = "";
	randomRecordField(fieldPlayer, 0);
	randomRecordField(fieldComputer, 1);
	DrawShip(fieldPlayer);
	console.log(fieldPlayer);
	console.log(fieldComputer);
	console.log(Ships);
	
	//console.log(fieldComputer);
}