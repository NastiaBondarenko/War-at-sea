'use strict'


let fieldBedingComputer;
let fieldBedingPlayer;
let fieldComputer;
let fieldPlayer ;
const COORDINATETOP = 200;
const COORDINATELEFTPleyer = 700;
const COORDINATELEFTPComputer = 305;
const WIDTH = 30;
const Ships = [];



const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const drawRectangle = (i, j, player, color) => {
				ctx.beginPath();
				ctx.fillStyle = color;
  				ctx.fillRect(player*171+ j*12.9, 0.5+i*15, 12.9, 14.7);
  				ctx.fill();
  				ctx.closePath();
}

const drawPoint = (i,j, player, color) =>{
				 ctx.beginPath();
				   ctx.fillStyle = color;
  				   ctx.arc(player*171 +7+ j*13, 8+i*15, 1, 0, Math.PI * 2, false);
				  ctx.fill();
				  ctx.closePath();
}

const clearSee = () => {
	ctx.clearRect(0, 0, 700, 300);
}

const drawShips = (player) =>{
	for(let i = player*10; i < 10+player*10; i++){
	 Ships[i].draw();
	}
	
}






class Ship {
  constructor(leng, num, player) {
    this.length = leng;
    this.coordinate = [];
    this.number = num;
    this.who = player;
    this.delete = [];
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
	constructor(){
		this.see = [];
		for(let i = 0; i < 10; i++){
			this.see.push([]);
			for(let j = 0; j < 10; j++){
				this.see[i][j] = 0;
			}
		}

	}
	clean(){
		for(let i = 0; i < 10; i++){
			for(let j = 0; j < 10; j++){
				this.see[i][j] = 0;
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


/*const cleanField = (field) =>{
	for(let i = field.length; i > 0; i--){
		field.pop();
	}
}*/

const cleanShips = () =>{
	for(let i = Ships.length; i >= 0; i--){
		 Ships.splice(i, 1);
	}
}


const cleanAll = () =>{
	cleanShips(1);
	cleanShips(0);
	console.log(Ships);
}
/*
const recordField = (field, number) =>{
	for(let i = 0; i < 10; i ++){
		field.push([]);
		for(let j = 0; j < 10; j ++){
			field[i][j] = number;
		}
	}
}*/

const numberPoint = (field) => {
	let count = 0;
	for(let i = 0; i < 10; i++){
		for(let j = 0; j < 10; j++){
			if(field[i][j] > 0) count ++;
		}
	}
	return count;
}




const Start = () =>{
	hiddenArray(['backg', "white", "random", "singly", "divStart"]);
}