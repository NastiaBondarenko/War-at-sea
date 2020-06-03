'use strict'
 



const drawmask = () =>{
	for(let i = 0; i < 10; i++){
		for(let j = 0; j < 10; j++){
			if(fieldBedingComputer[i][j] > 0 || fieldBedingComputer[i][j] == -1){
			let color;
				if(fieldBedingComputer[i][j] > 0){
				drawRectangle(i,j, 0, 'red');
				}
				if(fieldBedingComputer[i][j]  == -1){
					drawPoint(i,j,0, 'black');
				}
				
  			}
  			if(fieldBedingPlayer[i][j] > 0 || fieldBedingPlayer[i][j] == -1){
  					let color;
				if(fieldBedingPlayer[i][j] > 0){
				DrawRectangle(i,j,1, 'red');
				}
				if(fieldBedingPlayer[i][j]  == -1){
					DrawPoint(i,j,1, 'black');
  				}
  			}
  				
		}
	}	
}

const checkBedingPlayer = (i,j) =>{
	if(fieldBedingComputer.sea[i][j] == 0){
		if(fieldComputer.sea[i][j] > 0){
			let num = fieldComputer.sea[i][j]
			fieldBedingComputer.sea[i][j] = num ;
			Ships[num-1].delete.push([i,j]);
			if(Ships[num-1].coordinate.length == Ships[num-1].delete.length){
				for(let i = 0; i < Ships[num-1].coordinate.length; i++){
					recordCell(Ships[num-1].coordinate[i][0], Ships[num-1].coordinate[i][1], fieldBedingComputer.sea, -1, true, num);
				}
			}
			movePlayer(false);
			
		}else{
		 fieldBedingComputer.sea[i][j] = -1;
		moveComputer(true);
		}
	 }else setTimeout(WhereClick, 10);	  
}


const belingComputer = () =>{
	let i = Math.floor(Math.random()*10);
	let j = Math.floor(Math.random()*10);
	if(fieldBedingPlayer.sea[i][j] == 0){
		console.log(i,j);
		if(fieldPlayer.sea[i][j] > 0){
			let num = fieldPlayer.sea[i][j];
			 fieldBedingPlayer.sea[i][j] = num;
			 Ships[num+9].delete.push([i,j]);
			 if(Ships[num+9].coordinate.length == Ships[num+9].delete.length){
				for(let i = 0; i < Ships[num+9].coordinate.length; i++){
					recordCell(Ships[num+9].coordinate[i][0], Ships[num+9].coordinate[i][1], fieldBedingPlayer, -1, true, num);
				}
			}
			 moveComputer(false);
			}
		else{
		 fieldBedingPlayer.sea[i][j] = -1;
		 movePlayer(true);
		}
	} else belingComputer();
}

const moveComputer = (bolean) =>{
	fieldBedingPlayer.drawMask();
	fieldBedingComputer.drawMask();
	if(bolean) hiddenArray(["movePlayer","moveComputer" ]);
	setTimeout(belingComputer, 1000);
}

const movePlayer = (bolean) =>{
	fieldBedingPlayer.drawMask();
	fieldBedingComputer.drawMask();
	if(bolean) hiddenArray(["moveComputer", "movePlayer"]);
	setTimeout(WhereClick, 10);


}

const Play = (num) =>{
	involvedField = false;
	if(num) hiddenArray(["anoth", "playSingly", "white"]);
	else hiddenArray(["another", "playRandom", "white"]);
	fieldBedingComputer = new fields(0, 0);
	fieldBedingPlayer = new fields(1,0);
	if(Math.random() > 1/2){
	 movePlayer(false);
	 hiddenArray(["movePlayer"]);
	}
	else{
	 moveComputer(false);
	 hiddenArray(["moveComputer"]);
	}
}





