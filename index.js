'use strict'

let pageX;
let pageY;

const coordinateShip = (field, ship, x, y)=>{
	let length = ship[1];
	if(length == 0 ) length = ship[0];
	let coordinate =[];
	for(let i = -1; i <2; i++){
		for(let j = -1; j <2; j++){
			if(i != j && i!= -j){
				if(field[x+i][y+j] == 1){
					for(let k = 1; k < length; k++){
						console.log(ship[0],k,[x+k*i, y+k*j])
						coordinate.push([x+k*i, y+k*j]);
					}
					field[x-i][y-j] = -1;
					field[x+ship[1]*i][y+ship[1]*j] = -1;
				}
			}
		}
	}
	coordinate.push([x,y]);
	console.log(coordinate);
	return coordinate;
}

const SinglyRecordField = (field, ship, x, y) =>{

	for(let i = 0; i < 10; i++){
		for(let j = 0; j < 10; j++){
			if(ship[1] == 0){
			 if(field[i][j] == 0) field[i][j] = -1;
			}else if(field[i][j] == -1) field[i][j] = 0;
		}
	}
	if(ship[1] == 0){
		let coordinate =[];
	 	coordinate = coordinateShip(field, ship, x, y);
		for(let k = 0; k < coordinate.length; k++){
	 		recordCell(coordinate[k][0], coordinate[k][1], field, 2, true);
	 	}
	}
	if(ship[1] == 1){ 
		recordCell(x, y, field, -1, false);		
		}
	if(ship[1] == 2 || ship[1] == 3) {
	 coordinateShip(field, ship, x, y);
	 
	}
}



const checkSinglyShip = (coordinateX, coordinateY) =>{
	let ship = [];
	if(fieldPlayer[coordinateX][coordinateY] == -1){
	 fieldPlayer[coordinateX][coordinateY] = 1;
	 ship = counter(fieldPlayer);
	 console.log(ship);
	 SinglyRecordField(fieldPlayer, ship, coordinateX, coordinateY);
	clickShip(fieldPlayer, true);
	}
	else clickShip(fieldPlayer, true);
		
	
}


const coordinate = (x,y) =>{
	let coordinateX;
	let coordinateY;
	if(y > COORDINATETOPPleyer && y < COORDINATETOPPleyer + WIDTH*10){
		coordinateY = Math.floor((y - COORDINATETOPPleyer) / WIDTH);
		if(x > COORDINATELEFTPleyer && x < COORDINATELEFTPleyer + WIDTH*10){
			coordinateX = Math.floor((x - COORDINATELEFTPleyer ) / WIDTH);
			checkSinglyShip(coordinateX, coordinateY);
		}else setTimeout(WhereClick, 10);
	} else setTimeout(WhereClick, 10);	
}

function CLICK (e) {
	 pageX = e.pageX;
	 pageY = e.pageY;
	 coordinate(pageX, pageY);
	 window.removeEventListener('click', CLICK, false);

}

const WhereClick = () => {
	 window.addEventListener('click', CLICK, false);

}

const counter = (field) =>{
	let count = 0;
	for(let i = 0; i < 10; i++){
		for(let j = 0; j < 10; j++){
			if(field[i][j] == 1) count ++;
		}
	}
	if(count <= 4){
	 	document.getElementById("four").hidden = "";
		 return [4, count%4];
	}
	if(count <= 10){
		document.getElementById("four").hidden = "false";
		document.getElementById("tree").hidden = "";
	 	return [3, (count-4)%3];
	}
	if(count <= 16){
		document.getElementById("two").hidden = "";
		document.getElementById("tree").hidden = "false";
	 	return [2, (count-10)%2];
	}
	if(count < 20){
		document.getElementById("two").hidden = "false";
		document.getElementById("one").hidden = "";
	 	return [1, 0];
	}

	if(count == 20){
		document.getElementById("one").hidden = "false";
		document.getElementById("anoth").hidden = "";
		document.getElementById("play").hidden = "";
		return false;
	}	
}

const clickShip = (field, bolean) =>{
	DrawShip(field);
	counter(field);
	if(bolean == true){
	setTimeout(WhereClick, 10);	
	}
}


const Singly = () =>{
	cleanField(fieldPlayer);
	cleanField(fieldComputer);
	document.getElementById("random").hidden = "false";
	document.getElementById("singly").hidden = "false";
	document.getElementById("myCanvas").hidden = "";
	document.getElementById("anoth").hidden = "false";
	document.getElementById("play").hidden = "false";
	recordField(fieldPlayer, -1);
	clickShip(fieldPlayer, true);
}





