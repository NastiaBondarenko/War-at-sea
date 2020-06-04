'use strict'
 
const nextMove = (i,j ,field, bolean) =>{
	if(field[i][j] != -1){
		if(field[i][j] > 0){
			let num = field[i][j];
			field[i][j] = -1;
			Ships[num-1].killed.push([i,j]);
			if(Ships[num-1].coordinate.length == Ships[num-1].killed.length){
				for(let i = 0; i < Ships[num-1].coordinate.length; i++){
					recordAroundCell(Ships[num-1].coordinate[i][0], Ships[num-1].coordinate[i][1], field, -1, true, num, 0);
				}
			}
			if(bolean) movePlayer(false);
			else moveComputer(false)
			
		}else{
			field[i][j] = -1;
		if(bolean)moveComputer(true);
		else movePlayer(true);
		}
	 }else setTimeout(WhereClick, 10);		
}

const checkBedingPlayer = (i,j) =>{
	nextMove(i,j, fieldComputer.sea, true); 
}

const belingComputer = () =>{
	let i = Math.floor(Math.random()*10);
	let j = Math.floor(Math.random()*10);
	nextMove(i, j, fieldPlayer.sea, false);
}

const moveComputer = (bolean) =>{
	drawKilledShipsAndMask();
	if(bolean) hiddenArray(["movePlayer","moveComputer" ]);
	setTimeout(belingComputer, 1000);
}

const movePlayer = (bolean) =>{
	drawKilledShipsAndMask();
	if(bolean) hiddenArray(["moveComputer", "movePlayer"]);
	setTimeout(WhereClick, 10);
}

const Play = (num) =>{
	console.log(Ships);
	SinglyRecordFieldRecord(fieldPlayer.sea, false);
	SinglyRecordFieldRecord(fieldComputer.sea, false);
	involvedField = false;
	if(num) hiddenArray(["anoth", "playSingly", "white"]);
	else hiddenArray(["another", "playRandom", "white"]);
	if(Math.random() > 1/2){
	 movePlayer(false);
	 hiddenArray(["movePlayer"]);
	}
	else{
	 moveComputer(false);
	 hiddenArray(["moveComputer"]);
	}
}
