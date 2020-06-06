'use strict';

const movePlayer0 = bolean => {
  activePlayer = 0;
  drawKilledShipsAndMask();
  if (numberPoint(fields[0].sea) === 0) hiddenArray(['vinPl2', 'movePlayer1']);
  else {
    if (bolean) hiddenArray(['movePlayer1', 'movePlayer2']);
    setTimeout(WhereClick, 10);
  }
};


const movePlayer1 = bolean => {
  activePlayer = 1;
  drawKilledShipsAndMask();
  	if (numberPoint(fields[1].sea) === 0) {
  	 hiddenArray(['vinPl1', 'movePlayer2']);
  	} else {
    if (bolean) hiddenArray(['movePlayer1', 'movePlayer2']);
    setTimeout(WhereClick, 10);
  }
};


const together = num => {
  singlyOrTogetherPlay = 0;
  if (num) {
  	hiddenArray(['anotherRandomForTwo', 'player2Turn', 'togetherForRandom']);
  } else {
  	hiddenArray(['anotherSinglyForTwo', 'player2Turn', 'togetherForSingly']);
  }
	rewritingFields();
  clearSea();
  playOrRecord  = 0;
  drawSea(0);
  drawSea(1);
  if (Math.random() > 1 / 2) {
    hiddenArray(['movePlayer2']);
    movePlayer1(false);
  } else {
    hiddenArray(['movePlayer1']);
    movePlayer0(false);
  }
};
