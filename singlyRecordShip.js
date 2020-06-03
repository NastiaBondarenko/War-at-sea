'use strict'



const SinglyRecordFieldRecord = (field, bolean) =>{
		for(let i = 0; i < 10; i++){
		for(let j = 0; j < 10; j++){
			if(bolean){
			 if(field[i][j] == 0) field[i][j] = -2;
			}else if(field[i][j] == -2) field[i][j] = 0;
		}
	}
}

const MarkCoordinate = (coordinate, field) =>{
	console.log(field);
	if(coordinate.length == 1) recordAroundCell(coordinate[0][0], coordinate[0][1], field, -2, false, Ships.length%10, 0);
	else{
		let deltaI = coordinate[1][0] - coordinate[0][0];
		let deltaJ = coordinate[1][1] - coordinate[0][1];
		let startI = coordinate[0][0] - deltaI;
		let startJ = coordinate[0][1] - deltaJ;
		let endI = coordinate[coordinate.length-1][0] + deltaI;
		let endJ = coordinate[coordinate.length-1][1] + deltaJ;
		if(startI >=0 && startJ >= 0){
		 if(field[startI][startJ] != -3) field[startI][startJ] = -2;
		}
		if(endI < 10 && endJ < 10){
			if(field[endI][endJ] != -3)field[endI][endJ] = -2;
		} 
	}
}


const frameForShip = (coordinate, field) =>{
	for(let i = 0; i < coordinate.length; i++){
		recordAroundCell(coordinate[i][0], coordinate[i][1], field, -3, true, Ships.length-10, -2);
	}
}

const checkSinglyShip = (i,j) =>{   //переписати
	let ship = [];
	if(fieldPlayer.sea[i][j] == -2){
		
	 	ship = counter(fieldPlayer.sea);
	 	if(ship[1] == 0){
		Ships.push(new Ship(ship[0], Ships.length+-9, 1));	
		Ships[Ships.length-1].coordinate.push([i, j]);	
		fieldPlayer.sea[i][j] = Ships.length-9;
		}
	 	else{

	 	 Ships[Ships.length-1].coordinate.push([i, j]);	
	 	 Ships[Ships.length-1].coordinate.sort();
	 	 fieldPlayer.sea[i][j] = Ships.length-10;
	 	}
	 
	 if(ship[1] == ship[0]-1){
	  SinglyRecordFieldRecord(fieldPlayer.sea, true);
	  frameForShip(Ships[Ships.length-1].coordinate, fieldPlayer.sea);
	 }
	 else{
	 	SinglyRecordFieldRecord(fieldPlayer.sea, false);
	 	MarkCoordinate(Ships[Ships.length-1].coordinate, fieldPlayer.sea);

	 }
	 clickShip(fieldPlayer.sea);
	}
	else clickShip(fieldPlayer.sea);
		
	
}


const coordinateForPlayerField = (x,y) =>{
	let coordinateX;
	let coordinateY;
	if(y > COORDINATETOP && y < COORDINATETOP + WIDTH*10){
		coordinateY = Math.floor((y - COORDINATETOP) / WIDTH);
	}else setTimeout(WhereClick, 10);	
	if(x > COORDINATELEFTPleyer && x < COORDINATELEFTPleyer + WIDTH*10){
		coordinateX = Math.floor((x - COORDINATELEFTPleyer ) / WIDTH);
	} else setTimeout(WhereClick, 10);	
	checkSinglyShip(coordinateY, coordinateX);
}




const counter = (field) =>{
	let count = numberPoint(field);
	if(count <= 4) return [4, count%4];
	if(count <= 10) return [3, (count-4)%3];
	if(count <= 15) return [2, (count-10)%2];
	if(count < 20) return [1, 0];
	if(count == 20) return [-1,0];
		
}


const masenge = (field) =>{
	let count = numberPoint(field);
	if(count == 0) hiddenArray(["four"]);
	if(count == 4) hiddenArray(["four", "tree"]);
	if(count == 10) hiddenArray(["two","tree" ]);
	if(count == 16) hiddenArray(["two","one" ]);
	if(count == 20) hiddenArray(["one", "anoth", "playSingly"]);
	return count;
	
}


const clickShip = (field) =>{
	let count = masenge(field);
	clearSea();
	drawShip(1);
	fieldPlayer.drawMask();
	if(count < 20 ){
		drawShip(1);
	 	setTimeout(WhereClick, 10);	
	} else{
		SinglyRecordFieldRecord(field, false);
		drawShip(1);
	}
	
}

const Singly = (num) =>{
	involvedField = true;
	if(num){
	 hiddenArray(["myCanvas", "random", "singly"]);
	 fieldPlayer = new fields(1, -2);
	 fieldComputer = new fields(0,0);

	}
	else{
	 hiddenArray([ "anoth", "play"]);
	 fieldPlayer.clean(1);
	 fieldComputer.clean(0);
	 cleanShips();
	}
	orderRandomRecordShips(fieldComputer.sea, 0);
	clickShip(fieldPlayer.sea);
}