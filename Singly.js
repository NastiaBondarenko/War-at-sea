'use strict'

let pageX;
let pageY;

const SinglyRecordFieldRecord = (field, bolean) =>{
		for(let i = 0; i < 10; i++){
		for(let j = 0; j < 10; j++){
			if(bolean){
			 if(field[i][j] == 0) field[i][j] = -1;
			}else if(field[i][j] == -1) field[i][j] = 0;
		}
	}
}

const MarkCoordinate = (coordinate, field) =>{
	if(coordinate.length == 1) recordCell(coordinate[0][0], coordinate[0][1], field, -1, false, Ships.length%10);
	else{
		let deltaI = coordinate[1][0] - coordinate[0][0];
		let deltaJ = coordinate[1][1] - coordinate[0][1];
		let startI = coordinate[0][0] - deltaI;
		let startJ = coordinate[0][1] - deltaJ;
		let endI = coordinate[coordinate.length-1][0] + deltaI;
		let endJ = coordinate[coordinate.length-1][1] + deltaJ;
		if(startI >=0 && startJ >= 0){
		 if(field[startI][startJ] != -2) field[startI][startJ] = -1;
		}
		if(endI < 10 && endJ < 10){
			if(field[endI][endJ] != -2)field[endI][endJ] = -1;
		} 
	}
}


const frameForShip = (coordinate, field) =>{
	for(let i = 0; i < coordinate.length; i++){
		recordCell(coordinate[i][0], coordinate[i][1], field, -2, true, Ships.length-10);
	}
}

const checkSinglyShip = (i,j) =>{   
	let ship = [];
	if(fieldPlayer[i][j] == -1){
	 	ship = counter(fieldPlayer);
	 	if(ship[1] == 0){
		Ships.push(new Ship(ship[0], i, j, Ships.length+-9, 1));	
		fieldPlayer[i][j] = Ships.length-9;
		}
	 	else{
	 	 Ships[Ships.length-1].coordinate.push([i, j]);	
	 	 Ships[Ships.length-1].coordinate.sort();
	 	 fieldPlayer[i][j] = Ships.length-10;
	 	}
	 
	 if(ship[1] == ship[0]-1){
	  SinglyRecordFieldRecord(fieldPlayer, true);
	  frameForShip(Ships[Ships.length-1].coordinate, fieldPlayer);
	 }
	 else{
	 	SinglyRecordFieldRecord(fieldPlayer, false);
	 	MarkCoordinate(Ships[Ships.length-1].coordinate, fieldPlayer);

	 }
	 clickShip(fieldPlayer);
	}
	else clickShip(fieldPlayer);
		
	
}


const coordinate1 = (x,y) =>{
	let coordinateX;
	let coordinateY;
	if(y > COORDINATETOP && y < COORDINATETOP + WIDTH*10){
		coordinateY = Math.floor((y - COORDINATETOP) / WIDTH);
	}else setTimeout(WhereClick1, 10);	
	if(x > COORDINATELEFTPleyer && x < COORDINATELEFTPleyer + WIDTH*10){
		coordinateX = Math.floor((x - COORDINATELEFTPleyer ) / WIDTH);
	} else setTimeout(WhereClick1, 10);	
	checkSinglyShip(coordinateY, coordinateX);
}

function CLICK1 (e) {
	 pageX = e.pageX;
	 pageY = e.pageY;
	 coordinate1(pageX, pageY);
	 window.removeEventListener('click', CLICK1, false);

}

const WhereClick1 = () => {
	 window.addEventListener('click', CLICK1, false);

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
	DrawShip(field);
	if(count < 20 ){
		DrawShip(field);
	 setTimeout(WhereClick1, 10);	
	} else{
		SinglyRecordFieldRecord(field, false);
		DrawShip(field);
	}
	
}

const Singly = (num) =>{
	cleanAll();
	if(num) hiddenArray(["myCanvas", "random", "singly"]);
	else hiddenArray([ "anoth", "play"]);
	recordField(fieldPlayer, -1);
	randomRecordField(fieldComputer, 0);
	clickShip(fieldPlayer);
}