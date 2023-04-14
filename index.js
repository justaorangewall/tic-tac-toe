const gameboard = (() => {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let curTurn = 1;
  let winPlayer = 0;
  const flipTile = (playercode, row, col) => {
    if (board[row][col] === 0)board[row][col] = playercode;
  };

  const gTab = () => board;
  const getTurn = () => curTurn;
  const setTurn = (num) => { curTurn = num; };
  const getWinStatus = () => winPlayer;
  const clearTable = () => {
    board = new Array(3).fill(new Array(3).fill(0));
  };

  const flipTurn = () => {
    if (getWinStatus() === 0) {
      if (curTurn === 1) setTurn(2);
      else if (curTurn === 2) setTurn(1);
    }
  };
  const checkWin = () => {
    if (getWinStatus() === 0) {
      // check horizontal-line Win
      gTab().forEach((r) => {
        if (r[0] === getTurn() && r[1] === getTurn() && r[2] === getTurn()) winPlayer = getTurn();
      });

      // check vertical Win
      for (let i = 0; i < 3; i += 1) {
        if (gTab()[0][i] === getTurn() && gTab()[1][i] === getTurn() && gTab()[2][i] ===getTurn()) {
          winPlayer = getTurn();
        }
      }

      // check diagonal line
      if (gTab()[0][0] === getTurn() && gTab()[1][1] === getTurn() && gTab()[2][2] === getTurn()) {
        winPlayer = getTurn();
      }

      if (gTab()[0][2] === getTurn() && gTab()[1][1] === getTurn() && gTab()[2][0] === getTurn()) {
        winPlayer = getTurn();
      }
      if (winPlayer !== 0) {
        console.log("YOU WIN");
        const result = document.querySelector('.gameResult');
        result.textContent = `Congratulation ${player1.getName()}, YOU won!`;
      }
    }
  };
  return {
    flipTile, gTab, clearTable, flipTurn, getTurn, checkWin, getWinStatus,
  };
})();

const displayController = (() => {
  const addTileEvent = () => {
    const tileList = document.querySelectorAll('.tile');

    tileList.forEach((tile) => {
      tile.addEventListener('click', (event) => {
        if (gameboard.getWinStatus() === 0) { // eslint-disable-next-line no-param-reassign
          event.target.dataset.playerowned = gameboard.getTurn();
          event.target.classList.add('claimed');
          const tileRow = event.target.dataset.row;
          const tileCol = event.target.dataset.column;
          gameboard.flipTile(gameboard.getTurn(), tileRow, tileCol);
          // eslint-disable-next-line no-param-reassign
          event.target.textContent = (gameboard.getTurn() === 1) ? 'X' : 'O';
          gameboard.checkWin();
          gameboard.flipTurn();
        }
      }, { once: true });
    });
  };

  const drawBoard = () => {
    const gameDiv = document.querySelector('.gameArea');
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
        // tileDiv.textContent = randomXO();
        boardRow.appendChild(tileDiv);
      }
      boardDiv.appendChild(boardRow);
    }
    console.log(boardDiv);
    console.log(gameDiv);
    gameDiv.appendChild(boardDiv);
    addTileEvent();
  };

  return { drawBoard };
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
