function randomXO() {
  const tileContent = Math.random() < 0.5;
  return tileContent ? 'X' : 'O';
}
const gameboard = (() => {
  let board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  let currentTurn = 1;
  const flipTile = (playercode, row, col) => {
    if (board[row][col] === 0)board[row][col] = playercode;
  };
  const getTable = () => board;

  const clearTable = () => {
    board = new Array(3).fill(new Array(3).fill(0));
  };

  const flipTurn = () => {
    if (currentTurn === 1) currentTurn = 2;
    else if (currentTurn === 2) currentTurn = 1;
  };
  const getTurn = () => currentTurn;
  return {
    flipTile, getTable, clearTable, flipTurn, getTurn,
  };
})();

const displayController = (() => {
  const addTileEvent = () => {
    const tileList = document.querySelectorAll('.tile');
    tileList.forEach((tile) => {
      if (tile.dataset.playerClaimed !== 0) {
        tile.addEventListener('click', (event) => {
          // eslint-disable-next-line no-param-reassign
          event.target.dataset.playerowned = gameboard.getTurn();
          event.target.classList.add('claimed');
          const tileRow = event.target.dataset.row;
          const tileCol = event.target.dataset.column;
          gameboard.flipTile(gameboard.getTurn(), tileRow, tileCol);
          // eslint-disable-next-line no-param-reassign
          event.target.textContent = (gameboard.getTurn() === 1) ? 'X' : 'O';
          gameboard.flipTurn();
        }, { once: true });
      }
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

const Player = (name, playerid) => ({ playerid, name });

gameboard.getTable();
displayController.drawBoard();
const player1 = Player('P1', 1);
const player2 = Player('P2', 2);
