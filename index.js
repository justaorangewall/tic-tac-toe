const gameboard = (() => {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let whoTurn = 1;
  let winPlayer = 0;
  let curTurn = 1;
  const flipTile = (playercode, row, col) => {
    if (board[row][col] === 0)board[row][col] = playercode;
  };

  const gTab = () => board;
  const getwhoTurn = () => whoTurn;
  const getWinStatus = () => winPlayer;

  const setTurn = (num) => { whoTurn = num; };
  const resetWin = () => { winPlayer = 0; };
  const setTable = () => {
    board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  };

  const clearTable = () => {
    setTable();
    setTurn(1);
    resetWin(0);
    curTurn = 0;
  };

  const flipPlayerTurn = () => {
    if (getWinStatus() === 0) {
      curTurn+=1;
      if (whoTurn === 1) setTurn(2);
      else if (whoTurn === 2) setTurn(1);
    }
  };
  const checkWin = () => {
    let gameOver = false;
    if (getWinStatus() === 0) {
      // check horizontal-line Win
      gTab().forEach((r) => {
        if (r[0] === getwhoTurn() && r[1] === getwhoTurn() && r[2] === getwhoTurn()) {
          winPlayer = getwhoTurn();
          gameOver = true;
        }
      });

      // check vertical Win
      for (let i = 0; i < 3; i += 1) {
        if (gTab()[0][i] === getwhoTurn()
        && gTab()[1][i] === getwhoTurn()
        && gTab()[2][i] === getwhoTurn()) {
          winPlayer = getwhoTurn();
          gameOver = true;
        }
      }

      // check diagonal line
      if (gTab()[0][0] === getwhoTurn()
      && gTab()[1][1] === getwhoTurn()
      && gTab()[2][2] === getwhoTurn()) {
        winPlayer = getwhoTurn();
        gameOver = true;
      }

      if (gTab()[0][2] === getwhoTurn()
      && gTab()[1][1] === getwhoTurn()
      && gTab()[2][0] === getwhoTurn()) {
        winPlayer = getwhoTurn();
        gameOver = true;
      }
      if (curTurn === 9 && gameOver === false) {
        winPlayer = 3;
        gameOver = true;
      }
    }
    return gameOver;
  };
  return {
    flipTile, gTab, clearTable, flipPlayerTurn, getwhoTurn, checkWin, getWinStatus,
  };
})();

const displayController = (() => {
  const addTileEvent = () => {
    const tileList = document.querySelectorAll('.tile');

    tileList.forEach((tile) => {
      tile.addEventListener('click', (event) => {
        if (gameboard.getWinStatus() === 0) { // check if game is already over
          if (event.target.classList.contains('claimed') === false) {
          // eslint-disable-next-line no-param-reassign
            event.target.dataset.playerowned = gameboard.getwhoTurn();
            event.target.classList.add('claimed');
            const tileRow = event.target.dataset.row;
            const tileCol = event.target.dataset.column;
            // eslint-disable-next-line no-param-reassign
            event.target.textContent = (gameboard.getwhoTurn() === 1) ? 'X' : 'O';
            gameboard.flipTile(gameboard.getwhoTurn(), tileRow, tileCol);
            if (gameboard.checkWin() === true) {
              if (gameboard.getWinStatus() === 1) document.querySelector('body > div.gameResult').textContent = `${player1.getName()} has won`;
              else if (gameboard.getWinStatus() === 2) document.querySelector('body > div.gameResult').textContent = `${player2.getName()} has won`;
              else if (gameboard.getWinStatus() === 3) document.querySelector('body > div.gameResult').textContent = 'The game is TIE!';
            }
            gameboard.flipPlayerTurn();
            if (gameboard.getWinStatus() === 0) {
              const turnIndicator = document.querySelector('.whoTurn');
              turnIndicator.textContent = (turnIndicator.textContent === 'P1\'s Turn') ? 'P2\'s Turn' : 'P1\'s Turn';
            }
          }
        }
      });
    });
  };

  const drawBoard = () => {
    const gameDiv = document.querySelector('.gameArea');
    gameDiv.textContent = '';
    const boardDiv = document.createElement('div');
    boardDiv.classList.add('gameboard');

    for (let i = 0; i < 3; i += 1) {
      const boardRow = document.createElement('div');
      boardRow.classList.add('boardRow');
      for (let j = 0; j < 3; j += 1) {
        const tileDiv = document.createElement('button');
        tileDiv.classList.add('tile');
        tileDiv.dataset.column = j;
        tileDiv.dataset.row = i;
        boardRow.appendChild(tileDiv);
      }
      boardDiv.appendChild(boardRow);
    }
    gameDiv.appendChild(boardDiv);
    addTileEvent();
  };
  const resetTable = () => {
    const tileList = document.querySelectorAll('.tile');

    tileList.forEach((tile) => {
      tile.classList.remove('claimed');
      // eslint-disable-next-line no-param-reassign
      tile.textContent = '';
    });
    document.querySelector('body > div.gameResult').textContent='';
  };
  return { drawBoard, resetTable };
})();

const Player = (name, playerid) => {
  let pName = name;
  const pID = playerid;

  const setName = (input) => { pName = input; };
  const getName = () => pName;

  const getpID = () => pID;
  return { getName, setName, getpID };
};

gameboard.gTab();
displayController.drawBoard();
const player1 = Player('P1', 1);
const player2 = Player('P2', 2);

document.querySelector('.newGameBtn').addEventListener('click', () => {
  gameboard.clearTable();
  displayController.resetTable();
  console.log(gameboard.getWinStatus());
});

document.querySelector('#changeName').addEventListener('click', (event) => {
  const names = document.querySelectorAll('.playername');
  document.querySelector('#player1').textContent = names[0].value;
  document.querySelector('#player2').textContent = names[1].value;
  event.preventDefault();
});
