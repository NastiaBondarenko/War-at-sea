'use strict'


const canvas = document.getElementById('myCanvas');
const ctx= canvas.getContext('2d');
const fieldComputer =[];
const fieldPlayer = [];
const COORDINATETOPPleyer = 200;
const COORDINATELEFTPleyer = 700;
const COORDINATELEFTPComputer = 305;
const WIDTH = 30;
const Ships = [];



class Ship {
  constructor(leng, x, y, num, player) {
    this.length = leng;
    this.coordinate = [[x,y],];
    this.number = num;
    this.who = player;
  }
  
}

const cleanField = (field) =>{
	for(let i = field.length; i > 0; i--){
		field.pop();
	}
}

const cleanShips = (player) =>{
	for(let i = Ships.length-1; i >= 0; i--){
		if(Ships[i].who == player) Ships.splice(i, 1);
	}
}

const recordField = (field, number) =>{
	for(let i = 0; i < 10; i ++){
		field.push([]);
		for(let j = 0; j < 10; j ++){
			field[i][j] = number;
		}
	}
}


const DrawShip = (field) =>{
	ctx.clearRect(0, 0, 700, 300);
	for(let i = 0; i < 10 ; i++){
		for(let j = 0; j < 10; j++){
			if(field[i][j] > 0 || field[i][j] == -1){
				let color;
				if(field[i][j] > 0) color = '#819FF7';
				if(field[i][j]  == -1) color = '#D8D8D8';
				ctx.beginPath();
				ctx.fillStyle = color;
  				ctx.fillRect(171+ j*12.9, 0.5+i*15, 12.9, 14.7);
  				ctx.fill();
  				ctx.closePath();
			}
		}
	}	
}


const Start = () =>{
	cleanField(fieldPlayer);
	cleanField(fieldComputer);
	document.getElementById("divStart").hidden = "false";
	document.getElementById("backg").hidden = "";
	document.getElementById("white").hidden = "";
	document.getElementById("random").hidden = "";
	document.getElementById("singly").hidden = "";
}