const gameboard = (() => {
  const board = new Array(3).fill(new Array(3).fill(0));

  const flipTile = (playercode, row, col) => {
    if (playercode === 1)board[row][col] = 1;
  };
  const getTable = () => board;
  return { flipTile, getTable };
})();

const displayController = (() => {

  return {};
})();


const Player = (playerid) => {
  const chooseTile = (playerid, col, row) =>{
    gameboard.flipTile(playerid, col, row);
  };
  return { playerid };
};
gameboard.getTable();



