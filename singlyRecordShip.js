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

const recordDirection = (coordinate, deltaI, deltaJ, field, emply, num) =>{
	if(coordinate[0][0] - deltaI >= 0 && coordinate[0][1] - deltaJ >=0){
		if(field[coordinate[0][0] - deltaI][coordinate[0][1] - deltaJ] == emply){
			field[coordinate[0][0] - deltaI][coordinate[0][1] - deltaJ] = num;	
		} 
	}
	if(coordinate[coordinate.length-1][0] + deltaI < 10 && coordinate[coordinate.length-1][1] + deltaJ < 10){
		if(field[coordinate[coordinate.length-1][0] + deltaI][coordinate[coordinate.length-1][1] + deltaJ] == emply){
			field[coordinate[coordinate.length-1][0] + deltaI][coordinate[coordinate.length-1][1] + deltaJ] = num;	
		} 
	}
}

const MarkCoordinate = (coordinate, field, length) =>{
	if(coordinate.length == 1){
		if(checkWay(coordinate[0][0], coordinate[0][1], 1,0, length, field, 0)){
			recordDirection(coordinate, 1, 0, field, 0, -2);
		}
		if(checkWay(coordinate[0][0], coordinate[0][1], 0,1, length, field, 0)){
			recordDirection(coordinate, 0, 1, field, 0, -2);
		}
	} else recordDirection(coordinate, coordinate[1][0]-coordinate[0][0], coordinate[1][1]-coordinate[0][1], field, 0, -2);
	
}

const checkWay = (I, J, deltaI, deltaJ, length, field, num) =>{
	console.log(I, J);
	let i= I;
	let j = J;
	let len = -2; 
	do{
		len++;
		i = i + deltaI;
		j = j + deltaJ;
		console.log(i,j);
	}while(i < 10 && j < 10 && field[i][j] == num);
		i = I ;
		j = J ;
	do{
		len++;
		i = i - deltaI;
		j = j - deltaJ;
	}while( i >= 0 && j >=0 && field[i][j] == num)
	if(len >= length-1){
		console.log(len);
	 return true;
	}
	else{
		console.log(len);
	 return false;	
	}
}

const checkCellForShip = (i,j, length, field) =>{
	if(checkWay(i,j,1,0,length, field, -2)) return true;
	else{
		if(checkWay(i,j,0,1,length, field, -2)) return true;
		else return false;
	}
}

const frameForShip = (coordinate, field, num) =>{
	for(let i = 0; i < coordinate.length; i++){
		recordAroundCell(coordinate[i][0], coordinate[i][1], field, -3, true, num-9, -2);
	}
}

const checkSinglyShip = (i, j) =>{
	let ship = counter(fieldPlayer.sea);
	if(fieldPlayer.sea[i][j] == -2){
		if(ship[1] == 0){ 
			if(!checkCellForShip(i,j, ship[0],fieldPlayer.sea)){
			 setTimeout(WhereClick, 10);	
			 return false;
			}
		}
		Ships[ship[2]].coordinate.push([i, j]);	
		Ships[ship[2]].coordinate.sort();
		fieldPlayer.sea[i][j] = ship[2]-9;
			 
		if(ship[1] == ship[0]-1){
		  SinglyRecordFieldRecord(fieldPlayer.sea, true);
		  frameForShip(Ships[ship[2]].coordinate, fieldPlayer.sea, ship[2]);
		}else{
		 	SinglyRecordFieldRecord(fieldPlayer.sea, false);
		 	MarkCoordinate(Ships[ship[2]].coordinate, fieldPlayer.sea,  ship[0]);
	 	}
	 clickShip(fieldPlayer.sea);
	} else setTimeout(WhereClick, 10);	
}

const counter = (field) =>{
	for(let i = 10;  i < 20; i++){
		if(Ships[i].coordinate.length < Ships[i].length) 
			return [Ships[i].length, Ships[i].coordinate.length, i];
	}	
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
	drawShips(1);
	fieldPlayer.drawMask();
	if(count < 20 ) setTimeout(WhereClick, 10);	
	else SinglyRecordFieldRecord(field, false);	
}

const recordSinglyShipsToClass = () =>{
	let number = 1;
	for(let i = 5; i > 0; i--){
		for(let j = 5-i; j > 0; j--){
			Ships.push(new Ship(i, number, 1));
			number++;
		}
	}
}

const Singly = (num) =>{
	//console.log(Ships);
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
	recordSinglyShipsToClass();
	console.log(Ships);
	clickShip(fieldPlayer.sea);
}