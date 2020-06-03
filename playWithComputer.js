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
	//console.log(Ships);
	if(fieldBedingComputer[i][j] == 0){
		if(fieldComputer[i][j] > 0){

			let num = fieldComputer[i][j]
			fieldBedingComputer[i][j] = num ;
			Ships[num-1].delete.push([i,j]);
			if(Ships[num-1].coordinate.length == Ships[num-1].delete.length){
				for(let i = 0; i < Ships[num-1].coordinate.length; i++){
					recordCell(Ships[num-1].coordinate[i][0], Ships[num-1].coordinate[i][1], fieldBedingComputer, -1, true, num);
				}
			}
			movePlayer(false);
			
		}else{
		 fieldBedingComputer[i][j] = -1;
		moveComputer(true);
		}
	 }else setTimeout(WhereClick2, 10);	  
}

const coordinate2 = (x,y) =>{
	let coordinateX;
	let coordinateY;
	if(y > COORDINATETOP && y < COORDINATETOP + WIDTH*10){
		coordinateY = Math.floor((y - COORDINATETOP) / WIDTH);
	}else setTimeout(WhereClick2, 10);	
	if(x > COORDINATELEFTPComputer && x < COORDINATELEFTPComputer + WIDTH*10){
		coordinateX = Math.floor((x - COORDINATELEFTPComputer) / WIDTH);
		//console.log(coordinateY, coordinateX);
	} else setTimeout(WhereClick2, 10);	
	checkBedingPlayer(coordinateY, coordinateX);
}


function CLICK2 (e) {
	 pageX = e.pageX;
	 pageY = e.pageY;
	 coordinate2(pageX, pageY);
	 window.removeEventListener('click', CLICK2, false);

}

const WhereClick2 = () => {
	 window.addEventListener('click', CLICK2, false);
	 return 0;

}

const belingComputer = () =>{
	let i = Math.floor(Math.random()*10);
	let j = Math.floor(Math.random()*10);
	if(fieldBedingPlayer[i][j] == 0){
		console.log(i,j);
		if(fieldPlayer[i][j] > 0){
			let num = fieldPlayer[i][j];
			 fieldBedingPlayer[i][j] = num;
			 Ships[num+9].delete.push([i,j]);
			 if(Ships[num+9].coordinate.length == Ships[num+9].delete.length){
				for(let i = 0; i < Ships[num+9].coordinate.length; i++){
					recordCell(Ships[num+9].coordinate[i][0], Ships[num+9].coordinate[i][1], fieldBedingPlayer, -1, true, num);
				}
			}
			 moveComputer(false);
			}
		else{
		 fieldBedingPlayer[i][j] = -1;
		 movePlayer(true);
		}
	} else belingComputer();
}

const moveComputer = (bolean) =>{
	drawmask();
	if(bolean) hiddenArray(["movePlayer","moveComputer" ]);
	setTimeout(belingComputer, 1000);
}

const movePlayer = (bolean) =>{
	drawmask();
	//console.log("here");
	if(bolean) hiddenArray(["moveComputer", "movePlayer"]);
	setTimeout(WhereClick2, 10);


}

const Play = (num) =>{
	if(num) hiddenArray(["anoth", "playSingly", "white"]);
	else hiddenArray(["another", "playRandom", "white"]);
	recordField(fieldBedingComputer, 0);
	recordField(fieldBedingPlayer, 0);
	//console.log(fieldBedingPlayer, fieldBedingComputer);
	if(Math.random() > 1/2){
	 movePlayer(false);
	 hiddenArray(["movePlayer"]);
	}
	else{
	 moveComputer(false);
	 hiddenArray(["moveComputer"]);
	}
}





