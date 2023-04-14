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
  const getWinStatus = () => winPlayer;

  const setTurn = (num) => { curTurn = num; };
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
  };

  const flipTurn = () => {
    if (getWinStatus() === 0) {
      if (curTurn === 1) setTurn(2);
      else if (curTurn === 2) setTurn(1);
    }
  };
  const checkWin = () => {
    let winFlag = false;
    if (getWinStatus() === 0) {
      // check horizontal-line Win
      gTab().forEach((r) => {
        if (r[0] === getTurn() && r[1] === getTurn() && r[2] === getTurn()) {
          winPlayer = getTurn();
          winFlag = true;
        }
      });

      // check vertical Win
      for (let i = 0; i < 3; i += 1) {
        if (gTab()[0][i] === getTurn() && gTab()[1][i] === getTurn() && gTab()[2][i] ===getTurn()) {
          winPlayer = getTurn();
          winFlag = true;
        }
      }

      // check diagonal line
      if (gTab()[0][0] === getTurn() && gTab()[1][1] === getTurn() && gTab()[2][2] === getTurn()) {
        winPlayer = getTurn();
        winFlag = true;
      }

      if (gTab()[0][2] === getTurn() && gTab()[1][1] === getTurn() && gTab()[2][0] === getTurn()) {
        winPlayer = getTurn();
        winFlag = true;
      }
    }
    return winFlag;
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
        if (gameboard.getWinStatus() === 0) { // check if game is already over
          if (event.target.classList.contains('claimed') === false) {
          // eslint-disable-next-line no-param-reassign
            event.target.dataset.playerowned = gameboard.getTurn();
            event.target.classList.add('claimed');
            const tileRow = event.target.dataset.row;
            const tileCol = event.target.dataset.column;
            // eslint-disable-next-line no-param-reassign
            event.target.textContent = (gameboard.getTurn() === 1) ? 'X' : 'O';
            gameboard.flipTile(gameboard.getTurn(), tileRow, tileCol);
            if (gameboard.checkWin() === true) {
              if (gameboard.getWinStatus() === 1) document.querySelector('body > div.gameResult').textContent = `${player1.getName()} has won`;
              else if (gameboard.getWinStatus() === 2) document.querySelector('body > div.gameResult').textContent = `${player2.getName()} has won`;
            }
            gameboard.flipTurn();
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
