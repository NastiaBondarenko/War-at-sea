'use strict'
 
const nextMove = (i,j ,field, bolean) =>{
	if(field[i][j] != -1){
		if(field[i][j] > 0){
			let num = field[i][j];
			if(!bolean) num = num + 10;
			field[i][j] = -1;
			Ships[num-1].killed.push([i,j]);
			Ships[num-1].killed.sort();
			if(Ships[num-1].coordinate.length == Ships[num-1].killed.length){
				for(let i = 0; i < Ships[num-1].coordinate.length; i++){
					recordAroundCell(Ships[num-1].coordinate[i][0], Ships[num-1].coordinate[i][1], field, -1, true, -1, 0);
				}
			}
			if(bolean) movePlayer(false);
			else moveComputer(false, 1000);
			
		}else{
			field[i][j] = -1;
		if(bolean)moveComputer(true, 1000);
		else movePlayer(true);
		}
	 }else{ 
	 if(bolean) movePlayer(false);
	 else moveComputer(false, 10);
	}	
}

const counterForPlay = () =>{

		for(let i = 10;  i < 20; i++){
			if(Ships[i].killed.length < Ships[i].coordinate.length && Ships[i].killed.length > 0) 
				return i;
		}
		for(let i = 10;  i < 20; i++){
			if(Ships[i].killed.length < Ships[i].coordinate.length){
				return i;
			}
		}	
	
}

const checkBedingPlayer = (i,j) =>{
	nextMove(i,j, fieldComputer.sea, true); 
}

const randomCellForBeing = (i, j, field) =>{
	let random  = Math.random()*20;
	if(random < 5){
		if(i+1<10 && field[i+1][j] != -1) return [i+1, j];
		
	}
	if(random<10){
		if(i-1>=0 && field[i-1][j] != -1) return [i-1, j];
	}
	if(random<15){
		if(j-1>=0 && field[i][j-1] != -1) return [i, j-1];
	}
		if(j+1<10 && field[i][j+1] != -1) return [i, j+1];
		if(j-1>=0 && field[i][j-1] != -1) return [i, j-1];
		if(i-1>=0 && field[i-1][j] != -1) return [i-1, j];
		if(i+1<10 && field[i+1][j] != -1) return [i+1, j];

}

const cellForBeing = (coordinate, field) =>{
	let deltaI = coordinate[1][0] - coordinate[0][0];
	let deltaJ = coordinate[1][1] -coordinate[0][1];
	let random = Math.random()*10;
	
	if(random<5){
		if(coordinate[0][0]-deltaI >= 0 && coordinate[0][1] - deltaJ && field[coordinate[0][0]-deltaI][coordinate[0][1] - deltaJ] != -1){
			return [coordinate[0][0]-deltaI, coordinate[0][1] - deltaJ];
		} else return [coordinate[coordinate.length-1][0]+deltaI, coordinate[coordinate.length-1][1] + deltaJ];
	}
	else{
		if(coordinate[coordinate.length-1][0]+deltaI < 10 && coordinate[coordinate.length-1][1] + deltaJ < 10 && field[coordinate[coordinate.length-1][0]+deltaI][coordinate[coordinate.length-1][1] + deltaJ] != -1){
			return [coordinate[coordinate.length-1][0]+deltaI, coordinate[coordinate.length-1][1] + deltaJ];
		} else return [coordinate[0][0]-deltaI, coordinate[0][1] - deltaJ];
	}
}

const belingComputer = () =>{
	let crdn =[];
	let num = counterForPlay();
	let coordinate = Ships[num].killed;
	if(coordinate.length == 0){
		 crdn[0] = Math.floor(Math.random()*10);
		 crdn[1] = Math.floor(Math.random()*10);
	} else{
		if(coordinate.length == 1){
			crdn = randomCellForBeing(coordinate[0][0], coordinate[0][1], fieldPlayer.sea);
		}else{
			crdn = cellForBeing(coordinate, fieldPlayer.sea);
		}
	}

	nextMove(crdn[0], crdn[1], fieldPlayer.sea, false);
}

const moveComputer = (bolean, time) =>{
	drawKilledShipsAndMask();
	if(numberPoint(fieldPlayer.sea) == 0) hiddenArray(["dontVin", "moveComputer"]);
	
	

	else{
		
		if(bolean){
		 hiddenArray(["movePlayer","moveComputer" ]);

		}
		setTimeout(belingComputer, time);
	}
}

const movePlayer = (bolean) =>{
	drawKilledShipsAndMask();
	if(numberPoint(fieldComputer.sea) == 0) hiddenArray(["vin", "movePlayer"]);

	
	
	else{
			
		if(bolean) hiddenArray(["moveComputer", "movePlayer"]);
		setTimeout(WhereClick, 10);
	}	
}

const Play = (num) =>{
	SinglyRecordFieldRecord(fieldPlayer.sea, -2, 0);
	SinglyRecordFieldRecord(fieldComputer.sea, -2, 0);
	SinglyRecordFieldRecord(fieldPlayer.sea, -3, 0);
	involvedField = false;
	if(num) hiddenArray(["anoth", "playSingly", "white"]);
	else hiddenArray(["another", "playRandom", "white"]);
	if(Math.random() > 1/2){
	 movePlayer(false);
	 hiddenArray(["movePlayer"]);
	}
	else{
	 moveComputer(false,1000);
	 hiddenArray(["moveComputer"]);
	}
}
