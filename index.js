'use strict'

let pageX;
let pageY;
const fieldComputer =[];
const fieldPlayer = [];

const recordField = (field) =>{
	for(let i = 0; i < 10; i ++){
		field.push([]);
		for(let j = 0; j < 10; j ++){
			field[i][j] = 0;
		}
	}
	return field;
}

const recordCell = (coordinateX, coordinateY, field) =>{
	let k = [];
	for(let i = -1; i <= 1; i++){
		for(let j = -1; j <= 1; j++){
			if(field[coordinateX + i][coordinateY + j] != 1){
				if(field[coordinateX + i][coordinateY + j] != undefined) field[coordinateX + i][coordinateY + j] = 2;
				console.log(field);
			}
		}
	}
	field[coordinateX][coordinateY] = 1;

	return field;
}

const checkShip =  (coordinateX, coordinateY, direction, length, field) =>{

}

const recordShip = (length, field) =>{
	//console.log(field);
	let coordinateX = Math.floor(Math.random()*10);
	let coordinateY = Math.floor(Math.random()*10);
	let direction;
	if(Math.floor(Math.random()*10) % 2  == 1) direction = true;
	else direction = false; 
	//console.log(coordinateX, coordinateY, direction, length, field);
}





const randomRecordField = (field) =>{

	field = recordField(field);
	console.log(field);
	//let length = 5;
	for(let i = 0; i < 5; i++){
		for(let j = 4; j > i; j --){
			console.log(field);
		field =	recordShip(j-i, field);
		}
	}	
}






const Start = () =>{
	
	document.getElementById("divStart").hidden = "false";
	document.getElementById("backg").hidden = "";
	document.getElementById("white").hidden = "";
	document.getElementById("random").hidden = "";
	document.getElementById("singly").hidden = "";
}

const Random  = () =>{
	document.getElementById("random").hidden = "false";
	document.getElementById("singly").hidden = "false";
	randomRecordField(fieldPlayer);
	randomRecordField(fieldComputer);
}

const Singly = () =>{
	document.getElementById("random").hidden = "false";
	document.getElementById("singly").hidden = "false";
}



window.addEventListener('click', function(e) {
	 pageX = e.pageX;
	 pageY = e.pageY;
	 //alert(pageX);

}, false);

