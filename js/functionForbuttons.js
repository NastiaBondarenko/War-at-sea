'use strict';


const Start = num => {
  hiddenArray(['backg', 'playTogether', 'playWithComputer' ]);
  if (num) hiddenArray(['divStart']);
};



const RandomRecordForOne = num => {
  if (num) {
    hiddenArray([ 'randomForOne', 'singlyForOne', ]);
    hiddenArray(['myCanvas', 'anotherRandomForOne', 'playRandom']);
  }
  RandomRecordShips(num, 1);
  RandomRecordShips(num, 0);

};

const RandomRecordForTwo = num => {

  if (activePlayer) {
    if (num) {
      hiddenArray(['randomForTwo', 'singlyForTwo', ]);
      hiddenArray(['myCanvas', 'anotherRandomForTwo', 'nextForRandom' ]);
    }
  } else if (num) {
    hiddenArray(['randomForTwo', 'singlyForTwo', 'myCanvas', ]);
    hiddenArray(['anotherRandomForTwo', 'togetherForRandom']);
  }
  RandomRecordShips(num, activePlayer);
};

const SinglyRecordForOne = num => {
  if (num) hiddenArray(['myCanvas',  'randomForOne', 'singlyForOne']);
  else {
    hiddenArray([ 'anotherSinglyForOne', 'playSingly']);
  }
  SinglyRecordShips(num, 1);
  RandomRecordShips(num, 0);

};

const SinglyRecordForTwo = num => {
  if (num) {
    hiddenArray(['myCanvas', 'singlyForTwo', 'randomForTwo']);
  }
  SinglyRecordShips(num, activePlayer);
};

const nextForSingly = () => {
  activePlayer = 0;
  hiddenArray(['player1Turn', 'nextForSingly', 'anotherSinglyForTwo', 'myCanvas', ]);
  hiddenArray([ 'player2Turn', 'singlyForTwo', 'randomForTwo']);
};

const nextForRandom = () => {
  activePlayer = 0;
  hiddenArray(['player1Turn', 'nextForRandom', 'anotherRandomForTwo', 'myCanvas', ]);
  hiddenArray(['player2Turn', 'singlyForTwo', 'randomForTwo']);
};

const WithComputer = () => {
  activePlayer = 1;
  singlyOrTogetherPlay = 1;
  hiddenArray([ 'playTogether', 'playWithComputer', 'randomForOne', 'singlyForOne']);
};

const Together = active => {
  activePlayer = 1;
  singlyOrTogetherPlay = 0;
  hiddenArray([ 'playTogether', 'playWithComputer', 'randomForTwo', 'singlyForTwo']);
  hiddenArray([ 'player1Turn']);

};

