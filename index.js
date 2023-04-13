function randomXO () {
  const tileContent = Math.random() < 0.5;
  return tileContent ? 'X' : 'O';
}
const gameboard = (() => {
  const board = new Array(3).fill(new Array(3).fill(0));

  const flipTile = (playercode, row, col) => {
    if (playercode === 1)board[row][col] = 1;
  };
  const getTable = () => board;
  return { flipTile, getTable };
})();

const displayController = (() => {
  const drawBoard = () => {
    const gameDiv = document.querySelector('.gameArea');
    const boardDiv = document.createElement('div');
    boardDiv.classList.add('gameboard');

    for (let i = 0; i < 3; i += 1) {
      const boardRow = document.createElement('div');
      boardRow.classList.add('boardRow');
      for (let j = 0; j < 3; j += 1) {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');
        tileDiv.textContent = randomXO();
        boardRow.appendChild(tileDiv);
      }
      boardDiv.appendChild(boardRow);
    }
    console.log(boardDiv);
    console.log(gameDiv);
    gameDiv.appendChild(boardDiv);
  };
  return { drawBoard };
})();

const Player = (playerid) => {
  const chooseTile = (playerid, col, row) =>{
    gameboard.flipTile(playerid, col, row);
  };
  return { playerid };
};
gameboard.getTable();
displayController.drawBoard();
